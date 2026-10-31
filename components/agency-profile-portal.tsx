'use client'

import { useMemo, useState } from 'react'
import {
  BadgeCheck, Building2, Check, ChevronDown, House, Mail, MapPin,
  MessageCircle, Phone, RotateCcw, ShieldCheck, SlidersHorizontal,
} from 'lucide-react'

type PropertyType = 'Homes' | 'Plots' | 'Commercial'
type Listing = {
  id: string
  title: string
  city: string
  locality: string
  category: PropertyType
  price: string
  area: string
  details: string
  image: string
}

const listings: Listing[] = [
  { id: 'PE-LHR-24861', title: 'A quieter kind of city living', city: 'Lahore', locality: 'DHA Phase 6', category: 'Homes', price: 'PKR 4.85 Cr', area: '1 kanal', details: '5 beds · 6 baths', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=90' },
  { id: 'PE-LHR-25110', title: 'Family home beside the park', city: 'Lahore', locality: 'Bahria Town', category: 'Homes', price: 'PKR 2.65 Cr', area: '10 marla', details: '4 beds · 5 baths', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1100&q=90' },
  { id: 'PE-LHR-25204', title: 'A corner plot with room to build', city: 'Lahore', locality: 'DHA Phase 8', category: 'Plots', price: 'PKR 1.9 Cr', area: '1 kanal', details: 'Residential · Corner', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1100&q=90' },
  { id: 'PE-ISB-19382', title: 'Room to grow, close to everything', city: 'Islamabad', locality: 'Bahria Town', category: 'Homes', price: 'PKR 2.15 Cr', area: '10 marla', details: '3 beds · 4 baths', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1100&q=90' },
  { id: 'PE-ISB-19742', title: 'Build your future in the capital', city: 'Islamabad', locality: 'Gulberg Greens', category: 'Plots', price: 'PKR 1.35 Cr', area: '8 marla', details: 'Residential · Possession ready', image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1100&q=90' },
  { id: 'PE-KHI-11903', title: 'A bright apartment above the city', city: 'Karachi', locality: 'Clifton Block 8', category: 'Commercial', price: 'PKR 3.2 Cr', area: '2,100 sq ft', details: 'Office · 2 parking spaces', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1100&q=90' },
]

const agency = {
  name: 'Enframes Realty', tagline: 'Local knowledge. A better move.',
  phone: '+923001234567', email: 'hello@enframes.example', whatsapp: '923001234567',
  cover: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=90',
}
const cities = ['All cities', ...new Set(listings.map((listing) => listing.city))]
const categories = ['All property types', 'Homes', 'Plots', 'Commercial'] as const

export function AgencyProfilePortal() {
  const [city, setCity] = useState('All cities')
  const [locality, setLocality] = useState('All neighborhoods')
  const [category, setCategory] = useState<(typeof categories)[number]>('All property types')

  const availableLocalities = useMemo(() => city === 'All cities'
    ? [...new Set(listings.map((listing) => listing.locality))]
    : [...new Set(listings.filter((listing) => listing.city === city).map((listing) => listing.locality))], [city])

  const filteredListings = useMemo(() => listings.filter((listing) =>
    (city === 'All cities' || listing.city === city) &&
    (locality === 'All neighborhoods' || listing.locality === locality) &&
    (category === 'All property types' || listing.category === category),
  ), [city, locality, category])

  const chooseCity = (nextCity: string) => {
    setCity(nextCity)
    setLocality('All neighborhoods')
  }

  const resetFilters = () => {
    setCity('All cities')
    setLocality('All neighborhoods')
    setCategory('All property types')
  }

  const whatsappLink = (message: string) => `https://wa.me/${agency.whatsapp}?text=${encodeURIComponent(message)}`

  return (
    <main className="min-h-screen bg-[#f7f8f5] text-[#20251f]">
      <header className="border-b border-black/[0.07] bg-white"><div className="mx-auto flex h-[68px] max-w-[1320px] items-center justify-between px-5 sm:px-8"><a href="/" className="flex items-center gap-2.5" aria-label="Property Enframes home"><img src="/prpen.png" alt="" className="size-9 object-contain"/><span className="text-[17px] font-semibold tracking-[-.04em]">Property <span className="text-[#f58220]">Enframes</span></span></a><a href="/" className="rounded-full border border-stone-200 px-4 py-2 text-xs font-semibold text-stone-600 transition hover:border-emerald-800 hover:text-emerald-900">Browse properties</a></div></header>

      <section className="relative overflow-hidden bg-[#203d2c] text-white"><div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url('${agency.cover}')` }}/><div className="absolute inset-0 bg-gradient-to-r from-[#172c20]/95 via-[#172c20]/75 to-[#172c20]/35"/><div className="relative mx-auto max-w-[1320px] px-5 py-10 sm:px-8 sm:py-14 lg:py-[70px]"><div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between"><div className="flex items-start gap-4 sm:gap-5"><div className="grid size-[76px] shrink-0 place-items-center overflow-hidden rounded-[20px] border border-white/25 bg-white shadow-lg sm:size-[92px]"><img src="/prpen.png" alt="Enframes Realty logo" className="size-full object-contain p-2"/></div><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h1 className="font-serif text-3xl tracking-[-.035em] sm:text-[42px]">{agency.name}</h1><span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold text-white"><BadgeCheck size={14} fill="currentColor" className="text-[#c5e7c4]"/><span className="text-white">Verified agency</span></span></div><p className="mt-1.5 text-sm text-white/75">{agency.tagline}</p><div className="mt-4 flex flex-wrap items-center gap-2"><span className="text-[10px] font-semibold uppercase tracking-[.13em] text-white/55">Serving</span>{['Lahore', 'Islamabad', 'Karachi'].map((area) => <span key={area} className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-medium">{area}</span>)}</div></div></div><div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur"><span className="grid size-10 place-items-center rounded-xl bg-white/10"><Building2 size={19}/></span><div><p className="text-[10px] font-medium text-white/65">Active listings</p><p className="text-xl font-semibold">{listings.length}</p></div><span className="ml-2 hidden h-8 border-l border-white/20 sm:block"/><span className="hidden text-[10px] leading-4 text-white/65 sm:block">Verified and<br/>ready to view</span></div></div>

          <div className="mt-7 flex flex-wrap gap-2.5"><a href={`tel:${agency.phone}`} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-xs font-bold text-[#254632] transition hover:bg-[#edf4e9]"><Phone size={15}/> Call now</a><a href={`mailto:${agency.email}`} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 text-xs font-semibold text-white transition hover:bg-white/20"><Mail size={15}/> Send email</a><a href={whatsappLink(`Hello ${agency.name}, I'd like to learn more about your property listings.`)} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#27a85f] px-5 text-xs font-bold text-white shadow-lg shadow-black/10 transition hover:bg-[#218d50]"><MessageCircle size={16}/> WhatsApp direct chat</a></div>
        </div></section>

      <section className="mx-auto max-w-[1320px] px-5 py-8 sm:px-8 sm:py-10"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#778271]">The agency portfolio</p><h2 className="mt-1 font-serif text-3xl tracking-[-.035em]">Find your next place</h2><p className="mt-1.5 text-xs text-stone-500">Explore verified listings represented by {agency.name}.</p></div><div className="rounded-full bg-white px-3 py-2 text-[11px] font-medium text-stone-500 shadow-sm"><span className="font-semibold text-[#29432f]">{filteredListings.length}</span> of {listings.length} properties</div></div>

        <div className="mt-5 rounded-[18px] border border-[#e6e9e2] bg-white p-3 shadow-sm sm:p-4"><div className="flex flex-wrap items-center gap-2.5"><span className="mr-1 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[.1em] text-stone-400"><SlidersHorizontal size={13}/>Quick filters</span><label className="relative min-w-[145px] flex-1 sm:flex-none"><span className="sr-only">Filter by city</span><MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-800"/><select value={city} onChange={(event) => chooseCity(event.target.value)} className="h-10 w-full appearance-none rounded-xl border border-[#e5e8e1] bg-white pl-9 pr-8 text-xs font-semibold outline-none focus:border-emerald-700"><option>All cities</option>{cities.slice(1).map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"/></label><label className="relative min-w-[165px] flex-1 sm:flex-none"><span className="sr-only">Filter by neighborhood</span><select value={locality} onChange={(event) => setLocality(event.target.value)} className="h-10 w-full appearance-none rounded-xl border border-[#e5e8e1] bg-white px-3 pr-8 text-xs font-semibold outline-none focus:border-emerald-700"><option>All neighborhoods</option>{availableLocalities.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"/></label><label className="relative min-w-[165px] flex-1 sm:flex-none"><span className="sr-only">Filter by property type</span><select value={category} onChange={(event) => setCategory(event.target.value as (typeof categories)[number])} className="h-10 w-full appearance-none rounded-xl border border-[#e5e8e1] bg-white px-3 pr-8 text-xs font-semibold outline-none focus:border-emerald-700">{categories.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"/></label><button onClick={resetFilters} className="inline-flex h-10 items-center gap-1.5 rounded-xl px-3 text-xs font-semibold text-stone-500 transition hover:bg-stone-50 hover:text-emerald-900"><RotateCcw size={13}/> Reset</button></div></div>

        {filteredListings.length ? <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{filteredListings.map((listing) => <ListingCard key={listing.id} listing={listing} whatsappLink={whatsappLink}/>)}</div> : <div className="mt-5 rounded-[22px] border border-dashed border-[#d8dfd5] bg-white px-5 py-14 text-center"><span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#edf3eb] text-emerald-800"><House size={24}/></span><h3 className="mt-4 font-serif text-2xl">No listings in this selection yet</h3><p className="mx-auto mt-2 max-w-md text-xs leading-5 text-stone-500">Try another city or property type, or get in touch and our team can help you find the right fit.</p><div className="mt-5 flex flex-wrap justify-center gap-2"><button onClick={resetFilters} className="inline-flex h-10 items-center gap-2 rounded-xl border border-stone-200 px-4 text-xs font-semibold hover:bg-stone-50"><RotateCcw size={14}/> Reset filters</button><a href={whatsappLink(`Hello ${agency.name}, I'm looking for a property and couldn't find a match in the current listings.`)} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#1e4b36] px-4 text-xs font-semibold text-white hover:bg-[#153b2a]"><MessageCircle size={14}/> Message the agency</a></div></div>}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-[10px] text-stone-400"><ShieldCheck size={13} className="text-emerald-700"/>All listings on this page are represented by {agency.name}.</div>
      </section>
    </main>
  )
}

function ListingCard({ listing, whatsappLink }: { listing: Listing; whatsappLink: (message: string) => string }) {
  const message = `Hi, I'm interested in "${listing.title}" (Listing ID: ${listing.id}). Please share more details.`
  return <article className="group overflow-hidden rounded-[18px] border border-[#e6e9e2] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"><a href={`/property/${listing.id}`} className="relative block h-[220px] overflow-hidden bg-stone-100"><img src={listing.image} alt={`${listing.category} in ${listing.locality}, ${listing.city}`} className="size-full object-cover transition duration-500 group-hover:scale-[1.035]"/><span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1.5 text-[10px] font-semibold text-[#3d5140]">{listing.category}</span><span className="absolute right-3 top-3 rounded-full bg-[#1e4b36]/90 px-2.5 py-1.5 text-[10px] font-semibold text-white"><Check size={11} className="mr-1 inline"/>Active</span></a><div className="p-4"><p className="text-sm font-bold text-[#264532]">{listing.price}</p><a href={`/property/${listing.id}`} className="mt-1.5 block font-serif text-[19px] leading-snug tracking-tight text-[#273329] hover:text-emerald-800">{listing.title}</a><p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-stone-500"><MapPin size={13} className="shrink-0 text-emerald-800"/>{listing.locality}, {listing.city}</p><div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3"><span className="text-xs font-semibold text-[#465247]">{listing.area}</span><span className="text-[10px] text-stone-400">{listing.details}</span></div><div className="mt-4 flex items-center justify-between gap-2"><span className="font-mono text-[9px] text-stone-400">ID: {listing.id}</span><a href={whatsappLink(message)} target="_blank" rel="noreferrer" className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#edf6ee] px-3 text-[10px] font-bold text-[#287344] transition hover:bg-[#dceedd]"><MessageCircle size={14}/> Enquire on WhatsApp</a></div></div></article>
}
