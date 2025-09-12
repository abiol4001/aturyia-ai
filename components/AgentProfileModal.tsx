"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Upload, X } from 'lucide-react'

interface AgentProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

const AgentProfileModal: React.FC<AgentProfileModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    agentName: '',
    tagline: '',
    organization: '',
    department: '',
    activitiesDescription: ''
  })
  
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData, uploadedFile)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:min-w-3xl lg:min-w-4xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Agent Profile</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Agent Details */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="agentName" className="text-sm font-medium">
                  Agent Name
                </Label>
                <Input
                  id="agentName"
                  name="agentName"
                  placeholder="e.g., Acme SDR"
                  value={formData.agentName}
                  onChange={handleInputChange}
                  className="h-11"
                />
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
                  Organization
                </Label>
                <Input
                  id="organization"
                  name="organization"
                  placeholder="e.g., Acme Corporation"
                  value={formData.organization}
                  onChange={handleInputChange}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department" className="text-sm font-medium">
                  Department
                </Label>
                <Input
                  id="department"
                  name="department"
                  placeholder="e.g., Sales"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="h-11"
                />
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
            <Label htmlFor="activitiesDescription" className="text-sm font-medium">
              Activities Description
            </Label>
            <Textarea
              id="activitiesDescription"
              name="activitiesDescription"
              placeholder="Describe the agent's primary activities and responsibilities in detail..."
              value={formData.activitiesDescription}
              onChange={handleInputChange}
              className="min-h-[120px] resize-y w-full"
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-white"
            >
              Save Configuration
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AgentProfileModal
