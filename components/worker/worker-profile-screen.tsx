"use client"

import Link from "next/link"
import {
  User,
  MapPin,
  Star,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Phone,
  Edit,
  Shield,
  Bell,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

export function WorkerProfileScreen() {
  const user = {
    name: "Minh Nguyen",
    phone: "0901 234 567",
    email: "minh.nguyen@email.com",
    location: "Cần Thơ, Việt Nam",
    avatar: "/vietnamese-worker-male-portrait.jpg",
    rating: 4.8,
    reviews: 24,
    completedJobs: 12,
    verified: true,
    skills: ["Thu hoạch", "Làm đất", "Chăm sóc cây", "Phun thuốc"],
    profileCompletion: 85,
  }

  const menuItems = [
    {
      icon: User,
      label: "Thông tin cá nhân",
      href: "/worker/profile/edit",
    },
    {
      icon: Shield,
      label: "Xác minh danh tính",
      href: "/worker/profile/verify",
      badge: user.verified ? "Đã xác minh" : "Chưa xác minh",
    },
    {
      icon: Bell,
      label: "Thông báo",
      href: "/worker/profile/notifications",
    },
    {
      icon: Globe,
      label: "Ngôn ngữ",
      href: "/worker/profile/language",
      value: "Tiếng Việt",
    },
    {
      icon: Settings,
      label: "Cài đặt",
      href: "/worker/profile/settings",
    },
    {
      icon: HelpCircle,
      label: "Trợ giúp & Hỗ trợ",
      href: "/worker/help",
    },
  ]

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-xl">{user.name[0]}</AvatarFallback>
              </Avatar>
              <Button size="icon" variant="secondary" className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full">
                <Edit className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-card-foreground">{user.name}</h2>
                {user.verified && (
                  <Badge className="bg-primary/10 text-primary">
                    <Shield className="mr-1 h-3 w-3" />
                    Đã xác minh
                  </Badge>
                )}
              </div>
              <div className="mt-2 flex flex-col gap-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {user.location}
                </span>
                <span className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {user.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4 rounded-xl bg-muted/50 p-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span className="text-lg font-bold text-card-foreground">{user.rating}</span>
              </div>
              <p className="text-xs text-muted-foreground">{user.reviews} đánh giá</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-card-foreground">{user.completedJobs}</p>
              <p className="text-xs text-muted-foreground">Việc hoàn thành</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-primary">{user.profileCompletion}%</p>
              <p className="text-xs text-muted-foreground">Hồ sơ</p>
            </div>
          </div>

          {/* Profile Completion */}
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Hoàn thiện hồ sơ</span>
              <span className="font-medium text-primary">{user.profileCompletion}%</span>
            </div>
            <Progress value={user.profileCompletion} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardContent className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-card-foreground">Kỹ năng</h3>
            <Button variant="ghost" size="sm" className="h-auto p-0 text-primary">
              Chỉnh sửa
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Menu */}
      <Card>
        <CardContent className="p-0">
          {menuItems.map((item, index) => (
            <div key={item.href}>
              <Link
                href={item.href}
                className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <item.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <span className="text-card-foreground">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <Badge variant="outline" className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                  {item.value && <span className="text-sm text-muted-foreground">{item.value}</span>}
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Link>
              {index < menuItems.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Logout */}
      <Button
        variant="outline"
        className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive bg-transparent"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Đăng xuất
      </Button>
    </div>
  )
}
