import { AgencyProfilePortal } from '@/components/agency-profile-portal'
import { notFound } from 'next/navigation'

export default async function AgencyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (slug !== 'enframes-realty') notFound()
  return <AgencyProfilePortal />
}
