'use client'

import { useState } from 'react'
import { BarChart3, Eye, Home, QrCode, Users } from 'lucide-react'
import { Logo } from '@/components/brand/logo'
import { AgentBusinessQR } from '@/components/agent-business-qr'
import { properties } from '@/lib/properties'

const navigation = [
  { label: 'Overview', icon: BarChart3 },
  { label: 'My listings', icon: Home },
  { label: 'QR & poster', icon: QrCode },
  { label: 'Lead analytics', icon: Eye },
] as const

export default function DashboardPage() {
  const [active, setActive] = useState<string>('Overview')

  return <div className="min-h-screen bg-[#f7f8f6] text-slate-900">
    <aside className="fixed inset-y-0 hidden w-64 border-r border-slate-200 bg-white p-6 lg:block"><Logo/><nav aria-label="Agent dashboard" className="mt-10 flex flex-col gap-2">{navigation.map(({ label, icon: Icon }) => <button key={label} type="button" onClick={() => setActive(label)} aria-current={active === label ? 'page' : undefined} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${active === label ? 'bg-emerald-50 text-emerald-800' : 'text-slate-500 hover:bg-slate-50'}`}><Icon size={18}/>{label}</button>)}</nav></aside>
    <main className="lg:pl-64"><header className="border-b border-slate-200 bg-white px-5 py-5 lg:px-8"><p className="text-xs text-slate-500">Agent workspace · Enframes Realty</p><h1 className="text-xl font-semibold">Good morning, Ahsan</h1></header><nav aria-label="Agent dashboard" className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-white px-3 py-2 lg:hidden">{navigation.map(({ label, icon: Icon }) => <button key={label} type="button" onClick={() => setActive(label)} aria-current={active === label ? 'page' : undefined} className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${active === label ? 'bg-emerald-50 text-emerald-800' : 'text-slate-500'}`}><Icon size={15}/>{label}</button>)}</nav><div className="mx-auto max-w-6xl p-5 lg:p-8"><p className="text-sm text-slate-500">Manage your estate inventory and client QR storefront.</p><h2 className="mt-1 text-2xl font-semibold">{active}</h2>
      {active === 'Overview' && <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[{ label: 'Total scans', value: '2,840', icon: QrCode }, { label: 'Property views', value: '8,426', icon: Eye }, { label: 'Active listings', value: String(properties.length), icon: Home }, { label: 'Supervised agents', value: '12', icon: Users }].map(({ label, value, icon: Icon }) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5"><Icon className="text-emerald-700" size={20}/><p className="mt-5 text-2xl font-semibold">{value}</p><p className="mt-1 text-sm text-slate-500">{label}</p></div>)}</div>}
      {active === 'My listings' && <div className="mt-7 rounded-2xl border border-slate-200 bg-white">{properties.map((property) => <div key={property.id} className="flex items-center gap-4 border-b border-slate-100 p-4 last:border-0"><img src={property.image} alt="" className="size-14 rounded-xl object-cover"/><div><p className="font-semibold">{property.title}</p><p className="text-sm text-slate-500">{property.id} · {property.price}</p></div></div>)}</div>}
      {active === 'QR & poster' && <AgentBusinessQR/>}
      {active === 'Lead analytics' && <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-6"><h3 className="font-semibold">Lead analytics</h3><p className="mt-2 text-sm text-slate-500">Your property engagement summary is coming soon.</p></div>}
    </div></main>
  </div>
}
