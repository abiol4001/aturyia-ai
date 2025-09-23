"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useSubmitICP, useGetICPCharacteristics } from '@/lib/api/hooks/useApi';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
// Using crypto.randomUUID() for UUID generation

interface FormData {
  // Step 1: Basic Info
  campaignName: string;
  productName: string;
  organization: string;
  website: string;
  overview: string;
  
  // Step 2: Target Audience
  industries: string[];
  departments: string[];
  headCount: string[];
  locations: string[];
  locationReason: string;
  
  // Step 3: Decision Makers
  keyDecisionMakers: string[];
  responsibilities: string[];
  revenue: string[];
  stage: string[];
  substage: string[];
  
  // Step 4: Value Proposition
  painPoints: string[];
  goals: string[];
  valuePropositions: string[];
  proofPoints: string[];
}

// Predefined options for each field
const FIELD_OPTIONS = {
  industries: [
    'Ecommerce', 'Financial Services', 'Healthcare', 'Education', 'Marketplaces', 
    'Travel and Hospitality', 'Professional Services', 'Software as a Service',
    'Manufacturing', 'Retail', 'Technology', 'Real Estate', 'Consulting', 'Media'
  ],
  departments: [
    'Sales', 'Customer Success', 'Product', 'Marketing', 'Engineering', 
    'Operations', 'IT', 'Software Development', 'Finance', 'HR', 'Legal'
  ],
  headCount: [
    '1 to 10 employees', '11 to 50 employees', '51 to 200 employees', 
    '201 to 1000 employees', '1001 to 5000 employees', '5000+ employees'
  ],
  locations: [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 
    'Nordics', 'Australia', 'Singapore', 'Japan', 'India', 'Brazil'
  ],
  keyDecisionMakers: [
    'VP of Sales', 'Head of Customer Success', 'Director of Growth', 'Product Manager',
    'Chief Technology Officer', 'Chief Operating Officer', 'Chief Revenue Officer', 
    'Founder', 'CEO', 'CTO', 'CMO', 'CFO'
  ],
  responsibilities: [
    'Lead customer acquisition and revenue growth', 'Own onboarding and customer activation programs',
    'Manage customer retention and expansion strategies', 'Drive product roadmap and user experience improvements',
    'Oversee integration and technical implementation decisions', 'Own operational efficiency and team productivity gains'
  ],
  revenue: [
    'Less than 1 million USD', '1 million to 10 million USD', '10 million to 50 million USD',
    '50 million to 500 million USD', '500 million to 1 billion USD', '1 billion+ USD'
  ],
  stage: [
    'Startup Stage', 'Seed Stage', 'Growth Stage', 'Expansion Stage', 
    'Maturity Stage', 'Decline or Renewal Stage'
  ],
  substage: [
    'Development Stage', 'Launch Stage', 'Validation Stage', 'Early Traction Stage',
    'Scaling Stage', 'Market Penetration Stage', 'Series B to Series D Funding',
    'Global Expansion Stage', 'Diversification Stage', 'Optimization Stage', 'Innovation Stage', 'Renewal Stage'
  ],
  painPoints: [
    'Slow manual onboarding processes that delay value realization',
    'Low trial to paid conversion rates due to poor activation flows',
    'Lack of unified customer data for personalized outreach',
    'High support load from repetitive tasks and missing automation',
    'Difficulty integrating new tools with existing CRM and analytics stacks',
    'Scaling product operations without proportional headcount increases',
    'Resource Allocation', 'Poor user experience', 'Limited scalability'
  ],
  goals: [
    'Accelerate user onboarding and time to first value',
    'Increase user activation and trial conversion rates',
    'Automate repetitive customer workflows to reduce manual work',
    'Improve customer retention and reduce churn',
    'Provide actionable analytics to inform product and growth decisions',
    'Enable scalable personalization for segmented audiences',
    'Simplify integrations with core customer systems'
  ],
  valuePropositions: [
    'AI powered personalization that increases user engagement and conversions',
    'Configurable onboarding flows that deliver faster time to value',
    'Plug and play integrations to minimize engineering lift',
    'Actionable analytics to turn product usage into growth signals',
    'Workflow automation to free up customer facing teams for high value work',
    'Quick deployment options that enable measurable ROI in weeks',
    'Flexible customization to match unique go to market and product motions'
  ],
  proofPoints: [
    'Reduced onboarding time by 40 percent in pilot with beta customers',
    'Improved trial to paid conversion by 25 percent in early deployments',
    'Delivered automated workflows to replace manual tasks for customer success teams',
    'Provided out of the box integrations with major CRMs such as Salesforce and HubSpot',
    'Early customers reported measurable reduction in support tickets after deployment'
  ]
};

const CreateCampaignForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGeneratingCharacteristics, setIsGeneratingCharacteristics] = useState(false);
  const [campaignId, setCampaignId] = useState<string>('');
  const [aiOptions, setAiOptions] = useState<Record<string, string[]>>({});
  const submitICP = useSubmitICP();
  const getICPCharacteristics = useGetICPCharacteristics();
  const [formData, setFormData] = useState<FormData>({
    campaignName: '',
    productName: '',
    organization: '',
    website: 'https://example.com',
    overview: '',
    industries: ['Ecommerce', 'Financial Services', 'Healthcare', 'Education', 'Marketplaces', 'Travel and Hospitality', 'Professional Services', 'Software as a Service'],
    departments: ['Sales', 'Customer Success', 'Product', 'Marketing', 'Engineering', 'Operations', 'IT', 'Software Development'],
    headCount: ['1 to 10 employees', '11 to 50 employees', '51 to 200 employees', '201 to 1000 employees', '1001 to 5000 employees'],
    locations: ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Nordics', 'Australia', 'Singapore'],
    locationReason: 'Target markets with high SaaS adoption and centralized decision making',
    keyDecisionMakers: ['VP of Sales', 'Head of Customer Success', 'Director of Growth', 'Product Manager', 'Chief Technology Officer', 'Chief Operating Officer', 'Chief Revenue Officer', 'Founder', 'CEO'],
    responsibilities: ['Lead customer acquisition and revenue growth', 'Own onboarding and customer activation programs', 'Manage customer retention and expansion strategies', 'Drive product roadmap and user experience improvements', 'Oversee integration and technical implementation decisions', 'Own operational efficiency and team productivity gains'],
    revenue: ['Less than 1 million USD', '1 million to 10 million USD', '10 million to 50 million USD', '50 million to 500 million USD', '500 million to 1 billion USD'],
    stage: ['Startup Stage', 'Seed Stage', 'Growth Stage', 'Expansion Stage', 'Maturity Stage', 'Decline or Renewal Stage'],
    substage: ['Development Stage', 'Launch Stage', 'Validation Stage', 'Early Traction Stage', 'Scaling Stage', 'Market Penetration Stage', 'Series B to Series D Funding', 'Global Expansion Stage', 'Diversification Stage', 'Optimization Stage', 'Innovation Stage', 'Renewal Stage'],
    painPoints: ['Slow manual onboarding processes that delay value realization', 'Low trial to paid conversion rates due to poor activation flows', 'Lack of unified customer data for personalized outreach', 'High support load from repetitive tasks and missing automation', 'Difficulty integrating new tools with existing CRM and analytics stacks', 'Scaling product operations without proportional headcount increases', 'Resource Allocation'],
    goals: ['Accelerate user onboarding and time to first value', 'Increase user activation and trial conversion rates', 'Automate repetitive customer workflows to reduce manual work', 'Improve customer retention and reduce churn', 'Provide actionable analytics to inform product and growth decisions', 'Enable scalable personalization for segmented audiences', 'Simplify integrations with core customer systems'],
    valuePropositions: ['AI powered personalization that increases user engagement and conversions', 'Configurable onboarding flows that deliver faster time to value', 'Plug and play integrations to minimize engineering lift', 'Actionable analytics to turn product usage into growth signals', 'Workflow automation to free up customer facing teams for high value work', 'Quick deployment options that enable measurable ROI in weeks', 'Flexible customization to match unique go to market and product motions'],
    proofPoints: ['Reduced onboarding time by 40 percent in pilot with beta customers', 'Improved trial to paid conversion by 25 percent in early deployments', 'Delivered automated workflows to replace manual tasks for customer success teams', 'Provided out of the box integrations with major CRMs such as Salesforce and HubSpot', 'Early customers reported measurable reduction in support tickets after deployment']
  });

  const router = useRouter();


  const totalSteps = 4;
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const handleAddItem = (field: keyof FormData, value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value.trim()]
      }));
    }
  };

  const handleRemoveItem = (field: keyof FormData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  };

  const handleSelectChange = (field: keyof FormData, value: string) => {
    if (value && !(formData[field] as string[]).includes(value)) {
      handleAddItem(field, value);
    }
  };

  const renderSelectField = (field: keyof FormData, placeholder: string, options: string[]) => {
    const selectedItems = formData[field] as string[];
    const availableOptions = options.filter(option => !selectedItems.includes(option));
    const allSelected = availableOptions.length === 0;
    
    return (
      <div>
        <div className="mb-2">
          {selectedItems.map((item: string, index: number) => (
            <span key={`${field}-${index}-${item}`} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-gray-800 mr-2 mb-2">
              {item}
              <button
                onClick={() => handleRemoveItem(field, index)}
                className="ml-2 hover:bg-orange-200 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <Select onValueChange={(value) => handleSelectChange(field, value)} disabled={allSelected}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={
              allSelected 
                ? "All options selected" 
                : placeholder
            } />
          </SelectTrigger>
          <SelectContent>
            {availableOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {allSelected && (
          <p className="text-xs text-gray-500 mt-1">
            All available options have been selected.
          </p>
        )}
      </div>
    );
  };

  const nextStep = async () => {
    if (currentStep === 1) {
      // After Step 1, get AI recommendations
      setIsGeneratingCharacteristics(true);
      
      // Show loading toast
      toast.loading('Generating AI Recommendations...', {
        description: 'Please wait while we analyze your product information.',
        duration: 30000, // Will be dismissed when success/error toast shows
      });
      
      try {
        // Generate a unique campaign ID using UUID
        const generatedCampaignId = crypto.randomUUID();
        setCampaignId(generatedCampaignId); // Store for later use in final submission
        
        const productInfo = {
          user_id: '', // Will be set by the service
          campaign_id: generatedCampaignId,
          campaign_name: formData.campaignName,
          product_chars_basics: {
            product_name: formData.productName,
            organization: formData.organization,
            website: formData.website,
            overview: formData.overview
          }
        };
        
        const response = await getICPCharacteristics.mutateAsync(productInfo);
        console.log('🔍 AI Recommendations:', response);
        
        // Show success toast
        toast.success('AI recommendations generated successfully!', {
          description: 'Your campaign form has been pre-filled with intelligent suggestions.',
          duration: 3000,
        });
        
        // Auto-fill Steps 2, 3, 4 with AI recommendations
        if (response.data) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const aiData = response.data as any;
          const details = aiData.details;
          
          if (details) {
            // Store AI-generated options for select fields
            setAiOptions({
              industries: details.lead_characteristics?.industry || [],
              departments: details.lead_characteristics?.department || [],
              headCount: details.lead_characteristics?.head_count || [],
              locations: details.lead_characteristics?.location?.regions || [],
              keyDecisionMakers: details.lead_characteristics?.key_decision_makers?.titles || [],
              responsibilities: details.lead_characteristics?.key_decision_makers?.responsibilities || [],
              revenue: details.lead_characteristics?.revenue || [],
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              stage: details.lead_characteristics?.stage?.map((s: any) => s.main) || [],
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              substage: details.lead_characteristics?.stage?.flatMap((s: any) => s.substage) || [],
              goals: details.additional_product_details?.goals || [],
              painPoints: details.additional_product_details?.pain_points || [],
              valuePropositions: details.additional_product_details?.value_proposition || [],
              proofPoints: details.additional_product_details?.proof_points || [],
            });

            setFormData(prev => ({
              ...prev,
              // Step 2: Industry, department, head count, location
              industries: details.lead_characteristics?.industry || prev.industries,
              departments: details.lead_characteristics?.department || prev.departments,
              headCount: details.lead_characteristics?.head_count || prev.headCount,
              locations: details.lead_characteristics?.location?.regions || prev.locations,
              locationReason: details.lead_characteristics?.location?.reason || prev.locationReason,
              
              // Step 3: Decision makers, revenue, company stage
              keyDecisionMakers: details.lead_characteristics?.key_decision_makers?.titles || prev.keyDecisionMakers,
              responsibilities: details.lead_characteristics?.key_decision_makers?.responsibilities || prev.responsibilities,
              revenue: details.lead_characteristics?.revenue || prev.revenue,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              stage: details.lead_characteristics?.stage?.map((s: any) => s.main) || prev.stage,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              substage: details.lead_characteristics?.stage?.flatMap((s: any) => s.substage) || prev.substage,
              
              // Step 4: Goals, pain points, value propositions
              goals: details.additional_product_details?.goals || prev.goals,
              painPoints: details.additional_product_details?.pain_points || prev.painPoints,
              valuePropositions: details.additional_product_details?.value_proposition || prev.valuePropositions,
              proofPoints: details.additional_product_details?.proof_points || prev.proofPoints,
            }));
          }
        }
      } catch (error) {
        console.error('Error getting AI recommendations:', error);
        
        // Show user-friendly error toast
        if (error instanceof Error && error.message.includes('timeout')) {
          toast.error('AI Processing Timeout', {
            description: 'AI processing is taking longer than expected. Please try again or contact support if the issue persists.',
            duration: 6000,
          });
        } else {
          toast.error('Failed to Generate AI Recommendations', {
            description: 'Unable to generate AI suggestions. You can continue with manual input or try again.',
            duration: 5000,
          });
        }
      } finally {
        setIsGeneratingCharacteristics(false);
      }
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Use the campaign ID generated during Step 1
      if (!campaignId) {
        console.error('Campaign ID not found. Please complete Step 1 first.');
        toast.error('Campaign ID Missing', {
          description: 'Please complete Step 1 first to generate a campaign ID.',
          duration: 4000,
        });
        return;
      }
      
      
      // Format data according to API specification
      const icpData = {
        user_id: '', // Will be set by the service
        campaign_id: campaignId, // Generated UUID from Step 1
        campaign_name: formData.campaignName,
        lead_characteristics: {
          industry: formData.industries,
          head_count: formData.headCount,
          key_decision_makers: {
            roles: formData.keyDecisionMakers,
            responsibilities: formData.responsibilities
          },
          location: {
            countries: formData.locations,
            reason: formData.locationReason
          },
          department: formData.departments,
          revenue: formData.revenue,
          stage: formData.stage.map(stage => ({ name: stage })),
          substage: formData.substage.map(substage => ({ name: substage }))
        },
        additional_product_details: {
          goals: formData.goals,
          pain_points: formData.painPoints,
          value_proposition: formData.valuePropositions,
          proof_points: formData.proofPoints
        },
        product_details: {
          name: formData.productName,
          organization: formData.organization,
          website: formData.website,
          overview: formData.overview
        }
      };
      
      await submitICP.mutateAsync({ campaignId, icpData });
      console.log('ICP submitted successfully');
      
      // Show success toast
      toast.success('Campaign Created Successfully!', {
        description: `"${formData.campaignName}" has been created and is ready to launch.`,
        duration: 5000,
      });
      toast.dismiss();
      router.push('/library/sdr/campaigns');
    } catch (error) {
      console.error('Error submitting ICP:', error);
      
      // Show error toast
      toast.error('Failed to Create Campaign', {
        description: 'There was an error creating your campaign. Please try again or contact support.',
        duration: 5000,
      });
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-2">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex flex-col items-center">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
            step < currentStep 
              ? 'bg-orange-500 text-white' 
              : step === currentStep 
              ? 'bg-orange-500 text-white' 
              : 'bg-gray-200 text-gray-500'
          }`}>
            {step < currentStep ? <Check className="w-3 h-3" /> : step}
          </div>
          <span className="text-xs mt-1 text-gray-600">
            {step === 1 && 'Basic Info'}
            {step === 2 && 'Target Audience'}
            {step === 3 && 'Decision Makers'}
            {step === 4 && 'Value Proposition'}
          </span>
        </div>
      ))}
    </div>
  );

  const renderProgressBar = () => (
    <div className="w-full bg-gray-200 rounded-full h-1 mb-2">
      <div 
        className="bg-orange-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );

  // Removed renderTag function - now inline in renderSelectField

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product and Campaign Details</h2>
        <div className="w-16 h-1 bg-orange-500 rounded"></div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name</label>
          <Input
            value={formData.campaignName}
            onChange={(e) => setFormData(prev => ({ ...prev, campaignName: e.target.value }))}
            placeholder="Enter campaign name"
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
          <Input
            value={formData.productName}
            onChange={(e) => setFormData(prev => ({ ...prev, productName: e.target.value }))}
            placeholder="Enter product name"
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
          <Input
            value={formData.organization}
            onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
            placeholder="Enter organization name"
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
          <Input
            value={formData.website}
            onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
            placeholder="https://example.com"
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Overview</label>
          <Textarea
            value={formData.overview}
            onChange={(e) => setFormData(prev => ({ ...prev, overview: e.target.value }))}
            placeholder="Enter product overview"
            className="w-full h-24 resize-none"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Lead Characteristics</h2>
        <div className="w-16 h-1 bg-orange-500 rounded"></div>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
          {renderSelectField('industries', 'Select industry', aiOptions.industries.length > 0 ? aiOptions.industries : FIELD_OPTIONS.industries)}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
          {renderSelectField('departments', 'Select department', aiOptions.departments.length > 0 ? aiOptions.departments : FIELD_OPTIONS.departments)}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Head Count</label>
          {renderSelectField('headCount', 'Select head count', aiOptions.headCount.length > 0 ? aiOptions.headCount : FIELD_OPTIONS.headCount)}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          {renderSelectField('locations', 'Select location', aiOptions.locations.length > 0 ? aiOptions.locations : FIELD_OPTIONS.locations)}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Why this location?</label>
          <Textarea
            value={formData.locationReason}
            onChange={(e) => setFormData(prev => ({ ...prev, locationReason: e.target.value }))}
            placeholder="Target markets with high SaaS adoption and centralized decision making"
            className="w-full h-20 resize-none"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Lead Characteristics</h2>
        <div className="w-16 h-1 bg-orange-500 rounded"></div>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Key Decision Makers</label>
          {renderSelectField('keyDecisionMakers', 'Select key decision makers', aiOptions.keyDecisionMakers.length > 0 ? aiOptions.keyDecisionMakers : FIELD_OPTIONS.keyDecisionMakers)}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Key Decision Makers Responsibilities</label>
          {renderSelectField('responsibilities', 'Select responsibilities', aiOptions.responsibilities.length > 0 ? aiOptions.responsibilities : FIELD_OPTIONS.responsibilities)}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Revenue</label>
          {renderSelectField('revenue', 'Select revenue range', aiOptions.revenue.length > 0 ? aiOptions.revenue : FIELD_OPTIONS.revenue)}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Stage</label>
          {renderSelectField('stage', 'Select stage', aiOptions.stage.length > 0 ? aiOptions.stage : FIELD_OPTIONS.stage)}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Substage</label>
          {renderSelectField('substage', 'Select substage', aiOptions.substage.length > 0 ? aiOptions.substage : FIELD_OPTIONS.substage)}
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Additional Product Details</h2>
        <div className="w-16 h-1 bg-orange-500 rounded"></div>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pain Points</label>
          {renderSelectField('painPoints', 'Type or select pain point and press Enter', aiOptions.painPoints.length > 0 ? aiOptions.painPoints : FIELD_OPTIONS.painPoints)}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Goals</label>
          {renderSelectField('goals', 'Type or select goal and press Enter', aiOptions.goals.length > 0 ? aiOptions.goals : FIELD_OPTIONS.goals)}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Value Propositions</label>
          {renderSelectField('valuePropositions', 'Type or select value proposition and press Enter', aiOptions.valuePropositions.length > 0 ? aiOptions.valuePropositions : FIELD_OPTIONS.valuePropositions)}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Proof Points</label>
          {renderSelectField('proofPoints', 'Type or select proof point and press Enter', aiOptions.proofPoints.length > 0 ? aiOptions.proofPoints : FIELD_OPTIONS.proofPoints)}
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return renderStep1();
    }
  };

  return (
    <div className="h-full bg-gray-50">
      <div className="max-w-5xl mx-auto h-full">
        <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
          {/* Header */}
          <div className="text-center py-4 px-8 flex-shrink-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Kick off Your First Campaign</h1>
            <div className="flex justify-between text-sm items-center mb-2">
              <span className="text-gray-600">Step {currentStep} of {totalSteps}</span>
              <span className="text-gray-600">{Math.round(progress)}% Complete</span>
            </div>
            {renderProgressBar()}
            {renderStepIndicator()}
          </div>

          {/* Form Content - Scrollable */}
          <div className="flex-1 overflow-y-auto px-8 pb-4">
            {renderCurrentStep()}
          </div>

          {/* Navigation - Fixed at bottom */}
          <div className="flex justify-between flex-shrink-0 px-8 py-3 border-t border-gray-200 bg-white">
            <Button
              onClick={prevStep}
              disabled={currentStep === 1}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>

            {currentStep < totalSteps ? (
              <Button
                onClick={nextStep}
                disabled={isGeneratingCharacteristics}
                className="bg-orange-500 hover:bg-orange-600 text-white flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGeneratingCharacteristics ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Generating AI Recommendations...</span>
                  </>
                ) : (
                  <>
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-orange-500 hover:bg-orange-600 text-white flex items-center space-x-2"
              >
                <span>Submit</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaignForm;
