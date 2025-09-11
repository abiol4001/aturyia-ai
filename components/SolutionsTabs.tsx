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
      description: "Specify your exact needs, workflows, and desired outcomes through our intuitive interface"
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
      description: "Launch your custom AI agent in production and scale automatically as your business grows."
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

          <div className='mt-10 flex flex-wrap gap-6 justify-center'>
            {solutionsCardData.map((card, index) => (
              <div 
                key={index} 
                className='group bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border border-amber-200 hover:border-amber-300 p-6 rounded-2xl w-full md:max-w-[280px] flex flex-col gap-4 transition-all duration-500 hover:shadow-xl hover:shadow-amber-500/20 hover:-translate-y-2 cursor-pointer relative overflow-hidden'
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/5 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-700"></div>
                
                {/* Step number with enhanced design */}
                <div className='relative'>
                  <div className='rounded-full h-12 w-12 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold flex justify-center items-center shrink-0 shadow-lg group-hover:scale-110 transition-all duration-300 group-hover:shadow-xl'>
                    <span className="text-sm">{index + 1}</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                </div>
                
                {/* Content */}
                <div className='space-y-3 flex-1'>
                  <h3 className='font-bold text-lg text-gray-800 group-hover:text-amber-700 transition-colors duration-300'>
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {card.description}
                  </p>
                </div>
                
                {/* Progress indicator */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 h-1 bg-amber-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-1000 group-hover:w-full"
                      style={{ width: `${((index + 1) / solutionsCardData.length) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-amber-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Step {index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className='bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl space-y-6 py-8 md:py-12 text-center mt-12 relative overflow-hidden'>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500 text-white text-sm font-medium mb-4">
                <Target className="h-4 w-4" />
                Results
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">The Result</h3>
              <p className='text-gray-600 text-lg font-medium'>More leads. More replies. More sales - without hiring headaches.</p>
              <div className="flex justify-center gap-8 mt-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-amber-600">300%</div>
                  <div className="text-xs text-gray-500">More Leads</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-600">85%</div>
                  <div className="text-xs text-gray-500">Response Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-600">24/7</div>
                  <div className="text-xs text-gray-500">Automation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="custom-agent">
        <div className="border-2 border-t-amber-500 rounded-xl bg-white max-w-5xl p-4 md:p-10">
          <div className="py-2 px-3 rounded-xl bg-purple-500 w-fit mx-auto">
            <p className="text-xs text-white uppercase font-medium">CUSTOM</p>
          </div>

          <div className='max-w-[62%] mx-auto text-center space-y-5 mt-10'>
            <p className="text-muted-foreground">Build tailored AI agents for your specific business needs with our no-code platform and advanced customization options.</p>
            <h3 className='font-semibold text-xl mt-2'>How Our Custom AI Agents Work</h3>
            <p className="text-muted-foreground text-sm">Transform any business process with custom AI agents. Our platform lets you build, train, and deploy specialized AI solutions tailored to your unique workflows and requirements.</p>
          </div>

          <div className='mt-10 flex flex-wrap gap-6 justify-center'>
            {customAgentData.map((card, index) => (
              <div 
                key={index} 
                className='group bg-gradient-to-br from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100 border border-purple-200 hover:border-purple-300 p-6 rounded-2xl w-full md:max-w-[280px] flex flex-col gap-4 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-2 cursor-pointer relative overflow-hidden'
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/5 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-700"></div>
                
                {/* Step number with enhanced design */}
                <div className='relative'>
                  <div className='rounded-full h-12 w-12 bg-gradient-to-r from-purple-500 to-violet-500 text-white font-bold flex justify-center items-center shrink-0 shadow-lg group-hover:scale-110 transition-all duration-300 group-hover:shadow-xl'>
                    <span className="text-sm">{index + 1}</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                </div>
                
                {/* Content */}
                <div className='space-y-3 flex-1'>
                  <h3 className='font-bold text-lg text-gray-800 group-hover:text-purple-700 transition-colors duration-300'>
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {card.description}
                  </p>
                </div>
                
                {/* Progress indicator */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 h-1 bg-purple-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full transition-all duration-1000 group-hover:w-full"
                      style={{ width: `${((index + 1) / customAgentData.length) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-purple-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Step {index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className='bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-2xl space-y-6 py-8 md:py-12 text-center mt-12 relative overflow-hidden'>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-violet-500/5"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500 text-white text-sm font-medium mb-4">
                <Settings className="h-4 w-4" />
                Results
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">The Result</h3>
              <p className='text-gray-600 text-lg font-medium'>Fully customized AI solutions that perfectly fit your business, boosting efficiency by up to 400% while reducing operational costs.</p>
              <div className="flex justify-center gap-8 mt-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-600">400%</div>
                  <div className="text-xs text-gray-500">Efficiency Boost</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">100%</div>
                  <div className="text-xs text-gray-500">Customizable</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">24hrs</div>
                  <div className="text-xs text-gray-500">Deployment</div>
                </div>
              </div>
            </div>
          </div>

          <div className='flex justify-center'>
            <Button className='bg-purple-600 hover:bg-amber-600 transition-colors duration-200 text-white mx-auto mt-10 py-5 px-7'>
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