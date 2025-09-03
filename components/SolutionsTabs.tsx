import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Settings, Target } from 'lucide-react'
import { Button } from './ui/button'

const SolutionsTabs = () => {

  const solutionsCardData = [
    {
      title: "Scan & Identify",
      description: "AI searches 50,000+ databases to pinpoint your highest value leads in seconds"
    },
    {
      title: "Analyse Intent",
      description: "Tracks dozens of intent signals to find prospects ready to buy now."
    },
    {
      title: "Personalise Outreach",
      description: "Generates tailored emails proven to boost reply by up to 300%."
    },
    {
      title: "Autonate Follow-Ups",
      description: "Runs multi-step cadences that keep you top of mind - without lifting a finger."
    },
    {
      title: "Ensure Delivery",
      description: "Optimises every send for inbox placement, cutting bounce rates by up to 90%."
    },
  ]

  const customAgentData = [
    {
      title: "Define Requirements",
      description: "Specify your excat needs, workflows, and desired outcomes through our intuitive interface"
    },
    {
      title: "Choose AI Capabilities",
      description: "Select from 50+ pre-built AI models including NLP, computer vision, data analysis, and automation."
    },
    {
      title: "Customise & Train",
      description: "Fine-tune the AI with your data, brand voice, and specific business rules for optimal performance."
    },
    {
      title: "Test & Validate",
      description: "Run comprehensive testing in safe environments to ensure accuracy and reliability before deployment."
    },
    {
      title: "Deploy & Scale",
      description: "Launch your custom AI agent in production and scale automatically as your busniess grows."
    },
  ]
  return (
    <Tabs defaultValue="sdr-agent" className="max-w-5xl mx-auto custom-tabs mt-10">
      <TabsList className='flex space-x-4 items-center justify-center w-[400px] h-fit mx-auto'>
        <TabsTrigger value="sdr-agent" className="w-[100px] h-full">
          <div className="p-4 rounded-xl  flex item-center justify-center gap-x-1 w-[fit] mx-auto">
            <Target className=" h-4 w-4" />
            <div className="flex items-center justify-center">
              <p className="text-xs ">SDR Agent</p>
            </div>
          </div>
        </TabsTrigger>
        <TabsTrigger value="custom-agent" className="w-[100px] px-6">
          <div className="p-4 rounded-xl  flex item-center justify-center gap-x-1 w-[100px] mx-auto">
            <Settings className=" h-4 w-4" />
            <div className="flex items-center justify-center">
              <p className="text-xs ">Custom Agent</p>
            </div>
          </div>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="sdr-agent">
        <div className="border-2 border-t-amber-500 rounded-xl bg-white max-w-5xl p-4 md:p-10">
          <div className="py-2 px-3 rounded-xl bg-amber-500 w-fit mx-auto">
            <p className="text-xs text-white uppercase font-medium">Sales</p>
          </div>

          <div className='max-w-[62%] mx-auto text-center space-y-5 mt-10'>
            <p className="text-muted-foreground">Automate lead generation, outreach, and pipeline management with intelligent sales workflows.</p>
            <h3 className='font-semibold text-xl mt-2'>How Our AI Agent Work</h3>
            <p className="text-muted-foreground text-sm">Stop wasting hours on manual prospecting. Our AI SDR works 24/7 to find, engage, and convert your ideal customers - faster, smarter, and at a fraction of the cost.</p>
          </div>

          <div className='mt-10 flex flex-wrap gap-4'>
            {solutionsCardData.map((card, index) => (
              <div key={index} className='bg-amber-500/10 p-4 md:px-5 md:py-6 rounded-xl w-full md:max-w-[300px] flex gap-3'>
                <div className='rounded-full h-8 w-8 bg-amber-500 text-white font-bold flex justify-center items-center shrink-0'>
                  {index + 1}.
                </div>
                <div className='space-y-2'>
                  <h3 className='font-semibold'>{card.title}</h3>
                  <p className="text-muted-foreground text-xs">{card.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className='bg-amber-500/10 rounded-xl space-y-4 py-4 md:py-10 text-center mt-10'>
            <h3 className="text-xl font-semibold">The Result</h3>
            <p className='text-muted-foreground text-sm'>More leads. More replies. More sales - without hiring headaches.</p>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="custom-agent">
        <div className="border-2 border-t-amber-500 rounded-xl bg-white max-w-5xl p-4 md:p-10">
          <div className="py-2 px-3 rounded-xl bg-purple-500 w-fit mx-auto">
            <p className="text-xs text-white uppercase font-medium">CUSTOM</p>
          </div>

          <div className='max-w-[62%] mx-auto text-center space-y-5 mt-10'>
            <p className="text-muted-foreground">Build tailored Ai agents for your specific business needs with our no-code platform and advanced customisation options.</p>
            <h3 className='font-semibold text-xl mt-2'>How Our Custom AI Agent Work</h3>
            <p className="text-muted-foreground text-sm">Transform any business process with custom AI agent. Our platform lets you build, train, and deploy specialised AI solutions tailored to your unique workflows and requirements.</p>
          </div>

          <div className='mt-10 flex flex-wrap gap-4'>
            {customAgentData.map((card, index) => (
              <div key={index} className='bg-amber-500/10 p-4 md:px-5 md:py-6 rounded-xl w-full md:max-w-[300px] flex gap-3'>
                <div className='rounded-full h-8 w-8 bg-amber-500 text-white font-bold flex justify-center items-center shrink-0'>
                  {index + 1}.
                </div>
                <div className='space-y-2'>
                  <h3 className='font-semibold'>{card.title}</h3>
                  <p className="text-muted-foreground text-xs">{card.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className='bg-amber-500/10 rounded-xl space-y-4 py-4 md:py-10 text-center mt-10'>
            <h3 className="text-xl font-semibold">The Result</h3>
            <p className='text-muted-foreground text-sm'>Fully customised AI solutions that perfectly fit your business, boosting efficiency by up to 400% while reducing operational costs.</p>
          </div>

          <div className='flex justify-center'>
            <Button className='bg-amber-500 hover:bg-amber-600 transition-colors duration-200 text-white mx-auto mt-10 py-5 px-7'>
              <p>Learn More</p>
              <ArrowRight className='ml-1' />
            </Button>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default SolutionsTabs