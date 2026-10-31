'use client'

import { useMemo, useState } from 'react'
import {
  Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from 'recharts'
import { ArrowUpRight, Building2, ChartNoAxesCombined, Flame, House, MapPin } from 'lucide-react'

const localities: Record<string, string[]> = {
  Karachi: ['DHA City', 'Clifton', 'Gulshan-e-Iqbal', 'Scheme 33'],
  Lahore: ['DHA Lahore', 'Bahria Town', 'Gulberg', 'Lake City'],
  Islamabad: ['DHA Islamabad', 'Bahria Town', 'E-11', 'Gulberg Greens'],
}
const periods = [
  { label: '6 Months', months: 6 }, { label: '1 Year', months: 12 },
  { label: '3 Years', months: 36 }, { label: '5 Years', months: 60 },
]
const sectors = ['Phase 6', 'Phase 7', 'Phase 8', 'Phase 9', 'Phase 10']
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function trendSeries(monthCount: number, city: string, locality: string, type: string) {
  const seed = city.length * 7 + locality.length * 3 + type.length
  const stride = monthCount > 24 ? 6 : monthCount > 12 ? 3 : 1
  const points = Math.ceil(monthCount / stride)
  const basePrice = type === 'Plots' ? 12_500_000 : 28_000_000
  const now = new Date()
  return Array.from({ length: points }, (_, index) => {
    const monthsAgo = (points - 1 - index) * stride
    const date = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1)
    const movement = 1 + (index / Math.max(points - 1, 1)) * 0.16
    const seasonal = 1 + Math.sin((index + seed) * 0.85) * 0.025
    return {
      month: monthCount > 12 ? `${monthNames[date.getMonth()]} '${String(date.getFullYear()).slice(-2)}` : monthNames[date.getMonth()],
      price: Math.round(basePrice * movement * seasonal),
    }
  })
}

function inventorySeries(city: string, locality: string, type: string) {
  const seed = city.length + locality.length + type.length
  return sectors.map((sector, index) => ({
    sector,
    popularity: 46 + ((seed * (index + 3) * 13) % 48),
    inventory: 115 + ((seed * (index + 7) * 19) % 620),
  }))
}

function formatPKR(value: number) {
  if (value >= 10_000_000) return `PKR ${(value / 10_000_000).toFixed(2)} Cr`
  if (value >= 100_000) return `PKR ${(value / 100_000).toFixed(1)} Lac`
  return `PKR ${value.toLocaleString()}`
}

export function MarketTrendsDashboard() {
  const [city, setCity] = useState('Lahore')
  const [locality, setLocality] = useState('DHA Lahore')
  const [propertyType, setPropertyType] = useState('Houses')
  const [period, setPeriod] = useState(12)
  const isPlot = propertyType === 'Plots'
  const unitLabel = isPlot ? 'Sq Yd' : 'Marla'
  const series = useMemo(() => trendSeries(period, city, locality, propertyType), [period, city, locality, propertyType])
  const inventory = useMemo(() => inventorySeries(city, locality, propertyType), [city, locality, propertyType])
  const averagePrice = Math.round(series.reduce((sum, point) => sum + point.price, 0) / series.length)
  const growth = 8.4 + (city.length % 5) * 0.7 + (isPlot ? 1.2 : 0)
  const listed = inventory.reduce((sum, phase) => sum + phase.inventory, 0)

  const selectClass = 'h-10 w-full rounded-xl border border-[#e5e8e1] bg-white px-3 text-xs font-semibold text-[#39443a] outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10'

  return (
    <section id="market-trends" className="border-y border-[#e9ebe5] bg-[#f8f9f6] py-12 sm:py-16">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 xl:px-12">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.15em] text-[#70806e]"><ChartNoAxesCombined size={15}/> Property market intelligence</p><h2 className="mt-2 font-serif text-3xl tracking-[-.04em] text-[#202b22] sm:text-[40px]">Market trends & price index</h2><p className="mt-2 max-w-xl text-sm leading-6 text-stone-500">See how prices and buyer interest are moving across your market.</p></div><span className="rounded-full border border-[#e4e8df] bg-white px-3 py-2 text-[11px] font-medium text-stone-500">Illustrative market snapshot · Updated today</span></div>

        <div className="mt-7 rounded-[20px] border border-[#e6e9e2] bg-white p-4 shadow-sm sm:p-5"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end"><label className="block text-[11px] font-semibold text-[#667064]">City<select value={city} onChange={(event) => { const nextCity = event.target.value; setCity(nextCity); setLocality(localities[nextCity][0]) }} className={`${selectClass} mt-1.5`}><option>Karachi</option><option>Lahore</option><option>Islamabad</option></select></label><label className="block text-[11px] font-semibold text-[#667064]">Society / locality<select value={locality} onChange={(event) => setLocality(event.target.value)} className={`${selectClass} mt-1.5`}>{localities[city].map((item) => <option key={item}>{item}</option>)}</select></label><label className="block text-[11px] font-semibold text-[#667064]">Property type<select value={propertyType} onChange={(event) => setPropertyType(event.target.value)} className={`${selectClass} mt-1.5`}><option>Houses</option><option>Plots</option></select></label><fieldset><legend className="mb-1.5 text-[11px] font-semibold text-[#667064]">Time period</legend><div className="flex rounded-xl bg-[#f3f5f1] p-1">{periods.map((item) => <button type="button" key={item.months} aria-pressed={period === item.months} onClick={() => setPeriod(item.months)} className={`flex-1 rounded-lg px-2 py-2 text-[10px] font-semibold transition sm:text-[11px] ${period === item.months ? 'bg-white text-emerald-900 shadow-sm' : 'text-stone-500 hover:text-stone-800'}`}>{item.label}</button>)}</div></fieldset></div></div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><MetricCard label={`Average price / ${unitLabel}`} value={formatPKR(averagePrice)} helper={`Current ${propertyType.toLowerCase()} · ${locality}`} icon={<MapPin size={17}/>} /><MetricCard label="Year-over-year growth" value={`+${growth.toFixed(1)}%`} helper="Compared with the same period last year" icon={<ArrowUpRight size={18}/>} positive/><MetricCard label="Active inventory" value={listed.toLocaleString()} helper={`Listings across ${locality} phases`} icon={<Building2 size={17}/>} /><MetricCard label="Demand signal" value="High demand" helper="Buyer interest is above the local average" icon={<Flame size={17}/>} demand/></div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
          <article className="min-w-0 rounded-[20px] border border-[#e6e9e2] bg-white p-4 shadow-sm sm:p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="text-sm font-semibold text-[#28372b]">Average price trend</h3><p className="mt-1 text-xs text-stone-500">Price per {unitLabel} · {city}</p></div><div className="flex items-center gap-2 text-[11px] font-medium text-[#28704b]"><span className="size-2 rounded-full bg-[#28704b]"/>Average price</div></div><div className="mt-4 h-[270px] w-full sm:h-[320px]"><ResponsiveContainer width="100%" height="100%"><LineChart data={series} margin={{ top: 8, right: 8, left: 4, bottom: 0 }}><CartesianGrid stroke="#edf0eb" strokeDasharray="3 5" vertical={false}/><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#8b9289', fontSize: 10 }} minTickGap={22}/><YAxis axisLine={false} tickLine={false} tick={{ fill: '#8b9289', fontSize: 10 }} tickFormatter={(value: number) => `${(value / 1_000_000).toFixed(0)}m`} width={36}/><Tooltip content={<PriceTooltip unit={unitLabel}/>} cursor={{ stroke: '#c7d4c8', strokeDasharray: '3 3' }}/><Line type="monotone" dataKey="price" stroke="#28704b" strokeWidth={3} dot={false} activeDot={{ r: 5, fill: '#28704b', stroke: '#fff', strokeWidth: 2 }} animationDuration={450}/></LineChart></ResponsiveContainer></div></article>

          <article className="min-w-0 rounded-[20px] border border-[#e6e9e2] bg-white p-4 shadow-sm sm:p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="text-sm font-semibold text-[#28372b]">Popularity & inventory</h3><p className="mt-1 text-xs text-stone-500">By sector / phase · {locality}</p></div><div className="flex flex-wrap gap-3 text-[10px] font-medium text-stone-500"><span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-sm bg-[#8bad91]"/>Popularity</span><span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-sm bg-[#d8e3d5]"/>Inventory</span></div></div><div className="mt-4 h-[270px] w-full sm:h-[320px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={inventory} margin={{ top: 8, right: 0, left: -12, bottom: 0 }} barGap={5}><CartesianGrid stroke="#edf0eb" strokeDasharray="3 5" vertical={false}/><XAxis dataKey="sector" axisLine={false} tickLine={false} tick={{ fill: '#8b9289', fontSize: 10 }}/><YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#8b9289', fontSize: 10 }} width={28}/><YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#8b9289', fontSize: 10 }} width={30}/><Tooltip content={<InventoryTooltip/>} cursor={{ fill: '#f7f9f6' }}/><Bar yAxisId="left" dataKey="popularity" name="Popularity index" fill="#8bad91" radius={[5, 5, 0, 0]} maxBarSize={24}/><Bar yAxisId="right" dataKey="inventory" name="Active inventory" fill="#d8e3d5" radius={[5, 5, 0, 0]} maxBarSize={24}/></BarChart></ResponsiveContainer></div></article>
        </div>
        <p className="mt-4 flex items-center gap-2 text-[10px] leading-5 text-stone-400"><House size={13}/> Prices are shown in PKR. Area units vary by property type; figures are illustrative until connected to live market data.</p>
      </div>
    </section>
  )
}

function MetricCard({ label, value, helper, icon, positive, demand }: { label: string; value: string; helper: string; icon: React.ReactNode; positive?: boolean; demand?: boolean }) {
  return <article className="rounded-[18px] border border-[#e7eae4] bg-white p-4 shadow-sm sm:p-5"><div className="flex items-center justify-between"><span className="text-[11px] font-medium text-stone-500">{label}</span><span className={`grid size-8 place-items-center rounded-xl ${demand ? 'bg-[#fff2e2] text-[#b56b27]' : 'bg-[#edf3eb] text-emerald-800'}`}>{icon}</span></div><p className={`mt-4 text-[25px] font-semibold tracking-[-.04em] ${demand ? 'text-[#a65b1b]' : positive ? 'text-[#28704b]' : 'text-[#26382c]'}`}>{value}</p><p className="mt-1 text-[10px] leading-4 text-stone-400">{helper}</p></article>
}

function PriceTooltip({ active, payload, label, unit }: { active?: boolean; payload?: Array<{ value: number }>; label?: string; unit: string }) {
  if (!active || !payload?.length) return null
  return <div className="rounded-xl border border-stone-100 bg-white px-3 py-2.5 shadow-xl"><p className="text-[10px] font-medium text-stone-400">{label}</p><p className="mt-1 text-sm font-semibold text-[#28704b]">{formatPKR(payload[0].value)} <span className="text-[10px] font-medium text-stone-500">/ {unit}</span></p></div>
}

function InventoryTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null
  return <div className="rounded-xl border border-stone-100 bg-white px-3 py-2.5 shadow-xl"><p className="text-xs font-semibold text-[#354235]">{label}</p>{payload.map((entry) => <p key={entry.name} className="mt-1 flex items-center gap-2 text-[11px] text-stone-500"><span className="size-2 rounded-sm" style={{ backgroundColor: entry.color }}/>{entry.name}: <strong className="text-stone-700">{entry.value.toLocaleString()}{entry.name.includes('Popularity') ? '/100' : ''}</strong></p>)}</div>
}
