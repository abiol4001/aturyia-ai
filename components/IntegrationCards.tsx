import { Github, Link, Slack } from 'lucide-react'
import React from 'react'

const IntegrationCards = () => {

  const integrationList = [
    {
      name: "Slack",
      icon: <Slack className="text-white h-4 w-4" />
    },
    {
      name: "HubSpot",
      icon: <Link className="text-white h-4 w-4" />
    },
    {
      name: "Gmail",
      icon: <Link className="text-white h-4 w-4" />
    },
    {
      name: "GitHub",
      icon: <Github className="text-white h-4 w-4" />
    },
    {
      name: "Notion",
      icon: <Link className="text-white h-4 w-4" />
    },
    {
      name: "Salesforce",
      icon: <Link className="text-white h-4 w-4" />
    },
  ]
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {integrationList.map((integration, index) => (
        <div key={index} className="bg-white rounded-xl shadow-xl p-4 md:p-6 flex flex-col gap-5 items-center cursor-pointer transition-transform duration-300 hover:scale-105 shine-effect w-[130px]">
          <div className="bg-amber-500 rounded-xl p-4 w-fit">
            {integration.icon}
          </div>
          <p className='text-sm font-semibold'>{integration.name}</p>
        </div>
      ))}
    </div>
  )
}

export default IntegrationCards