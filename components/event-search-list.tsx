'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, MapPin, Search, ExternalLink, UserPlus, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

type Event = {
  id: string
  title: string
  description: string
  date: string
  location: string
  status: string // e.g., 'upcoming', 'ongoing', 'completed'
  theme?: string
}

export function EventSearchList({ events }: { events: Event[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // Filter events based on search query and status tab
  const filteredEvents = events.filter((event) => {
    const query = searchQuery.toLowerCase()
    
    // Match search text across title, theme, or location
    const matchesSearch =
      event.title.toLowerCase().includes(query) ||
      (event.theme && event.theme.toLowerCase().includes(query)) ||
      event.location.toLowerCase().includes(query)

    // Match status tab filter
    const matchesStatus =
      statusFilter === 'all' || event.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      
      {/* Search Input and Status Filter Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search events by title, theme, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm shadow-sm"
          />
        </div>

        {/* Status Filter Tabs / Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {['all', 'upcoming', 'ongoing', 'completed'].map((status) => {
            const isActive = statusFilter === status
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium capitalize transition-all shrink-0 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {status}
              </button>
            )
          })}
        </div>

      </div>

      {/* Events Grid or No Results State */}
      {filteredEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border rounded-xl bg-card border-dashed space-y-3">
          <p className="text-muted-foreground text-sm">
            No events found matching your filter criteria.
          </p>
          <Button 
            size="sm" 
            onClick={() => {
              setSearchQuery('')
              setStatusFilter('all')
            }}
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="flex flex-col justify-between hover:border-primary/50 transition-all duration-300 bg-card">
              <CardHeader className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-primary/10 text-primary border border-primary/20">
                    {event.theme || 'General'}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium uppercase ${
                    event.status === 'upcoming' 
                      ? 'bg-blue-500/10 text-blue-400' 
                      : event.status === 'ongoing'
                      ? 'bg-amber-500/10 text-amber-400'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {event.status}
                  </span>
                </div>
                <CardTitle className="text-xl leading-snug">{event.title}</CardTitle>
                <CardDescription className="line-clamp-3 text-sm">
                  {event.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-primary shrink-0" />
                  {new Date(event.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </div>
                <div className="flex items-center truncate">
                  <MapPin className="mr-2 h-4 w-4 text-primary shrink-0" />
                  <span className="truncate">{event.location}</span>
                </div>
              </CardContent>

              <CardFooter className="pt-4 border-t bg-muted/20 flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link href={`/events/${event.id}`}>
                    <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Details
                  </Link>
                </Button>
                <Button size="sm" className="flex-1" asChild>
                  <Link href="/login">
                    <UserPlus className="mr-1.5 h-3.5 w-3.5" /> Register
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}