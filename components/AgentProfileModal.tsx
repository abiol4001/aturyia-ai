"use client"

import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import AgentProfileForm from './AgentProfileForm'
import KnowledgeBaseUpload from './KnowledgeBaseUpload'
import { useRouter } from 'next/navigation'

interface AgentProfileModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

const AgentProfileModal: React.FC<AgentProfileModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState<'profile' | 'knowledge'>('knowledge')
  const [isUploadingKnowledge, setIsUploadingKnowledge] = useState(false)
  const [knowledgeError, setKnowledgeError] = useState<string | null>(null)

  const router = useRouter()

  const handleProfileSuccess = () => {
    setCurrentStep('knowledge')
  }

  const handleProfileError = (error: string) => {
    console.error('Profile configuration error:', error)
  }

  const handleKnowledgeUpload = async (files: File[]) => {
    setIsUploadingKnowledge(true)
    setKnowledgeError(null)

    try {
      // Import sdrService here to avoid circular dependency
      const { sdrService } = await import('@/lib/api')
      await sdrService.uploadKnowledgeBase(files)
      
      console.log('Knowledge base uploaded successfully')
      onSuccess?.()
      onClose()
    } catch (error) {
      console.error('Error uploading knowledge base:', error)
      setKnowledgeError('Failed to upload knowledge base documents. Please try again.')
      throw error
    } finally {
      setIsUploadingKnowledge(false)
    }
  }

  const handleKnowledgeSkip = () => {
    console.log('Skipping knowledge base setup')
    onSuccess?.()
    setTimeout(() => {
      onClose()
    }, 2000);
    router.push('/library/sdr/campaigns')
  }

  const handleBackToProfile = () => {
    setCurrentStep('profile')
  }

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep('profile')
      setKnowledgeError(null)
      setIsUploadingKnowledge(false)
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:min-w-3xl lg:min-w-4xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {currentStep === 'profile' ? 'Agent Profile' : 'Knowledge Base Setup'}
          </DialogTitle>
          {currentStep === 'knowledge' && (
            <p className="text-sm text-muted-foreground text-center mt-2">
              Upload documents to help your SDR agent understand your business better
            </p>
          )}
        </DialogHeader>
        
        {currentStep === 'profile' ? (
          <div className="space-y-6">
            <AgentProfileForm 
              onSuccess={handleProfileSuccess}
              onError={handleProfileError}
              onCancel={onClose}
            />
          </div>
        ) : (
          <KnowledgeBaseUpload
            onUpload={handleKnowledgeUpload}
            onSkip={handleKnowledgeSkip}
            onBack={handleBackToProfile}
            isUploading={isUploadingKnowledge}
            error={knowledgeError}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AgentProfileModal
