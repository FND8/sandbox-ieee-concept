'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Edit, Trash2, Calendar, Loader2 } from "lucide-react"
import { toast } from 'sonner'

import { createClient } from '@/utils/supabase/client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export type Event = {
  id: string
  title: string
  theme: string
  date: string
  location: string
  status: string
}

export function EventsTable({ events }: { events: Event[] }) {
  const router = useRouter()
  const supabase = createClient()
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  async function handleDelete(id: string) {
    setIsDeleting(id)

    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('Failed to delete event', {
        description: error.message,
      })
      setIsDeleting(null)
      return
    }

    toast.success('Event deleted successfully')
    setIsDeleting(null)
    
    // Refresh the current route to trigger the server component to refetch data
    router.refresh()
  }

  return (
    <div className="border rounded-md overflow-hidden bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Theme</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">{event.title}</TableCell>
              <TableCell>{event.theme || '-'}</TableCell>
              <TableCell>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  {new Date(event.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </div>
              </TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  event.status === 'upcoming' 
                    ? 'bg-primary/20 text-primary' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {event.status.toUpperCase()}
                </span>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm" asChild disabled={isDeleting === event.id}>
                  <Link href={`/admin/events/${event.id}/edit`}>
                    <Edit className="h-4 w-4 mr-2" /> Edit
                  </Link>
                </Button>

                {/* AlertDialog serves as the confirmation gate */}
                <AlertDialog>
                  {/* Apply button styling directly to the trigger to avoid nested buttons */}
                  <AlertDialogTrigger 
                    className={buttonVariants({ variant: "destructive", size: "sm" })}
                    disabled={isDeleting === event.id}
                  >
                    {isDeleting === event.id ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4 mr-2" />
                    )}
                    Delete
                  </AlertDialogTrigger>
                  
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the event
                        "{event.title}" from the database.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => handleDelete(event.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Yes, delete event
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}