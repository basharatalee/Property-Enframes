'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, Check, ChevronDown, MapPin, RotateCcw, Search, SlidersHorizontal, X } from 'lucide-react'

const propertyTypes = {
  Homes: ['Houses', 'Apartments', 'Flats'],
  Plots: ['Residential plots', 'Commercial plots', 'Files'],
  Commercial: ['Offices', 'Shops', 'Buildings'],
}
const units = ['Marla', 'Kanal', 'Sq Ft', 'Sq Yds']
const cities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan']
const neighborhoods = ['DHA Phase 6', 'Bahria Town', 'Gulberg', 'Clifton', 'E-11', 'Gulberg Greens']

export function PropertySearchConsole() {
  const [intent, setIntent] = useState('Buy')
  const [category, setCategory] = useState<keyof typeof propertyTypes>('Homes')
  const [subtype, setSubtype] = useState('Houses')
  const [city, setCity] = useState('Lahore')
  const [neighborhood, setNeighborhood] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('50000000')
  const [minArea, setMinArea] = useState('')
  const [maxArea, setMaxArea] = useState('')
  const [unit, setUnit] = useState('Marla')
  const [bedrooms, setBedrooms] = useState('Any')
  const [bathrooms, setBathrooms] = useState('Any')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [message, setMessage] = useState('')

  const reset = () => {
    setIntent('Buy'); setCategory('Homes'); setSubtype('Houses'); setCity('Lahore')
    setNeighborhood(''); setMinPrice(''); setMaxPrice('50000000'); setMinArea(''); setMaxArea('')
    setUnit('Marla'); setBedrooms('Any'); setBathrooms('Any'); setMessage('')
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage(`Searching ${intent.toLowerCase()} ${subtype.toLowerCase()} in ${neighborhood ? `${neighborhood}, ` : ''}${city}`)
    setDrawerOpen(false)
  }

  const filterFields = (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-xs font-semibold text-[#596157]">City<select value={city} onChange={(e) => setCity(e.target.value)} className="mt-2 h-11 w-full rounded-xl border border-[#e5e8e1] bg-white px-3 text-sm font-medium text-[#30382f] outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10">{cities.map((name) => <option key={name}>{name}</option>)}</select></label>
        <label className="block text-xs font-semibold text-[#596157]">Neighborhood or society<input list="property-neighborhoods" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} placeholder="Type a neighborhood" className="mt-2 h-11 w-full rounded-xl border border-[#e5e8e1] bg-white px-3 text-sm font-normal outline-none transition placeholder:text-[#a2a79f] focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10"/><datalist id="property-neighborhoods">{neighborhoods.map((name) => <option key={name} value={name} />)}</datalist></label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <fieldset><legend className="text-xs font-semibold text-[#596157]">Price range <span className="font-normal text-stone-400">(PKR)</span></legend><input aria-label="Maximum price slider" type="range" min="0" max="100000000" step="500000" value={Math.min(Number(maxPrice) || 0, 100000000)} onChange={(e) => setMaxPrice(e.target.value)} className="mt-3 h-1.5 w-full cursor-pointer accent-[#1e4b36]"/><div className="mt-2 grid grid-cols-2 gap-2"><input aria-label="Minimum price" type="number" min="0" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Min price" className="h-10 min-w-0 rounded-xl border border-[#e5e8e1] px-3 text-sm outline-none focus:border-emerald-700"/><input aria-label="Maximum price" type="number" min="0" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max price" className="h-10 min-w-0 rounded-xl border border-[#e5e8e1] px-3 text-sm outline-none focus:border-emerald-700"/></div></fieldset>
        <fieldset><legend className="text-xs font-semibold text-[#596157]">Area range</legend><div className="mt-2 flex h-11 overflow-hidden rounded-xl border border-[#e5e8e1] focus-within:border-emerald-700"><input type="number" min="0" value={minArea} onChange={(e) => setMinArea(e.target.value)} placeholder="Min" aria-label="Minimum area" className="min-w-0 w-1/3 px-3 text-sm outline-none"/><input type="number" min="0" value={maxArea} onChange={(e) => setMaxArea(e.target.value)} placeholder="Max" aria-label="Maximum area" className="min-w-0 w-1/3 border-l border-[#e5e8e1] px-3 text-sm outline-none"/><select value={unit} onChange={(e) => setUnit(e.target.value)} aria-label="Area unit" className="ml-auto border-l border-[#e5e8e1] bg-[#fafbf9] px-3 text-xs font-semibold outline-none">{units.map((item) => <option key={item}>{item}</option>)}</select></div><p className="mt-1.5 text-[10px] text-stone-400">Area in {unit.toLowerCase()}</p></fieldset>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Counter label="Bedrooms" value={bedrooms} onChange={setBedrooms}/>
        <Counter label="Bathrooms" value={bathrooms} onChange={setBathrooms}/>
      </div>
    </>
  )

  return (
    <>
      <form onSubmit={submit} className="mt-7 overflow-hidden rounded-[22px] border border-[#e2e5dd] bg-white shadow-[0_14px_50px_-36px_rgba(22,38,24,.3)]">
        <div className="flex items-center justify-between border-b border-[#eef0eb] px-4 py-3 sm:px-5">
          <div className="flex rounded-xl bg-[#f4f6f2] p-1" aria-label="Listing intent">{['Buy', 'Rent', 'Projects'].map((item) => <button type="button" key={item} aria-pressed={intent === item} onClick={() => setIntent(item)} className={`rounded-lg px-4 py-2 text-xs font-semibold transition sm:px-5 ${intent === item ? 'bg-white text-emerald-900 shadow-sm' : 'text-[#747a71] hover:text-[#263c2c]'}`}>{item}</button>)}</div>
          <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 rounded-lg px-2 py-2 text-xs font-medium text-[#7a8077] transition hover:bg-stone-50 hover:text-emerald-900"><RotateCcw size={13}/> <span className="hidden sm:inline">Reset filters</span><span className="sm:hidden">Reset</span></button>
        </div>
        <div className="px-4 py-4 sm:px-5">
          <div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-1.5" aria-label="Property type">{(Object.keys(propertyTypes) as Array<keyof typeof propertyTypes>).map((item) => <button type="button" key={item} aria-pressed={category === item} onClick={() => { setCategory(item); setSubtype(propertyTypes[item][0]) }} className={`rounded-full px-4 py-2 text-xs font-semibold transition ${category === item ? 'bg-[#eaf1e9] text-[#1e4b36]' : 'text-[#747a71] hover:bg-stone-50'}`}>{item}</button>)}</div><label className="flex items-center gap-2 text-xs font-medium text-[#73796f]"><span className="hidden sm:inline">Property subtype</span><span className="sr-only sm:hidden">Property subtype</span><span className="relative"><select value={subtype} onChange={(e) => setSubtype(e.target.value)} className="h-9 appearance-none rounded-lg border border-[#e7e9e3] bg-white py-1 pl-3 pr-8 text-xs font-semibold text-[#3b443b] outline-none focus:border-emerald-700">{propertyTypes[category].map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500"/></span></label></div>

          <div className="mt-5 hidden space-y-4 md:block">{filterFields}</div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 md:hidden"><span className="flex min-w-0 items-center gap-2 text-xs text-stone-500"><MapPin size={14} className="shrink-0 text-emerald-800"/><span className="truncate">{neighborhood ? `${neighborhood}, ` : ''}{city}</span></span><button type="button" onClick={() => setDrawerOpen(true)} className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#dfe4dc] px-3 text-xs font-semibold text-[#304735]"><SlidersHorizontal size={15}/> Advanced filters</button></div>
          <div className="mt-5 flex flex-col-reverse gap-2 border-t border-[#eef0eb] pt-4 sm:flex-row sm:items-center sm:justify-between"><p className="hidden text-xs text-stone-400 sm:block">Thousands of listings, one great next step.</p><button type="submit" className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1e4b36] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#153b2a] focus:outline-none focus:ring-4 focus:ring-emerald-800/15 sm:ml-auto sm:w-auto"><Search size={17}/> Search Properties <ArrowRight size={16}/></button></div>
          <p role="status" aria-live="polite" className="mt-2 text-center text-xs text-emerald-800 sm:text-right">{message}</p>
        </div>
      </form>

      <div className="mt-3 hidden items-center gap-4 px-3 md:flex"><button type="button" onClick={() => setDrawerOpen(true)} className="flex items-center gap-1.5 text-xs text-stone-500 transition hover:text-emerald-800"><SlidersHorizontal size={14}/> Advanced Filters</button><span className="h-4 border-l border-stone-200"/><span className="text-xs text-stone-400">Popular:</span>{['DHA Lahore', 'Apartments', 'Under 2 Cr'].map((term) => <button key={term} type="button" onClick={() => setNeighborhood(term)} className="text-xs text-stone-500 hover:text-emerald-800">{term}</button>)}</div>

      {drawerOpen && <div className="fixed inset-0 z-50" role="presentation"><button aria-label="Close advanced filters" className="absolute inset-0 size-full bg-[#101912]/45" onClick={() => setDrawerOpen(false)}/><aside role="dialog" aria-modal="true" aria-labelledby="advanced-filter-title" className="absolute inset-y-0 right-0 flex w-full max-w-lg flex-col bg-white shadow-2xl"><div className="flex items-center justify-between border-b border-stone-100 px-5 py-4"><div><p className="text-[10px] font-semibold uppercase tracking-[.14em] text-emerald-800">Refine your search</p><h2 id="advanced-filter-title" className="mt-1 text-lg font-semibold">Advanced filters</h2></div><button type="button" onClick={() => setDrawerOpen(false)} aria-label="Close filters" className="grid size-9 place-items-center rounded-full bg-stone-50 hover:bg-stone-100"><X size={17}/></button></div><div className="flex-1 space-y-5 overflow-y-auto p-5">{filterFields}</div><div className="flex gap-3 border-t border-stone-100 p-5"><button type="button" onClick={reset} className="h-12 flex-1 rounded-xl border border-stone-200 text-sm font-semibold text-stone-600 hover:bg-stone-50">Reset filters</button><button type="button" onClick={() => setDrawerOpen(false)} className="flex h-12 flex-[1.4] items-center justify-center gap-2 rounded-xl bg-[#1e4b36] text-sm font-semibold text-white hover:bg-[#153b2a]"><Check size={16}/> Show properties</button></div></aside></div>}
    </>
  )
}

function Counter({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <fieldset><legend className="text-xs font-semibold text-[#596157]">{label}</legend><div className="mt-2 flex flex-wrap gap-1.5">{['Any', '1', '2', '3', '4', '5+'].map((item) => <button type="button" key={item} aria-pressed={value === item} onClick={() => onChange(value === item && item !== 'Any' ? 'Any' : item)} className={`min-w-10 rounded-lg border px-3 py-2 text-xs font-medium transition ${value === item ? 'border-[#1e4b36] bg-[#edf3eb] text-[#1e4b36]' : 'border-[#e7e9e3] text-[#687066] hover:border-[#9bae9c]'}`}>{item}</button>)}</div></fieldset>
}
