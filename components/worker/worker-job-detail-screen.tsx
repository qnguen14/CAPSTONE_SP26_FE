"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  MapPin,
  Clock,
  Banknote,
  Star,
  Calendar,
  Users,
  MessageCircle,
  Phone,
  Share,
  Bookmark,
  CheckCircle,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface WorkerJobDetailScreenProps {
  jobId: string
}

export function WorkerJobDetailScreen({ jobId }: WorkerJobDetailScreenProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isApplied, setIsApplied] = useState(false)

  // Mock job data
  const job = {
    id: jobId,
    title: "Thu hoạch lúa mùa đông",
    description:
      "Cần tuyển 5 người lao động có kinh nghiệm thu hoạch lúa. Công việc bao gồm cắt lúa, bó và vận chuyển về kho. Yêu cầu có sức khỏe tốt và có thể làm việc ngoài trời.",
    farmer: {
      name: "Nguyễn Văn A",
      avatar: "/vietnamese-farmer-male.jpg",
      phone: "0901 234 567",
      rating: 4.8,
      reviews: 56,
      totalJobs: 45,
      verified: true,
    },
    location: "Ấp 3, Xã Mỹ Khánh, Huyện Phong Điền, Cần Thơ",
    coordinates: { lat: 10.0452, lng: 105.7469 },
    distance: "2.5 km",
    wage: "250,000",
    wageType: "ngày",
    duration: "1 ngày",
    startDate: "15/01/2026",
    startTime: "06:00",
    endTime: "17:00",
    slots: 5,
    applied: 2,
    type: "Thu hoạch",
    urgent: true,
    requirements: ["Có sức khỏe tốt", "Có kinh nghiệm thu hoạch lúa", "Mang theo nón, găng tay"],
    tools: ["Máy cắt lúa (nông trại cung cấp)", "Bao đựng lúa"],
    benefits: ["Bao ăn trưa", "Nước uống miễn phí", "Có chỗ nghỉ ngơi"],
    postedAt: "2 giờ trước",
  }

  return (
    <div className="flex flex-col pb-24">
      {/* Header */}
      <div className="sticky top-14 z-30 flex items-center justify-between border-b border-border bg-background px-4 py-3">
        <Link href="/worker/search" className="flex items-center gap-2 text-muted-foreground">
          <ArrowLeft className="h-5 w-5" />
          <span>Quay lại</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setIsBookmarked(!isBookmarked)}>
            <Bookmark className={`h-5 w-5 ${isBookmarked ? "fill-primary text-primary" : ""}`} />
          </Button>
          <Button variant="ghost" size="icon">
            <Share className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Job Header */}
      <div className="p-4">
        <div className="flex items-start gap-2">
          {job.urgent && <Badge variant="destructive">Gấp</Badge>}
          <Badge variant="secondary">{job.type}</Badge>
        </div>
        <h1 className="mt-3 text-2xl font-bold text-foreground">{job.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Đăng {job.postedAt}</p>
      </div>

      {/* Key Info */}
      <div className="grid grid-cols-2 gap-3 px-4">
        <Card className="bg-primary/5 border-0">
          <CardContent className="flex items-center gap-3 p-4">
            <Banknote className="h-5 w-5 text-primary" />
            <div>
              <p className="text-lg font-bold text-primary">{job.wage}đ</p>
              <p className="text-xs text-muted-foreground">/{job.wageType}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-accent/10 border-0">
          <CardContent className="flex items-center gap-3 p-4">
            <Clock className="h-5 w-5 text-accent-foreground" />
            <div>
              <p className="text-lg font-bold text-accent-foreground">{job.duration}</p>
              <p className="text-xs text-muted-foreground">Thời gian làm</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Location */}
      <div className="mt-4 px-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div className="flex-1">
                <p className="font-medium text-card-foreground">{job.location}</p>
                <p className="mt-1 text-sm text-muted-foreground">Cách bạn {job.distance}</p>
              </div>
            </div>
            <div className="mt-3 h-32 overflow-hidden rounded-lg bg-muted">
              <img src="/map-location-pin-vietnam.jpg" alt="Vị trí trên bản đồ" className="h-full w-full object-cover" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Schedule */}
      <div className="mt-4 px-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="mb-3 font-semibold text-card-foreground">Lịch làm việc</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-card-foreground">{job.startDate}</p>
                  <p className="text-sm text-muted-foreground">Ngày bắt đầu</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-card-foreground">
                    {job.startTime} - {job.endTime}
                  </p>
                  <p className="text-sm text-muted-foreground">Giờ làm việc</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-card-foreground">
                    {job.applied}/{job.slots} người đã ứng tuyển
                  </p>
                  <p className="text-sm text-muted-foreground">Còn {job.slots - job.applied} vị trí</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Farmer Info */}
      <div className="mt-4 px-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="mb-3 font-semibold text-card-foreground">Thông tin chủ nông trại</h3>
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarImage src={job.farmer.avatar || "/placeholder.svg"} />
                <AvatarFallback>{job.farmer.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-card-foreground">{job.farmer.name}</p>
                  {job.farmer.verified && (
                    <Badge className="bg-primary/10 text-primary text-xs">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Đã xác minh
                    </Badge>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    {job.farmer.rating} ({job.farmer.reviews})
                  </span>
                  <span>{job.farmer.totalJobs} việc đã đăng</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" className="flex-1 bg-transparent" asChild>
                <Link href={`/worker/messages/${job.farmer.name}`}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Nhắn tin
                </Link>
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Phone className="mr-2 h-4 w-4" />
                Gọi điện
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Description */}
      <div className="mt-4 px-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="mb-3 font-semibold text-card-foreground">Mô tả công việc</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{job.description}</p>
          </CardContent>
        </Card>
      </div>

      {/* Requirements */}
      <div className="mt-4 px-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="mb-3 font-semibold text-card-foreground">Yêu cầu</h3>
            <ul className="flex flex-col gap-2">
              {job.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {req}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Tools & Benefits */}
      <div className="mt-4 grid grid-cols-2 gap-3 px-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="mb-2 text-sm font-semibold text-card-foreground">Dụng cụ</h3>
            <ul className="flex flex-col gap-1">
              {job.tools.map((tool, index) => (
                <li key={index} className="text-xs text-muted-foreground">
                  • {tool}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="mb-2 text-sm font-semibold text-card-foreground">Quyền lợi</h3>
            <ul className="flex flex-col gap-1">
              {job.benefits.map((benefit, index) => (
                <li key={index} className="text-xs text-muted-foreground">
                  • {benefit}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Fixed Apply Button */}
      <div className="fixed bottom-16 left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-border bg-background p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-lg font-bold text-primary">
              {job.wage}đ/{job.wageType}
            </p>
            <p className="text-xs text-muted-foreground">Còn {job.slots - job.applied} vị trí</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" disabled={isApplied}>
                {isApplied ? "Đã ứng tuyển" : "Ứng tuyển ngay"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ứng tuyển công việc</DialogTitle>
                <DialogDescription>Xác nhận ứng tuyển vào công việc "{job.title}"</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-4">
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Ngày làm việc</span>
                    <span className="font-medium">{job.startDate}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Giờ làm việc</span>
                    <span className="font-medium">
                      {job.startTime} - {job.endTime}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Lương</span>
                    <span className="font-medium text-primary">
                      {job.wage}đ/{job.wageType}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Ghi chú (tùy chọn)</label>
                  <Textarea placeholder="Giới thiệu ngắn về bản thân hoặc kinh nghiệm..." />
                </div>
                <div className="flex items-start gap-2 rounded-lg bg-primary/5 p-3 text-sm">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <p className="text-muted-foreground">
                    Khi ứng tuyển, nông dân sẽ xem được hồ sơ và đánh giá của bạn. Bạn sẽ nhận thông báo khi được chấp
                    nhận.
                  </p>
                </div>
                <Button onClick={() => setIsApplied(true)}>Xác nhận ứng tuyển</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
