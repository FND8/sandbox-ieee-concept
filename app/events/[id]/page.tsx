import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, MapPin, ArrowLeft, Tag, UserPlus } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/footer'
import { CountdownTimer } from '@/components/countdown-timer'

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const supabase = await createClient()
  const { id } = await params

  // Securely query the specific event by ID
  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !event) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary selection:text-primary-foreground">
      
      {/* 1. TOP NAVBAR / BACK NAVIGATION */}
      <div className="w-full mx-auto px-6 h-16 flex items-center justify-start">
        <Button variant="outline" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </Button>
      </div>

      {/* 2. MAIN EVENT CONTENT */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-12 space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs px-3 py-1 rounded-full font-medium bg-primary/10 text-primary border border-primary/20 flex items-center">
              <Tag className="mr-1.5 h-3.5 w-3.5" />
              {event.theme || 'General'}
            </span>
            <span className={`text-xs px-3 py-1 rounded-full font-medium uppercase ${
              event.status === 'upcoming' 
                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {event.status}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            {event.title}
          </h1>
        </div>

        <CountdownTimer targetDate={event.date}/>

        {/* METADATA GRID CARD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 rounded-xl border bg-card/50">
          <div className="flex items-center space-x-3 text-muted-foreground">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">Registration Deadline</p>
              <p className="text-sm">
                {new Date(event.date).toLocaleDateString('en-GB', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-muted-foreground">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">Location</p>
              <p className="text-sm">{event.location}</p>
            </div>
          </div>
        </div>

        {/* FULL DESCRIPTION SECTION */}
        <div className="space-y-4 pt-4 border-t">
          <h2 className="text-xl text-center font-semibold">About This Event</h2>
          <div className="text-muted-foreground whitespace-pre-line leading-relaxed text-base bg-card/20 p-6 rounded-xl border">
            {event.description}
          </div>
        </div>

        {/* BOTTOM CALL TO ACTION */}
        <div className="pt-6 items-center flex justify-center">
          <Button size="lg" asChild>
            <Link href="/login">
              <UserPlus className="mr-2 h-4 w-4" /> Register Now
            </Link>
          </Button>
        </div>
      </main>

      {/* 3. FOOTER */}
      <Footer />

    </div>
  )
}