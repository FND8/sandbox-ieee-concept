'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'

export function SignOutButton() {
  const router = useRouter()
  const supabase = createClient()
  const [isSigningOut, setIsSigningOut] = useState(false)

  async function handleSignOut() {
    setIsSigningOut(true)

    const { error } = await supabase.auth.signOut()

    if (error) {
      setIsSigningOut(false)
      toast.error('Failed to sign out', {
        description: error.message,
      })
      return
    }

    toast.success('Signed out successfully')
    router.refresh()
    router.push('/login')
  }

  return (
    <Button 
      variant="destructive" 
      size="sm" 
      onClick={handleSignOut} 
      disabled={isSigningOut}
    >
      {isSigningOut ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="mr-2 h-4 w-4" />
      )}
      Sign Out
    </Button>
  )
}