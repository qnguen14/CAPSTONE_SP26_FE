export function LandingHowItWorks() {
  const workerSteps = [
    { step: "01", title: "Đăng ký tài khoản", description: "Tạo hồ sơ với kỹ năng và vị trí của bạn" },
    { step: "02", title: "Tìm việc phù hợp", description: "Duyệt danh sách việc gần bạn trên bản đồ" },
    { step: "03", title: "Ứng tuyển & Làm việc", description: "Nhận việc, hoàn thành và đánh giá" },
    { step: "04", title: "Nhận thanh toán", description: "Tiền được chuyển vào ví sau khi xác nhận" },
  ]

  const farmerSteps = [
    { step: "01", title: "Xác minh tài khoản", description: "Đăng ký và xác minh danh tính nông trại" },
    { step: "02", title: "Đăng tin tuyển dụng", description: "Mô tả công việc, lương và yêu cầu" },
    { step: "03", title: "Chọn ứng viên", description: "Xem hồ sơ, đánh giá và chấp nhận" },
    { step: "04", title: "Thanh toán an toàn", description: "Giải ngân sau khi công việc hoàn thành" },
  ]

  return (
    <section id="how-it-works" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-foreground lg:text-4xl">Cách hoạt động</h2>
          <p className="mt-4 text-lg text-muted-foreground">Quy trình đơn giản, minh bạch cho cả hai bên</p>
        </div>

        <div className="mt-16 grid gap-16 lg:grid-cols-2">
          <div>
            <h3 className="mb-8 text-center text-xl font-bold text-foreground lg:text-left">Dành cho Người lao động</h3>
            <div className="space-y-6">
              {workerSteps.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                    {item.step}
                  </div>
                  <div className="pt-2">
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-8 text-center text-xl font-bold text-foreground lg:text-left">Dành cho Nông dân</h3>
            <div className="space-y-6">
              {farmerSteps.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-lg font-bold text-accent-foreground">
                    {item.step}
                  </div>
                  <div className="pt-2">
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
