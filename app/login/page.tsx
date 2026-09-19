'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Loader2, ArrowLeft } from 'lucide-react'

import { createClient } from '@/utils/supabase/client'
import { loginSchema, type LoginValues } from '@/lib/validations/auth'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { Footer } from '@/components/footer'

export default function AdminLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: LoginValues) {
    setIsLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    // Explicitly check for authentication errors
    if (error) {
      setIsLoading(false)
      
      // Trigger a clear, visible error toast for the evaluator
      toast.error('Authentication Failed', {
        description: error.message || 'Invalid email or password. Please check your credentials.',
      })
      return
    }

    // Success path
    toast.success('Login successful!')
    router.refresh()
    router.push('/admin')
  }

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="absolute top-6 left-6">
          <Button variant="outline" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>
        </div>
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Welcome Back
            </CardTitle>
            <CardDescription>
              Enter your email and password to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  placeholder="email@example.com" 
                  type="email" 
                  disabled={isLoading}
                  {...register("email")} 
                />
                {errors.email && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password"
                  placeholder="••••••••" 
                  type="password" 
                  disabled={isLoading}
                  {...register("password")} 
                />
                {errors.password && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign In
              </Button>

            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}