"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, Users, Clock, Banknote, MapPin, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

export function FarmerJobsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("active")

  const jobs = [
    {
      id: 1,
      title: "Thu hoạch lúa mùa đông",
      description: "Cần tuyển người thu hoạch lúa cho vụ đông xuân",
      location: "Xã Mỹ Khánh, Cần Thơ",
      wage: "250,000",
      duration: "1 ngày",
      slots: 5,
      filled: 3,
      applicants: 8,
      status: "active",
      createdAt: "10/01/2026",
      deadline: "15/01/2026",
      type: "Thu hoạch",
    },
    {
      id: 2,
      title: "Chăm sóc vườn cam Vinh",
      description: "Tưới nước, bón phân và cắt tỉa cành cho vườn cam",
      location: "Xã Bình Hòa, Vĩnh Long",
      wage: "200,000",
      duration: "3 ngày",
      slots: 3,
      filled: 1,
      applicants: 4,
      status: "active",
      createdAt: "08/01/2026",
      deadline: "20/01/2026",
      type: "Chăm sóc",
    },
    {
      id: 3,
      title: "Phun thuốc trừ sâu",
      description: "Phun thuốc bảo vệ thực vật cho ruộng lúa",
      location: "Xã Tân Hưng, An Giang",
      wage: "350,000",
      duration: "1 ngày",
      slots: 4,
      filled: 4,
      applicants: 6,
      status: "filled",
      createdAt: "05/01/2026",
      deadline: "12/01/2026",
      type: "Phun thuốc",
    },
    {
      id: 4,
      title: "Gieo mạ vụ xuân",
      description: "Gieo mạ và chuẩn bị ruộng cho vụ xuân hè",
      location: "Xã Mỹ Khánh, Cần Thơ",
      wage: "280,000",
      duration: "2 ngày",
      slots: 6,
      filled: 6,
      applicants: 10,
      status: "completed",
      createdAt: "01/01/2026",
      deadline: "05/01/2026",
      type: "Gieo trồng",
    },
  ]

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && job.status === "active") ||
      (activeTab === "filled" && job.status === "filled") ||
      (activeTab === "completed" && job.status === "completed")
    return matchesSearch && matchesTab
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-primary/10 text-primary">Đang tuyển</Badge>
      case "filled":
        return <Badge variant="secondary">Đã đủ người</Badge>
      case "completed":
        return (
          <Badge variant="outline" className="text-muted-foreground">
            Hoàn thành
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tin tuyển dụng</h1>
          <p className="text-muted-foreground">Quản lý các tin tuyển dụng của bạn</p>
        </div>
        <Button asChild>
          <Link href="/farmer/jobs/new">
            <Plus className="mr-2 h-4 w-4" />
            Đăng tin mới
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm tin tuyển dụng..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="active">Đang tuyển</TabsTrigger>
            <TabsTrigger value="filled">Đã đủ</TabsTrigger>
            <TabsTrigger value="completed">Hoàn thành</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Jobs List */}
      <div className="flex flex-col gap-4">
        {filteredJobs.map((job) => (
          <Card key={job.id}>
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-card-foreground">{job.title}</h3>
                    {getStatusBadge(job.status)}
                    <Badge variant="outline">{job.type}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{job.description}</p>

                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Banknote className="h-4 w-4" />
                      {job.wage}đ/ngày
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {job.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {job.applicants} ứng viên
                    </span>
                  </div>

                  {job.status !== "completed" && (
                    <div className="mt-4 max-w-xs">
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Tiến độ tuyển dụng</span>
                        <span className="font-medium">
                          {job.filled}/{job.slots}
                        </span>
                      </div>
                      <Progress value={(job.filled / job.slots) * 100} className="h-2" />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/farmer/jobs/${job.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      Xem chi tiết
                    </Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Nhân bản
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Xóa tin
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                <span>Đăng ngày: {job.createdAt}</span>
                <span>Hạn tuyển: {job.deadline}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
