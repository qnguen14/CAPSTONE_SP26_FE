"use client"

import { useState } from "react"
import Link from "next/link"
import { Clock, MapPin, CheckCircle, XCircle, Hourglass, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function WorkerJobsScreen() {
  const [activeTab, setActiveTab] = useState("upcoming")

  const upcomingJobs = [
    {
      id: 1,
      title: "Phun thuốc trừ sâu",
      farmer: "Phạm Văn D",
      location: "Xã Tân Hưng, An Giang",
      date: "15/01/2026",
      time: "06:00 - 12:00",
      wage: "350,000",
      status: "confirmed",
    },
    {
      id: 2,
      title: "Thu hoạch dưa hấu",
      farmer: "Trần Văn E",
      location: "Xã Bình Phước, Long An",
      date: "18/01/2026",
      time: "05:00 - 17:00",
      wage: "280,000",
      status: "pending",
    },
  ]

  const completedJobs = [
    {
      id: 3,
      title: "Thu hoạch lúa",
      farmer: "Nguyễn Văn A",
      location: "Cần Thơ",
      date: "10/01/2026",
      wage: "250,000",
      status: "completed",
      rated: true,
    },
    {
      id: 4,
      title: "Chăm sóc vườn cam",
      farmer: "Trần Thị B",
      location: "Vĩnh Long",
      date: "05/01/2026",
      wage: "600,000",
      status: "completed",
      rated: false,
    },
  ]

  const cancelledJobs = [
    {
      id: 5,
      title: "Làm đất trồng khoai",
      farmer: "Lê Văn F",
      location: "Bến Tre",
      date: "02/01/2026",
      wage: "200,000",
      status: "cancelled",
      reason: "Thời tiết xấu",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-primary/10 text-primary">
            <CheckCircle className="mr-1 h-3 w-3" />
            Đã xác nhận
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary">
            <Hourglass className="mr-1 h-3 w-3" />
            Chờ duyệt
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-primary/10 text-primary">
            <CheckCircle className="mr-1 h-3 w-3" />
            Hoàn thành
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="destructive">
            <XCircle className="mr-1 h-3 w-3" />
            Đã hủy
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col">
      <div className="border-b border-border bg-background p-4">
        <h2 className="text-xl font-bold text-foreground">Công việc của tôi</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="mx-4 mt-4 grid w-auto grid-cols-3">
          <TabsTrigger value="upcoming">Sắp tới</TabsTrigger>
          <TabsTrigger value="completed">Đã xong</TabsTrigger>
          <TabsTrigger value="cancelled">Đã hủy</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-0 p-4">
          {upcomingJobs.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">Không có công việc sắp tới</div>
          ) : (
            <div className="flex flex-col gap-3">
              {upcomingJobs.map((job) => (
                <Link key={job.id} href={`/worker/jobs/${job.id}`}>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-card-foreground">{job.title}</h4>
                          <p className="text-sm text-muted-foreground">{job.farmer}</p>
                        </div>
                        {getStatusBadge(job.status)}
                      </div>
                      <div className="mt-3 flex flex-col gap-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {job.date} | {job.time}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-semibold text-primary">{job.wage}đ</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-0 p-4">
          <div className="flex flex-col gap-3">
            {completedJobs.map((job) => (
              <Link key={job.id} href={`/worker/jobs/${job.id}`}>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-card-foreground">{job.title}</h4>
                        <p className="text-sm text-muted-foreground">{job.farmer}</p>
                      </div>
                      {getStatusBadge(job.status)}
                    </div>
                    <div className="mt-3 flex flex-col gap-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {job.date}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-semibold text-primary">{job.wage}đ</span>
                      {!job.rated && (
                        <Badge variant="outline" className="text-xs">
                          Chưa đánh giá
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cancelled" className="mt-0 p-4">
          <div className="flex flex-col gap-3">
            {cancelledJobs.map((job) => (
              <Card key={job.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-card-foreground">{job.title}</h4>
                      <p className="text-sm text-muted-foreground">{job.farmer}</p>
                    </div>
                    {getStatusBadge(job.status)}
                  </div>
                  <div className="mt-3 flex flex-col gap-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {job.date}
                    </span>
                  </div>
                  <div className="mt-3 rounded-lg bg-destructive/10 p-2 text-sm text-destructive">
                    Lý do: {job.reason}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
