'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'

import { createClient } from '@/utils/supabase/client'
import { eventSchema, type EventValues } from '@/lib/validations/event'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Footer } from '@/components/footer'

export default function CreateEventPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      status: 'upcoming',
      theme: 'Seminar',
    }
  })

  async function onSubmit(data: EventValues) {
    setIsLoading(true)

    // Convert local datetime string to ISO for Supabase TIMESTAMPTZ compatibility
    const formattedDate = new Date(data.date).toISOString()

    const { error } = await supabase
      .from('events')
      .insert([
        {
          title: data.title,
          description: data.description,
          date: formattedDate,
          location: data.location,
          status: data.status,
          theme: data.theme,
        }
      ])

    if (error) {
      setIsLoading(false)
      toast.error('Failed to create event', {
        description: error.message,
      })
      return
    }

    toast.success('Event created successfully')
    router.push('/admin')
    router.refresh() // Force the server component to refetch the updated list
  }

  return (
    <div>
      <div className="p-8 max-w-2xl mx-auto space-y-8">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon">
            <Link href="/admin">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Create New Event</h1>
            <p className="text-muted-foreground mt-1">Add a new seminar or challenge to The Sandbox schedule.</p>
          </div>
        </div>

        <div className="bg-card border rounded-lg p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input id="title" disabled={isLoading} {...register("title")} />
              {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              {/* Using native textarea styled with standard Shadcn-like utility classes */}
              <textarea 
                id="description" 
                disabled={isLoading}
                className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                {...register("description")} 
              />
              {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date">Date & Time</Label>
                <Input id="date" type="datetime-local" disabled={isLoading} {...register("date")} />
                {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="e.g. CRCS ITB or Zoom" disabled={isLoading} {...register("location")} />
                {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme / Category</Label>
                <Input id="theme" placeholder="e.g. Workshop, Competition" disabled={isLoading} {...register("theme")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select 
                  id="status"
                  disabled={isLoading}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  {...register("status")}
                >
                  <option value="upcoming" className="bg-background">Upcoming</option>
                  <option value="ongoing" className="bg-background">Ongoing</option>
                  <option value="completed" className="bg-background">Completed</option>
                </select>
                {errors.status && <p className="text-sm text-destructive">{errors.status.message}</p>}
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button variant="outline" type="button" disabled={isLoading} asChild>
                <Link href="/admin">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Event
              </Button>
            </div>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}