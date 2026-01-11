"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Info, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

export function FarmerJobForm() {
  const [requirements, setRequirements] = useState<string[]>(["Có sức khỏe tốt"])
  const [newRequirement, setNewRequirement] = useState("")
  const [benefits, setBenefits] = useState<string[]>(["Bao ăn trưa"])
  const [newBenefit, setNewBenefit] = useState("")

  const jobTypes = [
    { value: "harvest", label: "Thu hoạch" },
    { value: "planting", label: "Gieo trồng" },
    { value: "soil", label: "Làm đất" },
    { value: "care", label: "Chăm sóc cây" },
    { value: "spray", label: "Phun thuốc" },
    { value: "transport", label: "Vận chuyển" },
    { value: "other", label: "Khác" },
  ]

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setRequirements([...requirements, newRequirement.trim()])
      setNewRequirement("")
    }
  }

  const removeRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index))
  }

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setBenefits([...benefits, newBenefit.trim()])
      setNewBenefit("")
    }
  }

  const removeBenefit = (index: number) => {
    setBenefits(benefits.filter((_, i) => i !== index))
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/farmer/jobs">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Đăng tin tuyển dụng mới</h1>
          <p className="text-muted-foreground">Điền thông tin để tìm người lao động phù hợp</p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin cơ bản</CardTitle>
            <CardDescription>Mô tả công việc cần tuyển</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <Label htmlFor="title">Tiêu đề công việc *</Label>
              <Input id="title" placeholder="VD: Thu hoạch lúa mùa đông" className="mt-2" />
            </div>

            <div>
              <Label htmlFor="type">Loại công việc *</Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Chọn loại công việc" />
                </SelectTrigger>
                <SelectContent>
                  {jobTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Mô tả chi tiết *</Label>
              <Textarea
                id="description"
                placeholder="Mô tả công việc, yêu cầu cụ thể..."
                className="mt-2 min-h-[120px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Location & Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Địa điểm & Thời gian</CardTitle>
            <CardDescription>Thông tin về nơi làm việc và lịch trình</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <Label htmlFor="location">Địa điểm làm việc *</Label>
              <Input id="location" placeholder="VD: Ấp 3, Xã Mỹ Khánh, Cần Thơ" className="mt-2" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="startDate">Ngày bắt đầu *</Label>
                <Input id="startDate" type="date" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="duration">Thời gian làm việc *</Label>
                <Select>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Chọn thời gian" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 ngày</SelectItem>
                    <SelectItem value="2">2 ngày</SelectItem>
                    <SelectItem value="3">3 ngày</SelectItem>
                    <SelectItem value="5">5 ngày</SelectItem>
                    <SelectItem value="7">1 tuần</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="startTime">Giờ bắt đầu</Label>
                <Input id="startTime" type="time" defaultValue="06:00" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="endTime">Giờ kết thúc</Label>
                <Input id="endTime" type="time" defaultValue="17:00" className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment */}
        <Card>
          <CardHeader>
            <CardTitle>Thanh toán</CardTitle>
            <CardDescription>Thông tin về lương và số lượng cần tuyển</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="wage">Mức lương (VNĐ/ngày) *</Label>
                <Input id="wage" type="number" placeholder="250000" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="slots">Số người cần tuyển *</Label>
                <Input id="slots" type="number" placeholder="5" className="mt-2" />
              </div>
            </div>

            <div className="rounded-lg bg-primary/5 p-4">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div className="text-sm">
                  <p className="font-medium text-card-foreground">Phí dịch vụ</p>
                  <p className="text-muted-foreground">
                    Hệ thống thu phí 5% trên tổng giá trị thanh toán. Tiền sẽ được giữ trong ví escrow và chỉ chuyển cho
                    người lao động sau khi công việc hoàn thành.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Yêu cầu công việc</CardTitle>
            <CardDescription>Các yêu cầu đối với người lao động</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {requirements.map((req, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {req}
                  <button onClick={() => removeRequirement(index)} className="ml-1 hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Thêm yêu cầu mới..."
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addRequirement()}
              />
              <Button variant="outline" onClick={addRequirement}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card>
          <CardHeader>
            <CardTitle>Quyền lợi</CardTitle>
            <CardDescription>Các quyền lợi cho người lao động</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {benefits.map((benefit, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {benefit}
                  <button onClick={() => removeBenefit(index)} className="ml-1 hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Thêm quyền lợi mới..."
                value={newBenefit}
                onChange={(e) => setNewBenefit(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addBenefit()}
              />
              <Button variant="outline" onClick={addBenefit}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Options */}
        <Card>
          <CardHeader>
            <CardTitle>Tùy chọn khác</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Checkbox id="urgent" />
              <Label htmlFor="urgent" className="font-normal">
                Đánh dấu là công việc <span className="font-medium text-destructive">GẤP</span>
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="tools" />
              <Label htmlFor="tools" className="font-normal">
                Nông trại cung cấp dụng cụ làm việc
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button variant="outline" asChild>
            <Link href="/farmer/jobs">Hủy bỏ</Link>
          </Button>
          <Button variant="secondary">Lưu nháp</Button>
          <Button>Đăng tin tuyển dụng</Button>
        </div>
      </div>
    </div>
  )
}
