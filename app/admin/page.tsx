import Link from 'next/link'
import { AlertCircle, Plus, Calendar } from 'lucide-react'

import { createClient } from '@/utils/supabase/server'
import { EventsTable } from './components/events-table'
import { Button } from '@/components/ui/button'
import { SignOutButton } from './components/sign-out-button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Footer } from '@/components/footer'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Secure Server-Side Fetch
  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true })

  // ERROR STATE (Requirement #11)
  if (error) {
    return (
      <div className="p-8 max-w-6xl mx-auto mt-10">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Data Retrieval Failed</AlertTitle>
          <AlertDescription>
            There was a problem connecting to the database: {error.message}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div>
      <div className="p-8 max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sandbox Events</h1>
            <p className="text-muted-foreground mt-1">Manage all festival seminars and challenges.</p>
          </div>
          <div className="flex items-center space-x-3">
            <SignOutButton />
            <Button asChild>
              <Link href="/admin/events/new">
                <Plus className="mr-2 h-4 w-4" /> Create Event
              </Link>
            </Button>
          </div>
        </div>

        {/* EMPTY STATE (Requirement #10) */}
        {!events || events.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-card border-dashed">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No events scheduled</h2>
            <p className="text-muted-foreground mb-6 max-w-sm">
              You haven't added any events for The Sandbox yet. Create your first event to get started.
            </p>
            <Button asChild>
              <Link href="/admin/events/new">
                <Plus className="mr-2 h-4 w-4" /> Create Event
              </Link>
            </Button>
          </div>
        ) : (
          /* SUCCESS STATE - Render Table */
          <EventsTable events={events} />
        )}

      </div>

      <Footer />
    </div>
  )
}