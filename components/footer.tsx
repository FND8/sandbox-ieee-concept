import Link from 'next/link'
import { ShieldCheck, Calendar, Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/40 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-row justify-between gap-8 mb-8">
        
        {/* Brand & Mission */}
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center space-x-2 mb-4">
            <img 
              src="/sandbox-logo.png" 
              alt="The Sandbox by IEEE ITB SB" 
              className="h-15 w-auto object-contain"
            />
          </div>
          <p className="text-md text-muted-foreground max-w-sm">
            #AutomatingChange
          </p>
          <p className="text-md text-muted-foreground max-w-sm">
            #AcceleratingImpact
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold tracking-wide uppercase text-foreground">Navigation</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            </li>
            <li>
              <Link href="/#about" className="hover:text-foreground transition-colors">About</Link>
            </li>
            <li>
              <Link href="/#events" className="hover:text-foreground transition-colors">Events</Link>
            </li>
            <li>
              <Link href="/#faq" className="hover:text-foreground transition-colors">FAQ</Link>
            </li>
          </ul>
        </div>

        {/*Social Links */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold tracking-wide uppercase text-foreground">Connect With Us</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a 
                href="https://www.instagram.com/thesandbox.itb" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-foreground transition-colors inline-flex items-center group"
              >
                <svg className="mr-2 h-4 w-4 text-primary transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
                @thesandbox.itb
              </a>
            </li>
            <li>
              <a 
                href="https://www.linkedin.com/company/the-sandbox-by-ieee-itb" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-foreground transition-colors inline-flex items-center group"
              >
                <svg className="mr-2 h-4 w-4 text-primary transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
                The Sandbox by IEEE ITB
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-border/40 flex flex-col sm:flex-row justify-center items-center gap-4 text-xs text-muted-foreground">
        <p className="flex items-center">
          2026. Developed by FND for IEEE ITB SB IT Fullstack Division Probation Phase purposes.
        </p>
      </div>
    </footer>
  )
}