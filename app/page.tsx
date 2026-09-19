import { Calendar, ArrowRight } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'
import { FaqSection } from '@/components/faq-section'
import { Footer } from '@/components/footer'
import { EventSearchList } from '@/components/event-search-list'

export default async function PublicLandingPage() {
  const supabase = await createClient()

  // Fetch all active events from Supabase for the public view
  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true })

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary selection:text-primary-foreground">
      <main className="flex-1">
        
        {/* 1. HERO SECTION */}
        <section id="hero" className="relative py-24 md:py-32 overflow-hidden border-b border-border/40">
          {/* Transparent Watermark Logo Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
            <img 
              src="/sandbox-logo.png" 
              alt="Watermark Logo" 
              className="w-[600px] md:w-[850px] h-auto object-contain opacity-[0.3] select-none translate-y-0"
            />
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center space-y-8">

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl">
              Shaping the Future of Industry with <span className="bg-gradient-to-r from-orange-300 to-white bg-clip-text text-transparent">Smart Automation Technology</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Explore the frontiers of technology, innovation, and professional development through our curated series of technical seminars and competitive challenges.
            </p>

            {/* <CountdownTimer targetDate="2027-03-10T23:59:59"/> */}

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Button size="lg" asChild className="w-full sm:w-auto">
                <a href="#events">
                  Explore Events <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                <a href="#about">Learn More</a>
              </Button>
            </div>
          </div>
        </section>

        {/* 2. ABOUT SECTION WITH STATS */}
        <section id="about" className="py-24 border-b border-border/45 bg-card/20">
          <div className="max-w-7xl mx-auto px-6 space-y-16">
            
            {/* Header intro */}
            <div className="flex flex-col w-full space-y-4 text-center items-center">
              <h2 className="text-3xl font-bold tracking-tight">About The Sandbox</h2>
              <p className="text-muted-foreground text-md leading-relaxed max-w-5xl">
                The Sandbox is a premier technology festival hosted annually by IEEE ITB Student Branch. With a main theme of “Shaping the Future of Industry with Smart Automation Technology”, featuring a curated series of seminars and competitive challenges, the event empowers students to explore the frontiers of technology, innovation, and professional development.
              </p>
            </div>

            {/* Three-Column Stats Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
              
              {/* Stat 1: Feedback */}
              <div className="border border-border/60 rounded-2xl p-8 bg-card/60 backdrop-blur-sm flex flex-col items-center text-center space-y-3 shadow-lg hover:border-primary/50 transition-colors">
                <span className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-orange-300 to-white bg-clip-text text-transparent">
                  4.9/5
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  The Sandbox 3.0 Feedback
                </span>
              </div>

              {/* Stat 2: Prize Pool */}
              <div className="border border-border/60 rounded-2xl p-8 bg-card/60 backdrop-blur-sm flex flex-col items-center text-center space-y-3 shadow-lg hover:border-primary/50 transition-colors">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-semibold tracking-widest bg-gradient-to-r from-orange-300 to-white bg-clip-text text-transparent">Rp</span>
                  <span className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-orange-300 to-white bg-clip-text text-transparent">
                    25.000.000++
                  </span>
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  Total Prize Pool for All The Sandbox 4.0 Competitions
                </span>
              </div>

              {/* Stat 3: Teams Involved */}
              <div className="border border-border/60 rounded-2xl p-8 bg-card/60 backdrop-blur-sm flex flex-col items-center text-center space-y-3 shadow-lg hover:border-primary/50 transition-colors">
                <span className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-orange-300 to-white bg-clip-text text-transparent">
                  300+
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  Teams involved in The Sandbox 3.0
                </span>
              </div>

            </div>

          </div>
        </section>

        {/* 3. DYNAMIC EVENTS SECTION */}
        <section id="events" className="py-24 max-w-7xl mx-auto px-6 space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b pb-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Events & Competitions</h2>
            </div>
            <div className="text-xs text-muted-foreground">
              {events ? `Total of ${events.length} Events Available` : 'Loading events...'}
            </div>
          </div>

          {error && (
            <div className="p-6 rounded-lg border border-destructive/50 bg-destructive/10 text-destructive text-center">
              Failed to load festival events. Please check database connectivity.
            </div>
          )}

          {/* EMPTY STATE */}
          {!error && (!events || events.length === 0) ? (
            <div className="flex flex-col items-center justify-center p-16 text-center border rounded-xl bg-card border-dashed space-y-4">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">No active events scheduled yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Check back soon! Our organizers are continuously updating the lineup for The Sandbox.
              </p>
            </div>
          ) : (
            /* EVENTS LIST */
            <EventSearchList events={events || []} />
          )}
        </section>

        {/* 4. FAQ SECTION */}
        <FaqSection />

      </main>

      {/* 5. FOOTER */}
      <Footer />

    </div>
  )
}