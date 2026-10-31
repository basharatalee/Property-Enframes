'use client'

import { useEffect, useState } from 'react'
import { Check, Copy, Download, ExternalLink, QrCode, Sparkles } from 'lucide-react'
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react'

const agencies = [
  { name: 'Hussain Estate', agent: 'Ahsan Hussain', phone: '0300 1234567', city: 'Lahore', slug: 'hussain-estate', status: 'Active' },
  { name: 'Malik & Co.', agent: 'Nadia Malik', phone: '0301 4498201', city: 'Islamabad', slug: 'malik-and-co', status: 'Pending' },
  { name: 'Urban Nest Realty', agent: 'Hamza Farooq', phone: '0322 7610884', city: 'Karachi', slug: 'urban-nest-realty', status: 'Active' },
]

export function AdminQRManagement() {
  const [origin, setOrigin] = useState('https://platform.com')
  const [generated, setGenerated] = useState<string[]>([])
  const [message, setMessage] = useState('')

  useEffect(() => setOrigin(window.location.origin), [])

  const urlFor = (slug: string) => `${origin}/agency/${slug}`
  const notify = (text: string) => {
    setMessage(text)
    window.setTimeout(() => setMessage(''), 2400)
  }

  const download = (slug: string, format: 'png' | 'svg') => {
    const host = document.getElementById(`agency-qr-${slug}`)
    if (!host) return
    let dataUrl = ''
    if (format === 'png') {
      const canvas = host.querySelector('canvas')
      if (!canvas) return
      dataUrl = canvas.toDataURL('image/png')
    } else {
      const svg = host.querySelector('svg')
      if (!svg) return
      const source = new XMLSerializer().serializeToString(svg)
      dataUrl = URL.createObjectURL(new Blob([source], { type: 'image/svg+xml;charset=utf-8' }))
    }
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = `${slug}-agency-qr.${format}`
    link.click()
    if (format === 'svg') window.setTimeout(() => URL.revokeObjectURL(dataUrl), 1000)
  }

  const copy = async (slug: string) => {
    try {
      await navigator.clipboard.writeText(urlFor(slug))
      notify('Agency link copied to clipboard.')
    } catch {
      notify('Could not copy the link. Copy it from the agency URL field.')
    }
  }

  return <main className="min-h-screen bg-[#f7f8f6] text-slate-900"><header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4"><a href="/" aria-label="Property Enframes home" className="flex items-center gap-2.5"><img src="/prpen.png" alt="" className="size-9 object-contain"/><span className="text-lg font-semibold">Property <span className="text-[#f58220]">Enframes</span></span></a><a href="/login" className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50">Sign out</a></div></header><div className="mx-auto max-w-7xl px-5 py-8 lg:px-8"><p className="text-xs font-semibold uppercase tracking-[.14em] text-emerald-800">Super Admin · QR management</p><div className="mt-1 flex flex-wrap items-end justify-between gap-3"><div><h1 className="font-serif text-3xl tracking-tight sm:text-4xl">Agency QR identities</h1><p className="mt-2 text-sm text-slate-500">Generate and distribute a unique public inventory link for each registered agency.</p></div><span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-medium text-slate-500 shadow-sm"><Sparkles size={14} className="text-emerald-700"/> {agencies.length} registered agencies</span></div>

      <section className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="overflow-x-auto"><table className="w-full min-w-[760px] border-collapse text-left"><thead className="bg-slate-50 text-[10px] uppercase tracking-[.12em] text-slate-500"><tr><th className="px-5 py-4 font-semibold">Agency / agent</th><th className="px-5 py-4 font-semibold">Contact</th><th className="px-5 py-4 font-semibold">Status</th><th className="px-5 py-4 font-semibold">Agency QR</th><th className="px-5 py-4 text-right font-semibold">Actions</th></tr></thead><tbody>{agencies.map((agency) => { const hasQR = generated.includes(agency.slug); return <tr key={agency.slug} className="border-t border-slate-100 align-top"><td className="px-5 py-5"><p className="font-semibold">{agency.name}</p><p className="mt-1 text-xs text-slate-500">{agency.agent} · {agency.city}</p></td><td className="px-5 py-5 text-xs text-slate-600">{agency.phone}</td><td className="px-5 py-5"><span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${agency.status === 'Active' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>{agency.status}</span></td><td className="px-5 py-5">{hasQR ? <div className="flex items-center gap-3"><QRCodeSVG value={urlFor(agency.slug)} size={52} level="H" includeMargin/><div className="min-w-0"><p className="text-xs font-semibold text-emerald-800">QR is active</p><p className="mt-1 max-w-[210px] truncate text-[10px] text-slate-400">{urlFor(agency.slug)}</p></div><div id={`agency-qr-${agency.slug}`} aria-hidden="true" className="fixed -left-[10000px] top-0"><QRCodeCanvas value={urlFor(agency.slug)} size={512} level="H" includeMargin/><QRCodeSVG value={urlFor(agency.slug)} size={512} level="H" includeMargin/></div></div> : <span className="text-xs text-slate-400">Not generated</span>}</td><td className="px-5 py-5 text-right">{hasQR ? <div className="flex justify-end gap-1.5"><button onClick={() => download(agency.slug, 'png')} title="Download PNG" aria-label={`Download ${agency.name} QR as PNG`} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 text-[10px] font-semibold hover:bg-slate-50"><Download size={13}/>PNG</button><button onClick={() => download(agency.slug, 'svg')} title="Download SVG" aria-label={`Download ${agency.name} QR as SVG`} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 text-[10px] font-semibold hover:bg-slate-50">SVG</button><button onClick={() => copy(agency.slug)} aria-label={`Copy ${agency.name} agency link`} className="grid size-9 place-items-center rounded-lg border border-slate-200 hover:bg-slate-50"><Copy size={14}/></button></div> : <button onClick={() => setGenerated((items) => [...items, agency.slug])} className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#1e4b36] px-3 text-[11px] font-semibold text-white transition hover:bg-[#153b2a]"><QrCode size={14}/>Generate unique QR</button>}</td></tr>})}</tbody></table></div><div className="flex items-center gap-2 border-t border-slate-100 bg-slate-50/70 px-5 py-3 text-[10px] text-slate-500"><ExternalLink size={13}/>QR codes point to each agency's public inventory page. QR generation is unique by agency slug.</div></section>

      <div className="mt-5 grid gap-4 md:grid-cols-2"><div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-xs font-semibold">QR distribution</p><p className="mt-2 text-xs leading-5 text-slate-500">Share digital files with the agency or print the high-resolution SVG for storefronts, brochures, and signage.</p></div><div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-xs font-semibold">Public link format</p><code className="mt-2 block overflow-x-auto rounded-lg bg-slate-50 px-3 py-2 text-[11px] text-slate-600">{origin}/agency/[agency-slug]</code></div></div></div>{message && <div role="status" aria-live="polite" className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-medium text-white shadow-xl"><Check size={14} className="mr-2 inline"/>{message}</div>}</main>
}
