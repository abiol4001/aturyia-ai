"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Upload, X, Loader2, AlertCircle } from 'lucide-react'
import { useSdrAgentWorkflow } from '@/lib/api/hooks/useApi'
import { SDRProfileData } from '@/lib/api/types'
import { toast } from 'sonner'

interface AgentProfileFormProps {
  onSuccess: () => void
  onError?: (error: string) => void
  onCancel?: () => void
}

const SECTOR_OPTIONS = [
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'technology', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'finance', label: 'Finance' },
  { value: 'education', label: 'Education' },
  { value: 'retail', label: 'Retail' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'other', label: 'Other' }
]

const AgentProfileForm: React.FC<AgentProfileFormProps> = ({ onSuccess, onError, onCancel }) => {
  const { 
    configureAgent, 
    setupProfile, 
    isConfiguring, 
    isSettingUpProfile, 
    configureError, 
    setupProfileError 
  } = useSdrAgentWorkflow()
  
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    organization: '',
    department: '',
    activities: '',
    sector: 'sales'
  })
  
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSectorChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      sector: value
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragActive(false)
    
    const file = e.dataTransfer.files[0]
    if (file && isValidFileType(file)) {
      setUploadedFile(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragActive(false)
  }

  const isValidFileType = (file: File) => {
    const validTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml']
    return validTypes.includes(file.type)
  }

  const removeFile = () => {
    setUploadedFile(null)
  }

  const handleCancelClick = () => {
    onCancel?.()
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Agent name is required'
    }
    
    if (!formData.organization.trim()) {
      newErrors.organization = 'Organization is required'
    }
    
    if (!formData.department.trim()) {
      newErrors.department = 'Department is required'
    }
    
    if (!formData.activities.trim()) {
      newErrors.activities = 'Activities description is required'
    } else if (formData.activities.trim().length < 10) {
      newErrors.activities = 'Activities description must be at least 10 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // First, configure the agent
      await new Promise<void>((resolve, reject) => {
        configureAgent(undefined, {
          onSuccess: () => {
            console.log('Agent configured successfully')
            resolve()
          },
          onError: (error) => {
            console.error('Error configuring agent:', error)
            reject(error)
          }
        })
      })
      
      // Then, setup the profile
      const profileData: SDRProfileData = {
        name: formData.name.trim(),
        tagline: formData.tagline.trim(),
        organization: formData.organization.trim(),
        department: formData.department.trim(),
        activities: formData.activities.trim(),
        sector: formData.sector,
        avatar: uploadedFile || undefined
      }
      
      await new Promise<void>((resolve, reject) => {
        setupProfile(profileData, {
          onSuccess: () => {
            console.log('Profile setup successfully')
            resolve()
          },
          onError: (error) => {
            console.error('Error setting up profile:', error)
            reject(error)
          }
        })
      })
      
      // Show single success toast after both operations complete
      toast.success('Agent profile configured successfully!')
      onSuccess()
    } catch (error) {
      console.error('Error in configuration process:', error)
      onError?.('Failed to configure agent profile. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Agent Details */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Agent Name *
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g., Acme SDR"
              value={formData.name}
              onChange={handleInputChange}
              className={`h-11 ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            {errors.name && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline" className="text-sm font-medium">
              Tagline
            </Label>
            <Input
              id="tagline"
              name="tagline"
              placeholder="e.g., Intelligent Sales Assistant"
              value={formData.tagline}
              onChange={handleInputChange}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization" className="text-sm font-medium">
              Organization *
            </Label>
            <Input
              id="organization"
              name="organization"
              placeholder="e.g., Acme Corporation"
              value={formData.organization}
              onChange={handleInputChange}
              className={`h-11 ${errors.organization ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            {errors.organization && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.organization}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="department" className="text-sm font-medium">
              Department *
            </Label>
            <Input
              id="department"
              name="department"
              placeholder="e.g., Sales"
              value={formData.department}
              onChange={handleInputChange}
              className={`h-11 ${errors.department ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            {errors.department && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.department}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="sector" className="text-sm font-medium">
              Sector
            </Label>
            <Select value={formData.sector} onValueChange={handleSectorChange}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select a sector" />
              </SelectTrigger>
              <SelectContent>
                {SECTOR_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Right Column - Agent Icon Upload */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Agent Icon (Optional)
            </Label>
            
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-amber-500 bg-amber-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {uploadedFile ? (
                <div className="space-y-4">
                  <div className="relative inline-block">
                    <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto">
                      <Upload className="h-8 w-8 text-white" />
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{uploadedFile.name}</p>
                    <p className="text-xs text-gray-500">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto">
                    <Upload className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Drop icon here or click to browse
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPEG, GIF, WebP, SVG, max 5MB
                    </p>
                  </div>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".png,.jpg,.jpeg,.gif,.webp,.svg"
                    onChange={handleFileUpload}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('file-upload')?.click()}
                    className="mt-2"
                  >
                    Choose File
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Full Width - Activities Description */}
      <div className="space-y-2">
        <Label htmlFor="activities" className="text-sm font-medium">
          Activities Description *
        </Label>
        <Textarea
          id="activities"
          name="activities"
          placeholder="Describe the agent's primary activities and responsibilities in detail..."
          value={formData.activities}
          onChange={handleInputChange}
          className={`min-h-[120px] resize-y w-full ${errors.activities ? 'border-red-500 focus:border-red-500' : ''}`}
        />
        {errors.activities && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {errors.activities}
          </p>
        )}
      </div>

      {/* Error Display */}
      {(configureError || setupProfileError) && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-700">
              {configureError 
                ? 'Failed to configure agent. Please try again.'
                : 'Failed to setup agent profile. Please try again.'
              }
            </p>
          </div>
        </div>
      )}

      {/* Form Actions */}
      <div className="flex justify-between space-x-3 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancelClick}
          >
            Cancel
          </Button>
        <Button
          type="submit"
          className="bg-amber-500 hover:bg-amber-600 text-white"
          disabled={isSubmitting || isConfiguring || isSettingUpProfile}
        >
          {(isSubmitting || isConfiguring || isSettingUpProfile) ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {isConfiguring ? 'Configuring...' : 'Setting up...'}
            </>
          ) : (
            'Save Configuration'
          )}
        </Button>
      </div>
    </form>
  )
}

export default AgentProfileForm
