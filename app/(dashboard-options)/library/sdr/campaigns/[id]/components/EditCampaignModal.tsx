'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { TagSelector } from './TagSelector'

interface EditCampaignModalProps {
  isOpen: boolean
  onClose: () => void
  campaignId: string
  campaignName: string
  initialData?: {
    productName?: string
    organization?: string
    website?: string
    overview?: string
    industries?: string[]
    companySizes?: string[]
    revenues?: string[]
    locations?: string[]
    locationReasons?: string[]
    growthStages?: string[]
    decisionMakerTitles?: string[]
    decisionMakerResponsibilities?: string[]
    painPoints?: string[]
    goals?: string[]
    valuePropositions?: string[]
    proofPoints?: string[]
  }
}

const EditCampaignModal = ({ 
  isOpen, 
  onClose, 
  campaignName,
  initialData = {}
}: EditCampaignModalProps) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    productName: initialData?.productName || '',
    organization: initialData?.organization || '',
    website: initialData?.website || '',
    overview: initialData?.overview || '',
    industries: initialData?.industries || [],
    companySizes: initialData?.companySizes || [],
    revenues: initialData?.revenues || [],
    locations: initialData?.locations || [],
    locationReasons: initialData?.locationReasons || [],
    growthStages: initialData?.growthStages || [],
    decisionMakerTitles: initialData?.decisionMakerTitles || [],
    decisionMakerResponsibilities: initialData?.decisionMakerResponsibilities || [],
    painPoints: initialData?.painPoints || [],
    goals: initialData?.goals || [],
    valuePropositions: initialData?.valuePropositions || [],
    proofPoints: initialData?.proofPoints || [],
  })

  const [inputValues, setInputValues] = useState({
    industry: '',
    companySize: '',
    revenue: '',
    location: '',
    locationReason: '',
    growthStage: '',
    decisionMakerTitle: '',
    decisionMakerResponsibility: '',
    painPoint: '',
    goal: '',
    valueProposition: '',
    proofPoint: '',
  })

  const steps = [
    { id: 1, title: 'Product Info' },
    { id: 2, title: 'Lead Characteristics' },
    { id: 3, title: 'Additional Details' }
  ]

  // Calculate progress percentage
  const progress = (currentStep / steps.length) * 100

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-2">
      {steps.map((step) => (
        <div key={step.id} className="flex flex-col items-center">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
            step.id < currentStep 
              ? 'bg-orange-500 text-white' 
              : step.id === currentStep 
              ? 'bg-orange-500 text-white' 
              : 'bg-gray-200 text-gray-500'
          }`}>
            {step.id < currentStep ? <Check className="w-3 h-3" /> : step.id}
          </div>
          <span className="text-xs mt-1 text-gray-600">
            {step.title}
          </span>
        </div>
      ))}
    </div>
  )

  const renderProgressBar = () => (
    <div className="w-full bg-gray-200 rounded-full h-1">
      <div 
        className="bg-orange-500 h-1 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  )

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleInputValueChange = (field: string, value: string) => {
    setInputValues(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addTag = (category: keyof typeof formData, value: string) => {
    if (value.trim() && !formData[category].includes(value.trim())) {
      setFormData(prev => ({
        ...prev,
        [category]: [...prev[category], value.trim()]
      }))
      setInputValues(prev => ({
        ...prev,
        [getInputFieldName(category)]: ''
      }))
    }
  }

  const removeTag = (category: keyof typeof formData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [category]: (prev[category] as string[]).filter((_, i) => i !== index)
    }))
  }

  const getInputFieldName = (category: keyof typeof formData): keyof typeof inputValues => {
    const mapping: Record<string, keyof typeof inputValues> = {
      'industries': 'industry',
      'companySizes': 'companySize',
      'revenues': 'revenue',
      'locations': 'location',
      'locationReasons': 'locationReason',
      'growthStages': 'growthStage',
      'decisionMakerTitles': 'decisionMakerTitle',
      'decisionMakerResponsibilities': 'decisionMakerResponsibility',
      'painPoints': 'painPoint',
      'goals': 'goal',
      'valuePropositions': 'valueProposition',
      'proofPoints': 'proofPoint',
    }
    return mapping[category] || 'industry'
  }

  const handleKeyPress = (e: React.KeyboardEvent, category: keyof typeof formData) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const inputField = getInputFieldName(category)
      addTag(category, inputValues[inputField])
    }
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving campaign data:', formData)
    onClose()
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900">Product Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Label htmlFor="productName" className="w-32 text-sm font-medium text-gray-700">
                  PRODUCT NAME
                </Label>
                <Input
                  id="productName"
                  value={formData.productName}
                  onChange={(e) => handleInputChange('productName', e.target.value)}
                  className="flex-1"
                  placeholder="Enter product name"
                />
              </div>

              <div className="flex items-center space-x-4">
                <Label htmlFor="organization" className="w-32 text-sm font-medium text-gray-700">
                  ORGANIZATION
                </Label>
                <Input
                  id="organization"
                  value={formData.organization}
                  onChange={(e) => handleInputChange('organization', e.target.value)}
                  className="flex-1"
                  placeholder="Enter organization name"
                />
              </div>

              <div className="flex items-center space-x-4">
                <Label htmlFor="website" className="w-32 text-sm font-medium text-gray-700">
                  WEBSITE
                </Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="flex-1"
                  placeholder="Enter website URL"
                />
              </div>

              <div className="flex items-start space-x-4">
                <Label htmlFor="overview" className="w-32 text-sm font-medium text-gray-700 mt-2">
                  OVERVIEW
                </Label>
                <Textarea
                  id="overview"
                  value={formData.overview}
                  onChange={(e) => handleInputChange('overview', e.target.value)}
                  className="flex-1 min-h-[100px] resize-y"
                  placeholder="Enter product overview"
                />
              </div>
            </div>
          </div>
        )
      
      case 2:
        return (
          <div className="space-y-6">
            
            <h3 className="text-2xl font-bold text-gray-900">Lead Characteristics</h3>
            
            <div className="grid grid-cols-1 gap-8">
              <TagSelector
                title="INDUSTRY"
                tags={formData.industries}
                inputValue={inputValues.industry}
                placeholder="Add industry"
                onInputChange={(value) => handleInputValueChange('industry', value)}
                onAddTag={() => addTag('industries', inputValues.industry)}
                onRemoveTag={(index) => removeTag('industries', index)}
                onKeyPress={(e) => handleKeyPress(e, 'industries')}
              />

              <TagSelector
                title="COMPANY SIZE"
                tags={formData.companySizes}
                inputValue={inputValues.companySize}
                placeholder="Add size"
                onInputChange={(value) => handleInputValueChange('companySize', value)}
                onAddTag={() => addTag('companySizes', inputValues.companySize)}
                onRemoveTag={(index) => removeTag('companySizes', index)}
                onKeyPress={(e) => handleKeyPress(e, 'companySizes')}
              />

              <TagSelector
                title="REVENUE"
                tags={formData.revenues}
                inputValue={inputValues.revenue}
                placeholder="Add revenue range"
                onInputChange={(value) => handleInputValueChange('revenue', value)}
                onAddTag={() => addTag('revenues', inputValues.revenue)}
                onRemoveTag={(index) => removeTag('revenues', index)}
                onKeyPress={(e) => handleKeyPress(e, 'revenues')}
              />

              <TagSelector
                title="LOCATIONS"
                tags={formData.locations}
                inputValue={inputValues.location}
                placeholder="Add location"
                onInputChange={(value) => handleInputValueChange('location', value)}
                onAddTag={() => addTag('locations', inputValues.location)}
                onRemoveTag={(index) => removeTag('locations', index)}
                onKeyPress={(e) => handleKeyPress(e, 'locations')}
              />

              <TagSelector
                title="LOCATION REASON"
                tags={formData.locationReasons}
                inputValue={inputValues.locationReason}
                placeholder="Add location reason"
                onInputChange={(value) => handleInputValueChange('locationReason', value)}
                onAddTag={() => addTag('locationReasons', inputValues.locationReason)}
                onRemoveTag={(index) => removeTag('locationReasons', index)}
                onKeyPress={(e) => handleKeyPress(e, 'locationReasons')}
              />

              <TagSelector
                title="GROWTH STAGE"
                tags={formData.growthStages}
                inputValue={inputValues.growthStage}
                placeholder="Add growth stage"
                onInputChange={(value) => handleInputValueChange('growthStage', value)}
                onAddTag={() => addTag('growthStages', inputValues.growthStage)}
                onRemoveTag={(index) => removeTag('growthStages', index)}
                onKeyPress={(e) => handleKeyPress(e, 'growthStages')}
              />

              <TagSelector
                title="DECISION MAKER TITLES"
                tags={formData.decisionMakerTitles}
                inputValue={inputValues.decisionMakerTitle}
                placeholder="Add decision maker title"
                onInputChange={(value) => handleInputValueChange('decisionMakerTitle', value)}
                onAddTag={() => addTag('decisionMakerTitles', inputValues.decisionMakerTitle)}
                onRemoveTag={(index) => removeTag('decisionMakerTitles', index)}
                onKeyPress={(e) => handleKeyPress(e, 'decisionMakerTitles')}
              />

              <TagSelector
                title="DECISION MAKER RESPONSIBILITIES"
                tags={formData.decisionMakerResponsibilities}
                inputValue={inputValues.decisionMakerResponsibility}
                placeholder="Add decision maker responsibility"
                onInputChange={(value) => handleInputValueChange('decisionMakerResponsibility', value)}
                onAddTag={() => addTag('decisionMakerResponsibilities', inputValues.decisionMakerResponsibility)}
                onRemoveTag={(index) => removeTag('decisionMakerResponsibilities', index)}
                onKeyPress={(e) => handleKeyPress(e, 'decisionMakerResponsibilities')}
              />
            </div>
          </div>
        )
      
      case 3:
        return (
          <div className="space-y-8">
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <button 
                onClick={handlePrevious}
                className="hover:text-gray-700"
              >
                ← Back to Lead Characteristics
              </button>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900">Additional Details</h3>
            
            <div className="grid grid-cols-1 gap-8">
              <TagSelector
                title="PAIN POINTS"
                tags={formData.painPoints}
                inputValue={inputValues.painPoint}
                placeholder="Add pain point"
                onInputChange={(value) => handleInputValueChange('painPoint', value)}
                onAddTag={() => addTag('painPoints', inputValues.painPoint)}
                onRemoveTag={(index) => removeTag('painPoints', index)}
                onKeyPress={(e) => handleKeyPress(e, 'painPoints')}
              />

              <TagSelector
                title="GOALS"
                tags={formData.goals}
                inputValue={inputValues.goal}
                placeholder="Add goal"
                onInputChange={(value) => handleInputValueChange('goal', value)}
                onAddTag={() => addTag('goals', inputValues.goal)}
                onRemoveTag={(index) => removeTag('goals', index)}
                onKeyPress={(e) => handleKeyPress(e, 'goals')}
              />

              <TagSelector
                title="VALUE PROPOSITION"
                tags={formData.valuePropositions}
                inputValue={inputValues.valueProposition}
                placeholder="Add value proposition"
                onInputChange={(value) => handleInputValueChange('valueProposition', value)}
                onAddTag={() => addTag('valuePropositions', inputValues.valueProposition)}
                onRemoveTag={(index) => removeTag('valuePropositions', index)}
                onKeyPress={(e) => handleKeyPress(e, 'valuePropositions')}
              />

              <TagSelector
                title="PROOF POINTS"
                tags={formData.proofPoints}
                inputValue={inputValues.proofPoint}
                placeholder="Add proof point"
                onInputChange={(value) => handleInputValueChange('proofPoint', value)}
                onAddTag={() => addTag('proofPoints', inputValues.proofPoint)}
                onRemoveTag={(index) => removeTag('proofPoints', index)}
                onKeyPress={(e) => handleKeyPress(e, 'proofPoints')}
              />
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:min-w-3xl lg:min-w-5xl h-[95vh] flex flex-col p-0 overflow-hidden">
        {/* Fixed Header */}
        <DialogHeader className="px-6 py-4 border-b bg-white flex-shrink-0">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Edit Campaign: {campaignName}
          </DialogTitle>
          {renderStepIndicator()}
          {renderProgressBar()}
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="px-6 py-4">
            {renderStepContent()}
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="flex justify-between items-center px-6 py-4 border-t bg-white flex-shrink-0">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            
            {currentStep < 3 ? (
              <Button onClick={handleNext} className="flex items-center">
                View {steps[currentStep].title} <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditCampaignModal
