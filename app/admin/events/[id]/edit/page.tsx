import { notFound } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { EditEventForm } from './components/edit-event-form'

// In modern Next.js, params is treated as a Promise
export default async function EditEventPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const supabase = await createClient()
  const { id } = await params

  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !event) {
    notFound() 
  }

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-8">
      <EditEventForm initialData={event} />
    </div>
  )
}