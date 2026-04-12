"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MoreVertical, Paperclip, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/libs/utils/utils";
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from "@microsoft/signalr";
import { commonService } from "@/libs/api/services";
import { API_CONFIG } from "@/libs/api/endpoints/config";
import { STORAGE_KEYS } from "@/constants";
import { useAuth } from "@/libs/stores/auth.store";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: string;
}

interface ChatInterfaceProps {
  receiver: {
    id: string;
    name: string;
    avatarUrl: string;
  };
}

export function ChatInterface({ receiver }: ChatInterfaceProps) {
  const [messageInput, setMessageInput] = useState("");
  const { user } = useAuth();
  const myUserId = user?.userId;

  const [messages, setMessages] = useState<Message[]>([]);
  const shouldScrollRef = useRef(false);

  const connectionRef = useRef<HubConnection | null>(null);
  // Keep refs in sync so SignalR callbacks always read latest values
  const otherUserIdRef = useRef<string>(receiver.id);
  const myUserIdRef = useRef<string | null>(myUserId ?? null);

  useEffect(() => {
    myUserIdRef.current = myUserId ?? null;
  }, [myUserId]);

  useEffect(() => {
    otherUserIdRef.current = receiver.id;
    setMessages([]); // reset view when switching conversations
  }, [receiver.id]);

  /* ─── helpers ─────────────────────────────────────────────── */
  const formatCreatedAt = (value: string) => {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDateLabel = (value: string) => {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const isSameDay = (a: Date, b: Date) =>
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();
    if (isSameDay(d, today)) return "Hôm nay";
    if (isSameDay(d, yesterday)) return "Hôm qua";
    return new Intl.DateTimeFormat("vi-VN", { dateStyle: "long" }).format(d);
  };

  const getDayKey = (value: string) => {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  };

  const hubBaseUrl = useMemo(() => {
    return API_CONFIG.BASE_URL.replace(/\/api\/v1\/?$/, "");
  }, []);

  /* ─── incoming message handler (stable ref so we can re-attach after reconnect) ─── */
  const handleIncomingMessage = useCallback((incoming: any) => {
    const myIdNow = myUserIdRef.current;
    const otherIdNow = otherUserIdRef.current;
    if (!myIdNow || !otherIdNow) return;

    // Support both camelCase and PascalCase from the backend
    const sId: string = incoming.senderId || incoming.SenderId || "";
    const rId: string = incoming.receiverId || incoming.ReceiverId || "";
    const id: string = incoming.id || incoming.Id || "";
    const content: string = incoming.content || incoming.Content || "";
    const read: boolean = incoming.read !== undefined ? !!incoming.read : !!incoming.Read;
    const createdAt: string =
      incoming.createdAt || incoming.CreatedAt || new Date().toISOString();

    if (!sId || !rId || !id) return;

    const isBetweenCurrentUsers =
      (sId.toLowerCase() === myIdNow.toLowerCase() &&
        rId.toLowerCase() === otherIdNow.toLowerCase()) ||
      (sId.toLowerCase() === otherIdNow.toLowerCase() &&
        rId.toLowerCase() === myIdNow.toLowerCase());

    if (!isBetweenCurrentUsers) return;

    setMessages((prev) => {
      if (prev.some((m) => m.id === id)) return prev;
      shouldScrollRef.current = true;
      const next: Message = { id, senderId: sId, receiverId: rId, content, read, createdAt };
      return [...prev, next].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    });
  }, []); // stable — reads latest values via refs

  /* ─── attach event listeners (called on start AND after reconnect) ─── */
  const attachListeners = useCallback(
    (conn: HubConnection) => {
      conn.off("NewMessage");
      conn.off("ReceiveMessage");
      conn.on("NewMessage", handleIncomingMessage);
      conn.on("ReceiveMessage", handleIncomingMessage);
    },
    [handleIncomingMessage]
  );

  /* ─── SignalR connection lifecycle ─────────────────────────── */
  useEffect(() => {
    // Do not connect until we know who the current user is
    if (!myUserId) return;

    let cancelled = false;

    const startConnection = async () => {
      // Reuse an existing healthy connection
      if (
        connectionRef.current &&
        connectionRef.current.state === HubConnectionState.Connected
      ) {
        attachListeners(connectionRef.current);
        return;
      }

      // Stop any stale connection first
      if (connectionRef.current) {
        try {
          await connectionRef.current.stop();
        } catch {
          /* ignore */
        }
        connectionRef.current = null;
      }

      // React Strict Mode unmounts before async work finishes — bail out
      if (cancelled) return;

      const hubUrl = `${hubBaseUrl}/hubs/chat`;

      const conn = new HubConnectionBuilder()
        .withUrl(hubUrl, {
          accessTokenFactory: () =>
            localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) ?? "",
          // Allow SignalR to negotiate the best transport:
          // WebSockets → Server-Sent Events → Long Polling
          // This ensures real-time works even through ngrok or restrictive networks
        })
        .withAutomaticReconnect()
        .configureLogging({
          log: (logLevel, message) => {
            if (
              logLevel === LogLevel.Error &&
              (message.includes("stopped during negotiation") ||
                message.includes("before stop() was called"))
            )
              return;
            if (logLevel >= LogLevel.Information) {
              if (logLevel === LogLevel.Error || logLevel === LogLevel.Critical)
                console.error("[SignalR]", message);
              else if (logLevel === LogLevel.Warning)
                console.warn("[SignalR]", message);
              else console.log("[SignalR]", message);
            }
          },
        })
        .build();

      // Re-attach listeners after automatic reconnect
      conn.onreconnected(() => {
        console.log("[SignalR] Reconnected");
        attachListeners(conn);
      });

      conn.onclose((err) => {
        if (err) console.error("[SignalR] Connection closed with error:", err);
      });

      attachListeners(conn);

      // Store ref NOW so cleanup can call stop() if Strict Mode fires again
      connectionRef.current = conn;

      try {
        await conn.start();
        // If cleanup ran while we were connecting, stop immediately
        if (cancelled) {
          conn.stop().catch(() => { });
          connectionRef.current = null;
          return;
        }
        console.log("[SignalR] Connected");
      } catch (e: any) {
        // These errors are expected when React Strict Mode tears down the effect
        // before start() finishes — suppress them so they don't pollute the console
        if (
          e?.name === "AbortError" ||
          e?.message?.includes("stopped during negotiation") ||
          e?.message?.includes("before stop() was called")
        )
          return;
        console.error("[SignalR] Connect failed:", e);
      }
    };

    startConnection();

    return () => {
      cancelled = true;
      if (connectionRef.current) {
        connectionRef.current.stop().catch(() => { });
        connectionRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hubBaseUrl, myUserId]);

  /* ─── load history when receiver changes ──────────────────── */
  useEffect(() => {
    if (!receiver.id) return;

    const loadMessages = async () => {
      try {
        await commonService.markConversationAsRead(receiver.id);

        const res = await commonService.getMessages({
          userId: receiver.id,
          page: 1,
          limit: 100,
        });

        const apiMessages: any[] = res.data?.data ?? [];

        const sorted = apiMessages
          .map((m) => ({
            id: m.id || m.Id,
            senderId: m.senderId || m.SenderId,
            receiverId: m.receiverId || m.ReceiverId,
            content: m.content || m.Content,
            read: !!m.read,
            createdAt: m.createdAt || m.CreatedAt,
          }))
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );

        shouldScrollRef.current = true;
        setMessages(sorted);
      } catch (e) {
        console.error("Failed to load messages:", e);
        setMessages([]);
      }
    };

    loadMessages();
  }, [receiver.id]);

  /* ─── auto-scroll ─────────────────────────────────────────── */
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldScrollRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      shouldScrollRef.current = false;
    }
  }, [messages]);

  /* ─── send message ────────────────────────────────────────── */
  const handleSendMessage = async () => {
    const content = messageInput.trim();
    if (!content || !receiver.id) return;

    setMessageInput("");

    try {
      const res = await commonService.sendMessage(receiver.id, content);

      if (res.data) {
        setMessages((prev) => {
          const id = res.data.id;
          if (prev.some((m) => m.id === id)) return prev;
          shouldScrollRef.current = true;
          const msg: Message = {
            id,
            senderId: res.data.senderId,
            receiverId: res.data.receiverId,
            content: res.data.content,
            read: !!res.data.read,
            createdAt: res.data.createdAt,
          };
          return [...prev, msg].sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        });
      }
    } catch (e) {
      console.error("Failed to send message:", e);
      setMessageInput(content);
    }
  };

  if (!receiver.id) return null;

  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-white">
      {/* Chat Header */}
      <div className="sticky top-0 z-10 bg-white border-b px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="sm:hidden" asChild>
            <Link href="/farmer/messages">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <Avatar className="h-10 w-10">
            <AvatarImage src={receiver.avatarUrl} />
            <AvatarFallback className="bg-agro-green text-white">
              {receiver.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{receiver.name}</h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#d1d5db transparent" }}
      >
        {messages.map((message, index) => {
          const isMine =
            !!myUserId &&
            message.senderId.toLowerCase() === myUserId.toLowerCase();
          const prevMessage = messages[index - 1];
          const showDateBar =
            !prevMessage ||
            getDayKey(prevMessage.createdAt) !== getDayKey(message.createdAt);
          return (
            <div key={message.id}>
              {/* Date separator */}
              {showDateBar && (
                <div className="flex items-center gap-3 my-2">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-[11px] font-medium text-muted-foreground px-2 py-0.5 rounded-full bg-muted shrink-0">
                    {formatDateLabel(message.createdAt)}
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>
              )}
              {/* Message bubble */}
              <div className={cn("flex", isMine ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[70%] rounded-lg px-4 py-2",
                    isMine ? "bg-agro-green text-white" : "bg-gray-100 text-foreground"
                  )}
                >
                  <p className="text-sm break-words whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <span
                    className={cn(
                      "text-xs mt-1 block",
                      isMine ? "text-white/70" : "text-muted-foreground"
                    )}
                  >
                    {formatCreatedAt(message.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Nhập tin nhắn..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            className="bg-agro-green hover:bg-agro-green-dark"
            disabled={!messageInput.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
