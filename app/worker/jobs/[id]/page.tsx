import { WorkerMobileLayout } from "@/components/worker/worker-mobile-layout"
import { WorkerJobDetailScreen } from "@/components/worker/worker-job-detail-screen"

export default async function WorkerJobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <WorkerMobileLayout>
      <WorkerJobDetailScreen jobId={id} />
    </WorkerMobileLayout>
  )
}
