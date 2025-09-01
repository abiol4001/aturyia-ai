import { LucideIcon } from 'lucide-react'
import React from 'react'

const CarouselCard = ({name, discount, Icon, iconTitle, iconFooter, desc, desc2, footerDesc1, footerDesc2, footerScore1, footerScore2}: {name: string, discount: string, Icon: LucideIcon, iconTitle: string, iconFooter: string, desc: string, desc2: string, footerDesc1: string, footerDesc2: string, footerScore1: string, footerScore2: string}) => {
  return (
    <div className="max-w-5xl mx-auto mt-16 p-4 md:p-20 rounded-lg shadow-2xl bg-white flex flex-col md:flex-row md:justify-between md:items-center h-[60%] text-left">
      <div className=" bg-white rounded-lg flex flex-col gap-y-8">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-red-500 p-2.5">
            <Icon className="h-10 w-10 text-white" />
          </div>
          {discount && <div className="py-1 px-2 rounded-md bg-amber-500 animate-pulse">
            <p className="text-xs text-white">{discount}</p>
          </div>}
        </div>
        <div className="flex flex-col gap-y-3">
          <h2 className="text-3xl font-bold">{name}</h2>
          <p className="text-sm font-semibold">
            {desc}
            <span className="block">{desc2}</span>
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-y-2">
            <h3 className="text-2xl font-bold text-orange-600">{footerScore1}</h3>
            <p className="text-xs font-semibold">{footerDesc1}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <h3 className="text-2xl font-bold text-orange-600">{footerScore2}</h3>
            <p className="text-xs font-semibold">{footerDesc2}</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-10 rounded-lg shadow-lg flex flex-col items-center gap-y-4.5">
        <Icon className="h-12 w-12 text-red-500" />
        <p className="font-bold text-lg">{iconTitle}</p>
        {iconFooter && <p className="text-xs font-semibold">{iconFooter}</p>}
      </div>
    </div>
  )
}

export default CarouselCard