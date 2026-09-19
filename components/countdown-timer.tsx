'use client'

import { useState, useEffect } from 'react'

export function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  })

  useEffect(() => {
    const target = new Date(targetDate).getTime()

    const updateTimer = () => {
      const now = new Date().getTime()
      const difference = target - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))

        setTimeLeft({
          days: Math.max(0, days),
          hours: Math.max(0, hours),
          minutes: Math.max(0, minutes),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 })
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  const formatDigits = (value: number) => String(value).padStart(2, '0')

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6 py-6">
      
      {/* Days Box */}
      <div className="flex flex-col items-center">
        <span className="text-xs sm:text-sm uppercase tracking-widest bg-gradient-to-r from-orange-300 to-white bg-clip-text text-transparent font-semibold mb-2">Days</span>
        <div className="bg-card/90 border-2 border-primary/30 hover:border-primary/60 transition-colors rounded-3xl w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center shadow-2xl backdrop-blur-md">
          <span className="text-3xl sm:text-6xl font-extrabold tracking-tight text-foreground font-mono">
            {formatDigits(timeLeft.days)}
          </span>
        </div>
      </div>

      {/* Colon Separator 1 */}
      <div className="flex flex-col items-center justify-center pt-6">
        <div className="flex flex-col gap-2.5">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        </div>
      </div>

      {/* Hours Box */}
      <div className="flex flex-col items-center">
        <span className="text-xs sm:text-sm uppercase tracking-widest bg-gradient-to-r from-orange-300 to-white bg-clip-text text-transparent font-semibold mb-2">Hours</span>
        <div className="bg-card/90 border-2 border-primary/30 hover:border-primary/60 transition-colors rounded-3xl w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center shadow-2xl backdrop-blur-md">
          <span className="text-3xl sm:text-6xl font-extrabold tracking-tight text-foreground font-mono">
            {formatDigits(timeLeft.hours)}
          </span>
        </div>
      </div>

      {/* Colon Separator 2 */}
      <div className="flex flex-col items-center justify-center pt-6">
        <div className="flex flex-col gap-2.5">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        </div>
      </div>

      {/* Minutes Box */}
      <div className="flex flex-col items-center">
        <span className="text-xs sm:text-sm uppercase tracking-widest bg-gradient-to-r from-orange-300 to-white bg-clip-text text-transparent font-semibold mb-2">Minutes</span>
        <div className="bg-card/90 border-2 border-primary/30 hover:border-primary/60 transition-colors rounded-3xl w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center shadow-2xl backdrop-blur-md">
          <span className="text-3xl sm:text-6xl font-extrabold tracking-tight text-foreground font-mono">
            {formatDigits(timeLeft.minutes)}
          </span>
        </div>
      </div>

    </div>
  )
}