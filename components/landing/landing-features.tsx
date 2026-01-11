import { Search, Briefcase, Wallet, MessageCircle, Star, Bell, MapPin, BarChart3 } from "lucide-react"

export function LandingFeatures() {
  const workerFeatures = [
    {
      icon: Search,
      title: "Tìm kiếm thông minh",
      description: "Lọc việc theo khoảng cách, lương, loại công việc nông nghiệp",
    },
    {
      icon: Briefcase,
      title: "Ứng tuyển nhanh",
      description: "Ứng tuyển công việc ngắn hạn với khung giờ mong muốn",
    },
    {
      icon: Wallet,
      title: "Ví điện tử",
      description: "Thanh toán qua VNPay/Momo, tiền giữ an toàn đến khi hoàn thành",
    },
    {
      icon: MessageCircle,
      title: "Trò chuyện trực tiếp",
      description: "Liên hệ nông dân để làm rõ yêu cầu công việc",
    },
  ]

  const farmerFeatures = [
    {
      icon: MapPin,
      title: "Đăng tuyển dễ dàng",
      description: "Tạo và quản lý tin tuyển dụng với đầy đủ thông tin",
    },
    {
      icon: Star,
      title: "Xem hồ sơ & đánh giá",
      description: "Kiểm tra thông tin và đánh giá của người lao động",
    },
    {
      icon: Bell,
      title: "Quản lý ứng viên",
      description: "Duyệt hoặc từ chối đơn ứng tuyển nhanh chóng",
    },
    {
      icon: BarChart3,
      title: "Thống kê chi tiết",
      description: "Theo dõi lịch sử tuyển dụng, hiệu suất và chi phí",
    },
  ]

  return (
    <section id="features" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-foreground lg:text-4xl">Tính năng nổi bật</h2>
          <p className="mt-4 text-lg text-muted-foreground">Đầy đủ công cụ cho cả người lao động và nông dân</p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Dành cho Người lao động
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {workerFeatures.map((feature, index) => (
                <div key={index} className="rounded-xl border border-border bg-card p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold text-card-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-2 text-sm font-medium text-accent-foreground">
              Dành cho Nông dân
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {farmerFeatures.map((feature, index) => (
                <div key={index} className="rounded-xl border border-border bg-card p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20">
                    <feature.icon className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h3 className="mb-2 font-semibold text-card-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
