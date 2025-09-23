"use client"

import React, { useState, useEffect } from 'react'
import { Mail, Users, TrendingUp, Clock, Zap } from 'lucide-react'

interface TypingEffectProps {
  text: string
  speed?: number
  onComplete?: () => void
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, speed = 50, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, speed, onComplete])

  return (
    <span className="text-gray-700">
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

interface ProgressBarProps {
  progress: number
  label: string
  color?: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, label, color = 'bg-blue-500' }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium text-gray-600">{label}</span>
        <span className="text-xs text-gray-500">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div 
          className={`${color} h-1.5 rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}

interface BeforeAfterProps {
  before: string
  after: string
  label: string
  isVisible: boolean
}

const BeforeAfter: React.FC<BeforeAfterProps> = ({ before, after, label, isVisible }) => {
  return (
    <div className={`h-[150px] flex flex-col ${isVisible ? 'animate-slide-in-right' : 'animate-slide-out-left'}`}>
      <h4 className="text-xs font-semibold text-gray-700 mb-2 flex-shrink-0 text-center">{label}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-1">
        <div className="bg-red-50 border border-red-200 rounded-lg p-2 flex flex-col transform transition-all duration-500 hover:shadow-2xl">
          <div className="flex items-center mb-1 flex-shrink-0">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse"></div>
            <span className="text-xs font-medium text-red-700">Before</span>
          </div>
          <p className="text-xs text-gray-600 flex-1">{before}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-2 flex flex-col transform transition-all duration-500 hover:shadow-2xl">
          <div className="flex items-center mb-1 flex-shrink-0">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
            <span className="text-xs font-medium text-green-700">After</span>
          </div>
          <p className="text-xs text-gray-600 flex-1">{after}</p>
        </div>
      </div>
    </div>
  )
}

const AIAgentPreview: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [emailProgress, setEmailProgress] = useState(0)
  const [leadProgress, setLeadProgress] = useState(0)
  const [enrichmentProgress, setEnrichmentProgress] = useState(0)
  const [showBeforeAfter, setShowBeforeAfter] = useState(false)
  const [currentComparisonIndex, setCurrentComparisonIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const steps = [
    {
      title: "Analyzing Lead Data",
      icon: <Users className="w-5 h-5" />,
      description: "AI is processing lead information..."
    },
    {
      title: "Writing Personalized Email",
      icon: <Mail className="w-5 h-5" />,
      description: "Crafting tailored outreach message..."
    },
    {
      title: "Enriching Lead Profile",
      icon: <TrendingUp className="w-5 h-5" />,
      description: "Gathering additional prospect data..."
    },
    {
      title: "Optimizing Send Time",
      icon: <Clock className="w-5 h-5" />,
      description: "Finding the perfect moment to reach out..."
    }
  ]

  const emailContent = "Hi Sarah,\n\nI noticed your recent post about scaling your SaaS operations. At Aturiya, we've helped companies like yours reduce onboarding time by 40% and increase trial-to-paid conversion by 25%.\n\nWould you be interested in a 15-minute call to discuss how we could help streamline your customer success process?\n\nBest regards,\nAlex"

  const beforeAfterData = [
    {
      label: "Email Personalization",
      before: "Hi, I hope this email finds you well. We have a great product that might interest you...",
      after: "Hi Sarah, I noticed your recent post about scaling your SaaS operations. At Aturiya, we've helped companies like yours reduce onboarding time by 40%..."
    },
    {
      label: "Lead Enrichment",
      before: "Basic contact information only",
      after: "Full company profile, recent activity, decision-making timeline, and personalized pain points"
    },
    {
      label: "Send Timing",
      before: "Sent immediately when added to campaign",
      after: "Optimized for Tuesday 10:30 AM based on prospect's email activity patterns"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [steps.length])

  useEffect(() => {
    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setEmailProgress(prev => {
        if (prev >= 100) return 0
        return Math.floor(prev + Math.random() * 15)
      })
      
      setLeadProgress(prev => {
        if (prev >= 100) return 0
        return Math.floor(prev + Math.random() * 10)
      })
      
      setEnrichmentProgress(prev => {
        if (prev >= 100) return 0
        return Math.floor(prev + Math.random() * 8)
      })
    }, 200)

    return () => clearInterval(progressInterval)
  }, [])

  useEffect(() => {
    // Show before/after after typing completes
    if (emailProgress > 80) {
      setTimeout(() => setShowBeforeAfter(true), 1000)
    }
  }, [emailProgress])

  useEffect(() => {
    // Cycle through before/after comparisons with slide animation
    if (showBeforeAfter) {
      const comparisonInterval = setInterval(() => {
        setIsAnimating(true)
        
        // Slide out current card
        setTimeout(() => {
          setCurrentComparisonIndex(prev => (prev + 1) % beforeAfterData.length)
          setIsAnimating(false)
        }, 500) // Half of the transition duration
      }, 3000)

      return () => clearInterval(comparisonInterval)
    }
  }, [showBeforeAfter, beforeAfterData.length])

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-4 max-w-6xl mx-auto h-[100vh] flex flex-col ">
      {/* Header */}
      <div className="text-center mb-4 flex-shrink-0 mt-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 mb-2">
          <Zap className="h-3 w-3 text-blue-600" />
          <span className="text-xs font-medium text-blue-700">AI Agent Live Demo</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Watch Your AI Agent Work</h2>
        <p className="text-gray-600 text-xs">Real-time demonstration of AI-powered lead generation and outreach</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
        {/* Left Side - Live Activity */}
        <div className="space-y-3 flex flex-col">
          {/* Current Step */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 md:p-6 border border-blue-100 flex-shrink-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-blue-500 rounded-lg text-white">
                {steps[currentStep].icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-xs">{steps[currentStep].title}</h3>
                <p className="text-xs text-gray-600">{steps[currentStep].description}</p>
              </div>
            </div>
            
            {/* Progress Bars */}
            <div className="space-y-4">
              <ProgressBar 
                progress={Math.min(emailProgress, 100)} 
                label="Email Generation" 
                color="bg-blue-500"
              />
              <ProgressBar 
                progress={Math.min(leadProgress, 100)} 
                label="Lead Processing" 
                color="bg-green-500"
              />
              <ProgressBar 
                progress={Math.min(enrichmentProgress, 100)} 
                label="Data Enrichment" 
                color="bg-purple-500"
              />
            </div>
          </div>

        </div>

        {/* Right Side - Email Preview */}
        <div className="flex flex-col space-y-3">
          {/* Email Composition */}
          <div className="bg-gray-50 rounded-xl p-4 md:p-6 border border-gray-200 flex-shrink-0 h-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-3 h-3 text-gray-600" />
              <h3 className="font-semibold text-gray-900 text-xs">Live Email Composition</h3>
              <div className="ml-auto flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500">AI Writing</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-2 border border-gray-200 min-h-[120px]">
              <div className="text-xs text-gray-500 mb-1">To: sarah@techcorp.com</div>
              <div className="text-xs text-gray-500 mb-1">Subject: Quick question about your SaaS scaling challenges</div>
              <div className="border-t pt-1 h-full">
                {emailProgress > 20 ? (
                  <TypingEffect 
                    text={emailContent}
                    speed={30}
                  />
                ) : (
                  <span className="text-gray-400 text-xs">AI is analyzing lead data...</span>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

       {/* Before/After Comparison - Centered with Fixed Width */}
       <div className="min-h-0 flex justify-center items-center py-6 my-4">
         <div className="w-[500px] h-full">
           {showBeforeAfter && (
             <div className="h-full relative overflow-hidden">
               <BeforeAfter
                 before={beforeAfterData[currentComparisonIndex].before}
                 after={beforeAfterData[currentComparisonIndex].after}
                 label={beforeAfterData[currentComparisonIndex].label}
                 isVisible={!isAnimating}
               />
             </div>
           )}
         </div>
       </div>

      {/* Bottom Stats */}
      <div className="mt-2 pt-2 border-t border-gray-200 flex-shrink-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="text-center">
            <div className="text-sm font-bold text-blue-600">2.3s</div>
            <div className="text-xs text-gray-600">Avg. Email Time</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-green-600">94%</div>
            <div className="text-xs text-gray-600">Personalization</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-purple-600">156</div>
            <div className="text-xs text-gray-600">Data Points</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-orange-600">24/7</div>
            <div className="text-xs text-gray-600">Active</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIAgentPreview
