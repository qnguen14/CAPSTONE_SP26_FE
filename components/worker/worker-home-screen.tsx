"use client"

import Link from "next/link"
import { MapPin, Clock, Banknote, Star, ChevronRight, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function WorkerHomeScreen() {
  const nearbyJobs = [
    {
      id: 1,
      title: "Thu hoạch lúa",
      farmer: "Nguyễn Văn A",
      farmerAvatar: "/vietnamese-farmer-male.jpg",
      location: "Cần Thơ",
      distance: "2.5 km",
      wage: "250,000",
      duration: "1 ngày",
      rating: 4.8,
      urgent: true,
    },
    {
      id: 2,
      title: "Chăm sóc vườn cam",
      farmer: "Trần Thị B",
      farmerAvatar: "/vietnamese-farmer-female.jpg",
      location: "Vĩnh Long",
      distance: "5 km",
      wage: "200,000",
      duration: "3 ngày",
      rating: 4.5,
      urgent: false,
    },
    {
      id: 3,
      title: "Làm đất trồng rau",
      farmer: "Lê Văn C",
      farmerAvatar: "/vietnamese-farmer-elderly.jpg",
      location: "Sóc Trăng",
      distance: "8 km",
      wage: "300,000",
      duration: "2 ngày",
      rating: 4.9,
      urgent: false,
    },
  ]

  const upcomingJobs = [
    {
      id: 1,
      title: "Phun thuốc trừ sâu",
      farmer: "Phạm Văn D",
      date: "15/01/2026",
      time: "06:00",
      status: "confirmed",
    },
  ]

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Xin chào,</p>
          <h2 className="text-xl font-bold text-foreground">Minh Nguyen</h2>
        </div>
        <Avatar className="h-12 w-12">
          <AvatarImage src="/vietnamese-worker-male.jpg" />
          <AvatarFallback>MN</AvatarFallback>
        </Avatar>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-primary/10 border-0">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">12</p>
            <p className="text-xs text-muted-foreground">Việc đã làm</p>
          </CardContent>
        </Card>
        <Card className="bg-accent/20 border-0">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-accent-foreground">4.8</p>
            <p className="text-xs text-muted-foreground">Đánh giá</p>
          </CardContent>
        </Card>
        <Card className="border-0 bg-secondary">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-secondary-foreground">2.5M</p>
            <p className="text-xs text-muted-foreground">Số dư ví</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Job */}
      {upcomingJobs.length > 0 && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Việc sắp tới</h3>
          </div>
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">{upcomingJobs[0].title}</p>
                  <p className="mt-1 text-sm text-primary-foreground/80">{upcomingJobs[0].farmer}</p>
                  <div className="mt-3 flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {upcomingJobs[0].time}
                    </span>
                    <span>{upcomingJobs[0].date}</span>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                  Đã xác nhận
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Nearby Jobs */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Việc gần bạn</h3>
          <Link href="/worker/search" className="flex items-center text-sm text-primary">
            Xem tất cả
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {nearbyJobs.map((job) => (
            <Link key={job.id} href={`/worker/jobs/${job.id}`}>
              <Card className="transition-shadow hover:shadow-md">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={job.farmerAvatar || "/placeholder.svg"} />
                      <AvatarFallback>{job.farmer[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-card-foreground">{job.title}</h4>
                            {job.urgent && (
                              <Badge variant="destructive" className="text-xs">
                                Gấp
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{job.farmer}</p>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                          <span className="text-muted-foreground">{job.rating}</span>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {job.distance}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {job.duration}
                        </span>
                        <span className="flex items-center gap-1 font-semibold text-primary">
                          <Banknote className="h-3.5 w-3.5" />
                          {job.wage}đ/ngày
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-auto flex-col gap-2 py-4 bg-transparent" asChild>
          <Link href="/worker/search">
            <MapPin className="h-5 w-5 text-primary" />
            <span>Tìm việc gần đây</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto flex-col gap-2 py-4 bg-transparent" asChild>
          <Link href="/worker/jobs">
            <Briefcase className="h-5 w-5 text-primary" />
            <span>Lịch sử công việc</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}
