'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, Check, Copy, Download, Eye, ExternalLink, MessageCircle, QrCode, Share2 } from 'lucide-react'
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react'

const agencySlug = 'enframes-realty'
const agencyName = 'Enframes Realty'

export function AgentBusinessQR() {
  const [origin, setOrigin] = useState('https://platform.com')
  const [copied, setCopied] = useState(false)
  const [message, setMessage] = useState('')
  const agencyUrl = `${origin}/agency/${agencySlug}`

  useEffect(() => setOrigin(window.location.origin), [])

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(agencyUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setMessage('Clipboard access is unavailable in this browser.')
      window.setTimeout(() => setMessage(''), 2400)
    }
  }

  const downloadPoster = async () => {
    const qr = document.querySelector<HTMLCanvasElement>('#agent-qr-print-source canvas')
    if (!qr) return
    const canvas = document.createElement('canvas')
    canvas.width = 1200
    canvas.height = 1600
    const context = canvas.getContext('2d')
    if (!context) return

    context.fillStyle = '#f7f8f5'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = '#ffffff'
    context.beginPath()
    context.roundRect(70, 70, 1060, 1460, 36)
    context.fill()

    const logo = new Image()
    logo.src = '/prpen.png'
    await new Promise<void>((resolve) => {
      logo.onload = () => resolve()
      logo.onerror = () => resolve()
    })
    if (logo.naturalWidth) context.drawImage(logo, 125, 130, 130, 130)
    context.fillStyle = '#213e2c'
    context.font = '600 55px Arial'
    context.fillText('Enframes Realty', 285, 190)
    context.fillStyle = '#75816f'
    context.font = '28px Arial'
    context.fillText('Local knowledge. A better move.', 288, 238)

    const qrSize = 700
    context.drawImage(qr, (canvas.width - qrSize) / 2, 400, qrSize, qrSize)
    context.textAlign = 'center'
    context.fillStyle = '#203a2a'
    context.font = '600 47px Arial'
    context.fillText('Scan to explore our listings', canvas.width / 2, 1200)
    context.fillStyle = '#667166'
    context.font = '26px Arial'
    context.fillText('Homes · Plots · Commercial properties', canvas.width / 2, 1255)
    context.fillStyle = '#2b6b46'
    context.font = '24px Arial'
    context.fillText(agencyUrl, canvas.width / 2, 1380)

    canvas.toBlob((blob) => {
      if (!blob) return
      const link = document.createElement('a')
      const blobUrl = URL.createObjectURL(blob)
      link.href = blobUrl
      link.download = `${agencySlug}-business-qr-poster.png`
      link.click()
      URL.revokeObjectURL(blobUrl)
    }, 'image/png')
  }

  const shareWhatsApp = () => {
    const text = `Explore ${agencyName}'s verified property listings: ${agencyUrl}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
  }

  return <section aria-labelledby="business-qr-heading" className="mt-7"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-sm text-slate-500">Your client-ready agency identity</p><h2 id="business-qr-heading" className="mt-1 text-2xl font-semibold">My Business QR</h2></div><span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-semibold text-emerald-800"><Check size={13}/>Issued by Super Admin · Read only</span></div>

    <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_320px]"><article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="grid md:grid-cols-[1fr_280px]"><div className="p-5 sm:p-7"><div className="flex items-center gap-3"><div className="grid size-12 place-items-center rounded-xl border border-slate-100 bg-white"><img src="/prpen.png" alt="Enframes Realty logo" className="size-10 object-contain"/></div><div><p className="font-semibold">{agencyName}</p><p className="mt-0.5 text-xs text-slate-500">Public agency inventory</p></div></div><div className="mt-6"><p className="text-[10px] font-semibold uppercase tracking-[.12em] text-slate-400">Your unique QR destination</p><div className="mt-2 flex flex-wrap items-center gap-2"><code className="min-w-0 flex-1 overflow-x-auto rounded-lg bg-slate-50 px-3 py-2.5 text-xs text-slate-700">{agencyUrl}</code><button onClick={copyLink} className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-semibold hover:bg-slate-50" aria-label="Copy agency URL">{copied ? <Check size={14}/> : <Copy size={14}/>} {copied ? 'Copied' : 'Copy link'}</button></div></div><div className="mt-6 flex flex-wrap gap-2"><button onClick={downloadPoster} className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#1e4b36] px-4 text-xs font-semibold text-white transition hover:bg-[#153b2a]"><Download size={15}/>Download printable QR poster</button><button onClick={shareWhatsApp} className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#cfe2d1] bg-[#eff7ef] px-4 text-xs font-semibold text-[#267044] transition hover:bg-[#e6f2e7]"><MessageCircle size={15}/>Share via WhatsApp</button></div><p className="mt-3 text-[10px] text-slate-400">PNG poster includes your agency logo and QR destination.</p></div><div className="flex flex-col items-center justify-center border-t border-slate-100 bg-[#f7f9f6] p-6 md:border-l md:border-t-0"><div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"><QRCodeSVG value={agencyUrl} size={190} level="H" includeMargin/></div><p className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-medium text-slate-500"><QrCode size={13}/>Scan to open your agency page</p><div id="agent-qr-print-source" aria-hidden="true" className="fixed -left-[10000px] top-0"><QRCodeCanvas value={agencyUrl} size={512} level="H" includeMargin/></div></div></div></article>

    <aside className="flex flex-col justify-between rounded-2xl border border-[#dbe7dc] bg-[#eaf2e9] p-5 sm:p-6"><div><span className="grid size-10 place-items-center rounded-xl bg-white text-emerald-800"><Eye size={18}/></span><p className="mt-5 text-xs font-medium text-[#5e6d5d]">Total QR scans / visits</p><p className="mt-1 text-4xl font-semibold tracking-tight text-[#244630]">2,840</p><p className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800"><ArrowUpRight size={13}/>18.6% <span className="font-normal text-[#788676]">this month</span></p></div><div className="mt-6 border-t border-[#d6e2d5] pt-4"><p className="text-[10px] leading-5 text-[#6e7b6c]">Scans include visits to your public agency page from printed and shared QR codes.</p><a href={agencyUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-900">Preview agency page <ExternalLink size={13}/></a></div></aside></div>{message && <p role="status" className="mt-3 text-xs text-amber-700">{message}</p>}</section>
}
