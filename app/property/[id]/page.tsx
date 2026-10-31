import { PropertyDetailView } from '@/components/property-detail-view'

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <PropertyDetailView propertyId={decodeURIComponent(id)} />
}
