'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/brand/logo'
import { dummyCredentials } from '@/lib/properties'

export function LoginForm() {
  const [role, setRole] = useState<'realtor' | 'admin'>('realtor')
  const credentials = dummyCredentials[role]
  const goToPortal = () => { window.location.assign(role === 'admin' ? '/admin' : '/dashboard') }
  return <main className="flex min-h-screen items-center justify-center bg-[#f7f8f6] px-5 py-10"><form className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl sm:p-10" onSubmit={(event) => { event.preventDefault(); goToPortal() }}><Logo /><p className="mt-10 text-sm font-medium text-emerald-700">Demo portal</p><h1 className="mt-2 text-3xl font-semibold tracking-tight">Sign in to your portal</h1><p className="mt-2 text-sm text-slate-500">Use the prefilled dummy credentials.</p><div className="mt-7 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">{(['realtor','admin'] as const).map((item) => <button key={item} type="button" onClick={() => setRole(item)} className={`rounded-lg px-3 py-2.5 text-sm font-semibold capitalize ${role === item ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500'}`}>{item === 'admin' ? 'Super admin' : 'Realtor'}</button>)}</div><label className="mt-6 block text-sm font-medium">Phone<input defaultValue={credentials.phone} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3" /></label><label className="mt-4 block text-sm font-medium">Password<input type="password" defaultValue={credentials.password} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3" /></label><Button type="button" onClick={goToPortal} className="mt-6 h-11 w-full rounded-xl bg-emerald-700 hover:bg-emerald-800">Continue</Button><p className="mt-5 rounded-xl bg-slate-50 p-3 text-xs text-slate-500">Demo: {credentials.phone} · {credentials.password}</p></form></main>
}
