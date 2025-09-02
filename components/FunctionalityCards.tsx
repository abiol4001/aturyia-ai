import { ArrowRight } from 'lucide-react'
import React from 'react'

const FunctionalityCards = () => {
  const appFunctions = [
    {
      title:"Connect Data & Tools",
      description:"Hook up CRMs, docs, emails and APIs securely",
    },
    {
      title:"Configure Agents",
      description:"Pick a template or compose an agent with no code",
    },
    {
      title:"Deploy & Iterate",
      description:"Ship to production in hours with analytics built-in",
    },
  ]
  return (
    <div className="flex flex-col md:flex-row mt-10 md:mt-16 gap-x-14 w-fit mx-auto relative">
      <hr className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-full h-0.5 " />
      {appFunctions.map((func, index) => (
        <div key={index} className="flex flex-col gap-y-4 items-center z-40">
          <div className="relative w-full flex justify-center items-center">
            <div className="bg-orange-500 h-12 w-12 rounded-full flex items-center justify-center text-white font-extrabold">
              {index + 1}
            </div>
            {index+1 !== appFunctions.length  && <div className="absolute -right-4 flex items-center gap-x-2">
              <div className=" w-10 h-0.5 rounded-2xl bg-orange-500" />
              <ArrowRight className=" text-orange-500 h-4 w-4 " strokeWidth={3} />
            </div>}
          </div>

          <div className="p-6 bg-white shadow-lg rounded-lg max-w-[250px] text-center space-y-3">
            <h3 className="text-md font-bold">{func.title}</h3>
            <p className="text-muted-foreground font-light text-center text-xs leading-7">{func.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FunctionalityCards