"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, Star, MapPin, CheckCircle, XCircle, MessageCircle, Eye, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function FarmerApplicants() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("pending")
  const [jobFilter, setJobFilter] = useState("all")

  const applicants = [
    {
      id: 1,
      name: "Trần Minh Đức",
      avatar: "/vietnamese-worker-male-portrait.jpg",
      phone: "0901 234 567",
      location: "Cần Thơ",
      distance: "3 km",
      job: "Thu hoạch lúa mùa đông",
      jobId: 1,
      appliedAt: "2 giờ trước",
      rating: 4.8,
      reviews: 24,
      completedJobs: 45,
      skills: ["Thu hoạch", "Làm đất", "Phun thuốc"],
      status: "pending",
      note: "Tôi có 5 năm kinh nghiệm thu hoạch lúa và có thể bắt đầu ngay.",
    },
    {
      id: 2,
      name: "Lê Thị Hoa",
      avatar: "/worker2.jpg",
      phone: "0912 345 678",
      location: "Vĩnh Long",
      distance: "8 km",
      job: "Chăm sóc vườn cam",
      jobId: 2,
      appliedAt: "5 giờ trước",
      rating: 4.5,
      reviews: 18,
      completedJobs: 32,
      skills: ["Chăm sóc cây", "Tưới tiêu"],
      status: "pending",
      note: "Tôi đã làm việc tại nhiều vườn cây ăn trái trong khu vực.",
    },
    {
      id: 3,
      name: "Phạm Văn Hùng",
      avatar: "/worker3.jpg",
      phone: "0923 456 789",
      location: "Cần Thơ",
      distance: "2 km",
      job: "Thu hoạch lúa mùa đông",
      jobId: 1,
      appliedAt: "1 ngày trước",
      rating: 4.9,
      reviews: 56,
      completedJobs: 78,
      skills: ["Thu hoạch", "Vận chuyển", "Làm đất"],
      status: "approved",
      note: "Sẵn sàng làm việc theo lịch của anh/chị.",
    },
    {
      id: 4,
      name: "Nguyễn Văn Tú",
      avatar: "/worker4.jpg",
      phone: "0934 567 890",
      location: "Sóc Trăng",
      distance: "15 km",
      job: "Phun thuốc trừ sâu",
      jobId: 3,
      appliedAt: "2 ngày trước",
      rating: 4.2,
      reviews: 12,
      completedJobs: 15,
      skills: ["Phun thuốc"],
      status: "rejected",
      note: "Tôi có chứng chỉ sử dụng thuốc BVTV.",
    },
  ]

  const jobs = [
    { id: "all", label: "Tất cả công việc" },
    { id: "1", label: "Thu hoạch lúa mùa đông" },
    { id: "2", label: "Chăm sóc vườn cam" },
    { id: "3", label: "Phun thuốc trừ sâu" },
  ]

  const filteredApplicants = applicants.filter((applicant) => {
    const matchesSearch = applicant.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && applicant.status === "pending") ||
      (activeTab === "approved" && applicant.status === "approved") ||
      (activeTab === "rejected" && applicant.status === "rejected")
    const matchesJob = jobFilter === "all" || applicant.jobId.toString() === jobFilter
    return matchesSearch && matchesTab && matchesJob
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Chờ duyệt</Badge>
      case "approved":
        return <Badge className="bg-primary/10 text-primary">Đã duyệt</Badge>
      case "rejected":
        return <Badge variant="destructive">Đã từ chối</Badge>
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Quản lý ứng viên</h1>
        <p className="text-muted-foreground">Xem và duyệt đơn ứng tuyển từ người lao động</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm ứng viên..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={jobFilter} onValueChange={setJobFilter}>
          <SelectTrigger className="w-full sm:w-[250px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Lọc theo công việc" />
          </SelectTrigger>
          <SelectContent>
            {jobs.map((job) => (
              <SelectItem key={job.id} value={job.id}>
                {job.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">Tất cả ({applicants.length})</TabsTrigger>
          <TabsTrigger value="pending">
            Chờ duyệt ({applicants.filter((a) => a.status === "pending").length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Đã duyệt ({applicants.filter((a) => a.status === "approved").length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Đã từ chối ({applicants.filter((a) => a.status === "rejected").length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Applicants List */}
      <div className="flex flex-col gap-4">
        {filteredApplicants.map((applicant) => (
          <Card key={applicant.id}>
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={applicant.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{applicant.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-card-foreground">{applicant.name}</h3>
                      {getStatusBadge(applicant.status)}
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        {applicant.rating} ({applicant.reviews})
                      </span>
                      <span>{applicant.completedJobs} việc hoàn thành</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {applicant.location} ({applicant.distance})
                      </span>
                    </div>

                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground">
                        Ứng tuyển: <span className="font-medium text-card-foreground">{applicant.job}</span>
                      </p>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-1">
                      {applicant.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {applicant.note && (
                      <div className="mt-3 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
                        "{applicant.note}"
                      </div>
                    )}

                    <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Ứng tuyển {applicant.appliedAt}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 lg:flex-col">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Xem hồ sơ
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Hồ sơ ứng viên</DialogTitle>
                        <DialogDescription>Thông tin chi tiết về {applicant.name}</DialogDescription>
                      </DialogHeader>
                      <div className="flex flex-col gap-4 py-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={applicant.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{applicant.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{applicant.name}</h4>
                            <p className="text-sm text-muted-foreground">{applicant.phone}</p>
                            <p className="text-sm text-muted-foreground">{applicant.location}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 rounded-lg bg-muted/50 p-4 text-center">
                          <div>
                            <p className="text-lg font-bold text-card-foreground">{applicant.rating}</p>
                            <p className="text-xs text-muted-foreground">Đánh giá</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold text-card-foreground">{applicant.reviews}</p>
                            <p className="text-xs text-muted-foreground">Nhận xét</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold text-card-foreground">{applicant.completedJobs}</p>
                            <p className="text-xs text-muted-foreground">Việc đã làm</p>
                          </div>
                        </div>
                        <div>
                          <p className="mb-2 text-sm font-medium">Kỹ năng</p>
                          <div className="flex flex-wrap gap-2">
                            {applicant.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/farmer/messages/${applicant.id}`}>
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Nhắn tin
                    </Link>
                  </Button>

                  {applicant.status === "pending" && (
                    <>
                      <Button size="sm" variant="destructive">
                        <XCircle className="mr-2 h-4 w-4" />
                        Từ chối
                      </Button>
                      <Button size="sm">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Chấp nhận
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
