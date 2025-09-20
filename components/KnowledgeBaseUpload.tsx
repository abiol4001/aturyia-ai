"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, X, Loader2, AlertCircle, FileSearch } from 'lucide-react'

interface KnowledgeBaseUploadProps {
  onUpload: (files: File[]) => Promise<void>
  onSkip: () => void
  onBack?: () => void
  isUploading?: boolean
  error?: string | null
}

const KnowledgeBaseUpload: React.FC<KnowledgeBaseUploadProps> = ({ 
  onUpload, 
  onSkip, 
  onBack,
  isUploading = false,
  error = null
}) => {
  const [knowledgeFiles, setKnowledgeFiles] = useState<File[]>([])
  const [knowledgeDragActive, setKnowledgeDragActive] = useState(false)
  const [knowledgeError, setKnowledgeError] = useState<string | null>(null)

  const handleKnowledgeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      const validFiles = files.filter(isValidKnowledgeFile)
      setKnowledgeFiles(prev => [...prev, ...validFiles])
    }
  }

  const handleKnowledgeDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setKnowledgeDragActive(false)
    
    const files = Array.from(e.dataTransfer.files)
    const validFiles = files.filter(isValidKnowledgeFile)
    setKnowledgeFiles(prev => [...prev, ...validFiles])
  }

  const handleKnowledgeDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setKnowledgeDragActive(true)
  }

  const handleKnowledgeDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setKnowledgeDragActive(false)
  }

  const isValidKnowledgeFile = (file: File) => {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'application/rtf'
    ]
    const maxSize = 10 * 1024 * 1024 // 10MB
    return validTypes.includes(file.type) && file.size <= maxSize
  }

  const removeKnowledgeFile = (index: number) => {
    setKnowledgeFiles(prev => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleSubmit = async () => {
    if (knowledgeFiles.length === 0) {
      setKnowledgeError('Please upload at least one knowledge base document')
      return
    }

    setKnowledgeError(null)

    try {
      await onUpload(knowledgeFiles)
    } catch (error) {
      console.error('Error uploading knowledge base:', error)
      setKnowledgeError('Failed to upload knowledge base documents. Please try again.')
    }
  }

  const handleSkip = () => {
    setKnowledgeFiles([])
    setKnowledgeError(null)
    onSkip()
  }

  const handleBack = () => {
    setKnowledgeFiles([])
    setKnowledgeError(null)
    onBack?.()
  }

  return (
    <div className="space-y-6">
      {/* Knowledge Base Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          knowledgeDragActive 
            ? 'border-amber-500 bg-amber-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleKnowledgeDrop}
        onDragOver={handleKnowledgeDragOver}
        onDragLeave={handleKnowledgeDragLeave}
      >
        <div className="space-y-4">
          <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto">
            <Upload className="h-8 w-8 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 mb-1">
              Drop knowledge base documents here or click to browse
            </p>
            <p className="text-xs text-gray-500">
              PDF, DOC, DOCX, TXT, RTF files up to 10MB each
            </p>
          </div>
          <input
            type="file"
            id="knowledge-upload"
            className="hidden"
            accept=".pdf,.doc,.docx,.txt,.rtf"
            multiple
            onChange={handleKnowledgeFileUpload}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('knowledge-upload')?.click()}
            className="mt-2"
          >
            Choose Files
          </Button>
        </div>
      </div>

      {/* Uploaded Files List */}
      {knowledgeFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900">Uploaded Files:</h4>
          <div className="space-y-2">
            {knowledgeFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-amber-100 rounded flex items-center justify-center">
                    <FileSearch className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeKnowledgeFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error Display */}
      {(knowledgeError || error) && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-700">{knowledgeError || error}</p>
          </div>
        </div>
      )}

      {/* Knowledge Base Actions */}
      <div className="flex justify-between space-x-3 pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={handleSkip}
          disabled={isUploading}
        >
          Skip for now
        </Button>
        <div className="flex space-x-3">
          <Button
            type="button"
            className="bg-amber-500 hover:bg-amber-600 text-white"
            onClick={handleSubmit}
            disabled={isUploading || knowledgeFiles.length === 0}
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              'Upload & Continue'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default KnowledgeBaseUpload
