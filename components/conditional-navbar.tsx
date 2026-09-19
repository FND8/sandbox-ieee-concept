'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/navbar'

export function ConditionalNavbar() {
  const pathname = usePathname()

  // Check if the current route starts with /admin
  const isAdminRoute = pathname?.startsWith('/admin')

  // Do not render the public navbar on any admin routes
  if (isAdminRoute) {
    return null
  }

  return <Navbar />
}