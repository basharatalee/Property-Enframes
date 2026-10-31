import { AccountDashboard } from '@/components/account-dashboard'

export default async function AccountPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const { tab } = await searchParams
  const initialTab = tab === 'alerts' ? 'Search alerts' : tab === 'credits' ? 'Credits & quotas' : 'Saved listings'
  return <AccountDashboard initialTab={initialTab} />
}
