"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, MapPin, Clock, Banknote, Star, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

export function WorkerSearchScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const [distance, setDistance] = useState([10])
  const [minWage, setMinWage] = useState([150000])

  const jobTypes = [
    { id: "harvest", label: "Thu hoạch" },
    { id: "planting", label: "Gieo trồng" },
    { id: "soil", label: "Làm đất" },
    { id: "care", label: "Chăm sóc cây" },
    { id: "spray", label: "Phun thuốc" },
    { id: "transport", label: "Vận chuyển" },
  ]

  const jobs = [
    {
      id: 1,
      title: "Thu hoạch lúa mùa đông",
      farmer: "Nguyễn Văn A",
      farmerAvatar: "/farmer-tending-crops.png",
      location: "Ấp 3, Xã Mỹ Khánh, Cần Thơ",
      distance: "2.5 km",
      wage: "250,000",
      duration: "1 ngày",
      rating: 4.8,
      reviews: 24,
      urgent: true,
      type: "Thu hoạch",
      slots: 5,
      applied: 2,
    },
    {
      id: 2,
      title: "Chăm sóc vườn cam Vinh",
      farmer: "Trần Thị B",
      farmerAvatar: "/farmer-tending-crops.png",
      location: "Xã Bình Hòa, Vĩnh Long",
      distance: "5 km",
      wage: "200,000",
      duration: "3 ngày",
      rating: 4.5,
      reviews: 18,
      urgent: false,
      type: "Chăm sóc",
      slots: 3,
      applied: 1,
    },
    {
      id: 3,
      title: "Làm đất trồng rau màu",
      farmer: "Lê Văn C",
      farmerAvatar: "/farmer-tending-crops.png",
      location: "Xã Long Phú, Sóc Trăng",
      distance: "8 km",
      wage: "300,000",
      duration: "2 ngày",
      rating: 4.9,
      reviews: 56,
      urgent: false,
      type: "Làm đất",
      slots: 2,
      applied: 0,
    },
    {
      id: 4,
      title: "Phun thuốc trừ sâu cho lúa",
      farmer: "Phạm Văn D",
      farmerAvatar: "/farmer4.png",
      location: "Xã Tân Hưng, An Giang",
      distance: "12 km",
      wage: "350,000",
      duration: "1 ngày",
      rating: 4.7,
      reviews: 31,
      urgent: true,
      type: "Phun thuốc",
      slots: 4,
      applied: 3,
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Search Header */}
      <div className="sticky top-14 z-30 border-b border-border bg-background p-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm công việc..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
              <SheetHeader>
                <SheetTitle>Bộ lọc tìm kiếm</SheetTitle>
                <SheetDescription>Tùy chỉnh kết quả tìm kiếm của bạn</SheetDescription>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-6">
                <div>
                  <Label className="text-sm font-medium">Khoảng cách: {distance[0]} km</Label>
                  <Slider value={distance} onValueChange={setDistance} max={50} step={1} className="mt-3" />
                </div>
                <div>
                  <Label className="text-sm font-medium">Lương tối thiểu: {minWage[0].toLocaleString()}đ/ngày</Label>
                  <Slider
                    value={minWage}
                    onValueChange={setMinWage}
                    max={500000}
                    min={100000}
                    step={10000}
                    className="mt-3"
                  />
                </div>
                <div>
                  <Label className="mb-3 block text-sm font-medium">Loại công việc</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {jobTypes.map((type) => (
                      <div key={type.id} className="flex items-center gap-2">
                        <Checkbox id={type.id} />
                        <label htmlFor={type.id} className="text-sm">
                          {type.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <Button className="mt-4">Áp dụng bộ lọc</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Quick Filters */}
        <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
          <Badge variant="secondary" className="cursor-pointer whitespace-nowrap">
            <MapPin className="mr-1 h-3 w-3" />
            Gần tôi
          </Badge>
          <Badge variant="outline" className="cursor-pointer whitespace-nowrap">
            Lương cao
          </Badge>
          <Badge variant="outline" className="cursor-pointer whitespace-nowrap">
            Đánh giá tốt
          </Badge>
          <Badge variant="outline" className="cursor-pointer whitespace-nowrap">
            Gấp
          </Badge>
        </div>
      </div>

      {/* Map Preview */}
      <div className="relative h-40 bg-muted">
        <img src="/agricultural-map-vietnam-mekong-delta.jpg" alt="Bản đồ công việc" className="h-full w-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-foreground/20">
          <Button variant="secondary" size="sm">
            <MapPin className="mr-2 h-4 w-4" />
            Xem trên bản đồ
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="p-4">
        <p className="mb-4 text-sm text-muted-foreground">{jobs.length} công việc được tìm thấy</p>

        <div className="flex flex-col gap-3">
          {jobs.map((job) => (
            <Link key={job.id} href={`/worker/jobs/${job.id}`}>
              <Card className="transition-shadow hover:shadow-md">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Avatar className="h-12 w-12 shrink-0">
                      <AvatarImage src={job.farmerAvatar || "/placeholder.svg"} />
                      <AvatarFallback>{job.farmer[0]}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="truncate font-semibold text-card-foreground">{job.title}</h4>
                            {job.urgent && (
                              <Badge variant="destructive" className="shrink-0 text-xs">
                                Gấp
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{job.farmer}</p>
                        </div>
                      </div>

                      <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span className="truncate">{job.location}</span>
                        <span className="shrink-0">({job.distance})</span>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          {job.duration}
                        </span>
                        <span className="flex items-center gap-1 font-semibold text-primary">
                          <Banknote className="h-3.5 w-3.5" />
                          {job.wage}đ/ngày
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                          {job.rating} ({job.reviews})
                        </span>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">
                          {job.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {job.applied}/{job.slots} đã ứng tuyển
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
    </div>
  )
}
