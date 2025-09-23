import { Github, Linkedin } from 'lucide-react'
import React from 'react'
import { 
  SlackIcon, 
  HubSpotIcon, 
  GmailIcon, 
  NotionIcon, 
  SalesforceIcon, 
  OutlookIcon 
} from './IntegrationIcons'

const IntegrationCards = () => {

  const integrationList = [
    {
      name: "Slack",
      icon: <SlackIcon />
    },
    {
      name: "HubSpot",
      icon: <HubSpotIcon />
    },
    {
      name: "Gmail",
      icon: <GmailIcon />
    },
    {
      name: "GitHub",
      icon: <Github className="text-white h-4 w-4" />
    },
    {
      name: "Notion",
      icon: <NotionIcon />
    },
    {
      name: "Salesforce",
      icon: <SalesforceIcon />
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="text-white h-4 w-4" />
    },
    {
      name: "Outlook",
      icon: <OutlookIcon />
    },
  ]
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center">
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