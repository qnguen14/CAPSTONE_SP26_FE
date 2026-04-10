"use client";

import { useRouter } from "next/navigation";
import { MessageSquareOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FarmerMessagesPage() {
  const router = useRouter();

  return (
    <div className="h-[calc(100vh-6rem)] p-4 lg:p-6 flex flex-col gap-4 animate-in fade-in duration-500">
      <div className="shrink-0 space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Tin nhắn</h1>
        <p className="text-sm text-muted-foreground">
          Trao đổi trực tiếp với lao động để quản lý công việc và yêu cầu hiệu quả
        </p>
      </div>

      <div className="flex-1 min-h-0 bg-white dark:bg-zinc-900 border rounded-2xl shadow-sm flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center p-8 max-w-sm mx-auto">
          <div className="w-20 h-20 rounded-full bg-agro-green/10 flex items-center justify-center mb-6 ring-8 ring-agro-green/5">
            <MessageSquareOff className="h-10 w-10 text-agro-green" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Chưa có cuộc trò chuyện nào</h3>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Bạn hiện chưa có tin nhắn nào. Bạn có thể bắt đầu cuộc trò chuyện bằng cách xem hồ sơ của các ứng viên và chọn nút "Nhắn tin".
          </p>
          <Button 
            onClick={() => router.push("/farmer/jobs")} 
            className="bg-agro-green hover:bg-agro-green-dark text-white rounded-full px-6 transition-transform hover:scale-105"
          >
            Quản lý hồ sơ ứng viên
          </Button>
        </div>
      </div>
    </div>
  );
}
