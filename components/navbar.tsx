'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Clickable Logo with full page refresh */}
        <Link 
          href="/" 
          className="flex items-center focus:outline-none opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
          title="Reload page"
        >
          <img 
            src="/sandbox-logo.png" 
            alt="The Sandbox by IEEE ITB SB" 
            className="h-20 w-auto object-contain"
          />
        </Link>

        {/* Section Anchor Links */}
        <nav className="flex items-center space-x-8 text-sm font-medium text-muted-foreground">
          <a href="/#hero" className="hover:text-foreground transition-colors">Home</a>
          <a href="/#about" className="hover:text-foreground transition-colors">About</a>
          <a href="/#events" className="hover:text-foreground transition-colors">Events</a>
          <a href="/#faq" className="hover:text-foreground transition-colors">FAQ</a>
        </nav>

        {/* Admin Portal Action */}
        <div className="flex items-center space-x-4">
          <Button size="lg" asChild>
            <Link href="/login">
              Sign In
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}