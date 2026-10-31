'use client'

import { useState } from 'react'
import { ArrowDownUp, Check, Copy, X } from 'lucide-react'

export type AreaUnit = 'Sq Ft' | 'Sq Yds' | 'Marla' | 'Kanal'

const units: AreaUnit[] = ['Sq Ft', 'Sq Yds', 'Marla', 'Kanal']
const marlaOptions = [225, 272.25] as const

function factors(marlaSqFt: number): Record<AreaUnit, number> {
  return { 'Sq Ft': 1, 'Sq Yds': 9, Marla: marlaSqFt, Kanal: marlaSqFt * 20 }
}

function ConverterContent() {
  const [value, setValue] = useState('1')
  const [fromUnit, setFromUnit] = useState<AreaUnit>('Marla')
  const [toUnit, setToUnit] = useState<AreaUnit>('Sq Ft')
  const [marlaSqFt, setMarlaSqFt] = useState<number>(225)
  const [copied, setCopied] = useState(false)
  const conversionFactors = factors(marlaSqFt)
  const result = ((Number(value) || 0) * conversionFactors[fromUnit]) / conversionFactors[toUnit]
  const formattedResult = result.toLocaleString(undefined, { maximumFractionDigits: 2 })

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(`${formattedResult} ${toUnit}`)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  const cheatRows = [
    { label: '1 Marla', marlas: 1 },
    { label: '5 Marla', marlas: 5 },
    { label: '10 Marla', marlas: 10 },
    { label: '1 Kanal', marlas: 20 },
  ]

  return (
    <div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3">
        <label className="block text-xs font-semibold text-stone-600">From<input type="number" min="0" value={value} onChange={(event) => setValue(event.target.value)} aria-label="Input value" className="mt-2 h-12 w-full rounded-xl border border-stone-200 px-3 text-lg font-medium text-[#26382c] outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10"/><select value={fromUnit} onChange={(event) => setFromUnit(event.target.value as AreaUnit)} aria-label="Unit A" className="mt-2 h-10 w-full rounded-xl border border-stone-200 bg-white px-3 text-sm font-medium outline-none focus:border-emerald-700">{units.map((unit) => <option key={unit}>{unit}</option>)}</select></label>
        <ArrowDownUp aria-hidden="true" className="mb-3 text-emerald-800" size={18}/>
        <label className="block text-xs font-semibold text-stone-600">To<input type="text" readOnly value={formattedResult} aria-label="Converted value" aria-live="polite" className="mt-2 h-12 w-full rounded-xl border border-[#dfe8df] bg-[#f3f7f1] px-3 text-lg font-semibold text-[#234331] outline-none"/><select value={toUnit} onChange={(event) => setToUnit(event.target.value as AreaUnit)} aria-label="Unit B" className="mt-2 h-10 w-full rounded-xl border border-stone-200 bg-white px-3 text-sm font-medium outline-none focus:border-emerald-700">{units.map((unit) => <option key={unit}>{unit}</option>)}</select></label>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3"><div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-500"><span>Marla standard:</span>{marlaOptions.map((factor) => <button key={factor} type="button" aria-pressed={marlaSqFt === factor} onClick={() => setMarlaSqFt(factor)} className={`rounded-full px-2.5 py-1 font-semibold transition ${marlaSqFt === factor ? 'bg-[#e8f0e7] text-emerald-900' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}>{factor} sq ft</button>)}</div><button type="button" onClick={copyResult} className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-emerald-900 transition hover:bg-[#f1f5ef]" aria-label="Copy converted value">{copied ? <Check size={14}/> : <Copy size={14}/>} {copied ? 'Copied' : 'Copy'}</button></div>
      <div className="mt-5 overflow-hidden rounded-xl border border-stone-200"><div className="flex items-center justify-between bg-[#f7f8f5] px-3 py-2.5"><h3 className="text-xs font-semibold text-[#3c483d]">Quick conversion</h3><span className="text-[10px] text-stone-500">Square feet</span></div><table className="w-full text-left text-xs"><caption className="sr-only">Marla and kanal equivalents in square feet</caption><tbody>{cheatRows.map((row) => <tr key={row.label} className="border-t border-stone-100"><th scope="row" className="px-3 py-2.5 font-medium text-stone-600">{row.label}</th><td className="px-3 py-2.5 text-right font-semibold text-[#26382c]">{(row.marlas * marlaSqFt).toLocaleString()} sq ft</td><td className="px-3 py-2.5 text-right text-stone-500">{(row.marlas * marlaSqFt / 9).toLocaleString(undefined, { maximumFractionDigits: 2 })} sq yds</td></tr>)}</tbody></table></div>
    </div>
  )
}

export function AreaUnitConverter() {
  return <section aria-labelledby="area-converter-title" className="rounded-2xl border border-[#e7e9e3] bg-white p-4 shadow-sm"><div className="mb-4"><p className="text-[10px] font-semibold uppercase tracking-[.13em] text-emerald-800">Area tools</p><h2 id="area-converter-title" className="mt-1 text-base font-semibold text-[#26382c]">Unit converter</h2></div><ConverterContent/><p className="mt-3 text-[10px] leading-4 text-stone-400">1 kanal = 20 marlas. Choose the marla standard used in your area.</p></section>
}

export function AreaUnitConverterModal({ onClose }: { onClose: () => void }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#101912]/50 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section role="dialog" aria-modal="true" aria-labelledby="area-converter-modal-title" className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-[24px] bg-white p-6 shadow-2xl sm:p-7"><div className="mb-5 flex items-start justify-between"><div><p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-emerald-800">Area tools</p><h2 id="area-converter-modal-title" className="mt-1 font-serif text-2xl text-[#26382c]">Unit converter</h2></div><button type="button" onClick={onClose} aria-label="Close unit converter" className="grid size-9 place-items-center rounded-full bg-stone-50 hover:bg-stone-100"><X size={18}/></button></div><ConverterContent/><p className="mt-4 text-[11px] leading-5 text-stone-400">1 kanal = 20 marlas. Choose the marla standard used in your area.</p></section></div>
}
