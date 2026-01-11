export function LandingStats() {
  const stats = [
    { value: "10,000+", label: "Người lao động" },
    { value: "5,000+", label: "Nông dân đăng ký" },
    { value: "25,000+", label: "Công việc hoàn thành" },
    { value: "63", label: "Tỉnh thành" },
  ]

  return (
    <section className="border-y border-border bg-secondary/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl font-bold text-primary lg:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
