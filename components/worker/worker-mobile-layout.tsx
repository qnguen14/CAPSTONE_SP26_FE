"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Briefcase, Wallet, User, Bell, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface WorkerMobileLayoutProps {
  children: React.ReactNode
}

export function WorkerMobileLayout({ children }: WorkerMobileLayoutProps) {
  const pathname = usePathname()
  const [notifications] = useState(3)

  const navItems = [
    { icon: Home, label: "Trang chủ", href: "/worker" },
    { icon: Search, label: "Tìm việc", href: "/worker/search" },
    { icon: Briefcase, label: "Công việc", href: "/worker/jobs" },
    { icon: Wallet, label: "Ví tiền", href: "/worker/wallet" },
    { icon: User, label: "Tài khoản", href: "/worker/profile" },
  ]

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-background">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background">
        <div className="flex h-14 items-center justify-between px-4">
          <h1 className="text-lg font-bold text-primary">AgroTemp</h1>
          <div className="flex items-center gap-2">
            <Link
              href="/worker/messages"
              className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted"
            >
              <MessageCircle className="h-5 w-5 text-muted-foreground" />
            </Link>
            <Link
              href="/worker/notifications"
              className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted"
            >
              <Bell className="h-5 w-5 text-muted-foreground" />
              {notifications > 0 && (
                <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-primary-foreground">
                  {notifications}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-20">{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 border-t border-border bg-background">
        <div className="flex h-16 items-center justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
