'use client'

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { Button } from './ui/button'

type FaqItem = {
  question: string
  answer: string
}

const faqData: FaqItem[] = [
  {
    question: "What is The Sandbox?",
    answer: "The Sandbox is an annual national-level competition event organized by IEEE ITB Student Branch, featuring three competitions: ProtoTech Competition (PTC), Technovate Paper Competition (TPC), and Business Case Competition (BCC)."
  },
  {
    question: "Who can participate?",
    answer: "Active undergraduate (S1/D4) students from accredited Indonesian universities. PTC and TPC also accept high school/equivalent (SMA/SMK/MA) students."
  },
  {
    question: "Can I register for multiple competitions?",
    answer: "Each account can only register for one competition. However, team members (non-leaders) may appear in teams for different competitions."
  },
  {
    question: "Is there a registration fee?",
    answer: "Early Registration — PTC: Rp200.000,00, BCC: Rp150.000,00, TPC: Rp125.000,00 per team. Normal Registration — PTC: Rp220.000,00, BCC: Rp180.000,00, TPC: Rp150.000,00 per team."
  },
  {
    question: "What is the total prize pool?",
    answer: "The total prize pool across all competitions is Rp25.000.000,00++, including cash prizes, certificates, and other rewards."
  },
  {
    question: "When is the Grand Final?",
    answer: "The Grand Final and Awarding ceremony for all competitions will be held on April 25, 2027."
  }
]

export function FaqSection() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <section id="faq" className="py-24 max-w-7xl mx-auto px-6 space-y-12 border-t border-border/40">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
      </div>

      {/* Two-part layout: Left side question list, Right side large answer display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Part: Question List (Span 5 columns) */}
        <div className="lg:col-span-5 flex flex-col space-y-2">
          {faqData.map((item, index) => {
            const isSelected = selectedIndex === index
            return (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group ${
                  isSelected 
                    ? 'bg-primary/10 border-primary/50 text-primary font-semibold shadow-sm' 
                    : 'bg-card border-border hover:border-muted-foreground/50 text-foreground'
                }`}
              >
                <span className="text-sm md:text-base pr-4">{item.question}</span>
                <ChevronRight className={`h-4 w-4 shrink-0 transition-transform ${isSelected ? 'rotate-90 text-primary' : 'text-muted-foreground group-hover:translate-x-0.5'}`} />
              </button>
            )
          })}
        </div>

        {/* Right Part: Significantly Larger Answer Display Box (Span 7 columns) */}
        <div className="lg:col-span-7 bg-card border rounded-2xl p-8 md:p-10 shadow-sm relative min-h-[280px] flex flex-col justify-center">
          <div className="absolute top-6 right-6 text-primary/75 font-mono text-5xl font-extrabold select-none pointer-events-none">
            0{selectedIndex + 1}
          </div>
          
          <div className={`space-y-4 relative z-10 h-75`}>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
              {faqData[selectedIndex].question}
            </h3>
            <div className="w-12 h-1 bg-primary rounded-full" />
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed pt-2">
              {faqData[selectedIndex].answer}
            </p>
          </div>
        </div>

      </div>

      {/* Additional Support Banner with Instagram Button */}
      <div className="rounded-2xl border bg-card/60 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-sm">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-semibold">Still have further questions?</h3>
          <p className="text-sm text-muted-foreground">Our team is ready to help answer your inquiries directly.</p>
        </div>
        <Button asChild size="lg" className="shrink-0">
          <a href="https://www.instagram.com/thesandbox.itb" target="_blank" rel="noopener noreferrer">
            {/* Inline Instagram Icon */}
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
            Ask Us on Instagram
          </a>
        </Button>
      </div>
    </section>
  )
}