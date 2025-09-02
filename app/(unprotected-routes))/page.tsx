"use client"

import { ArrowRight, Bot, Link, Settings, Target, Zap } from "lucide-react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import React, { useState } from 'react';
import CarouselCard from "@/components/CarouselCard";
import IntegrationCard from "@/components/FunctionalityCards";
import FunctionalityCards from "@/components/FunctionalityCards";
import IntegrationCards from "@/components/IntegrationCards";
import SolutionsTabs from "@/components/SolutionsTabs";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 2; // We have 2 slides

  const updateCurrentSlide = (index: number) => {
    if (currentSlide !== index) {
      setCurrentSlide(index);
    }
  };

  const progressBar = (
    <div className="w-full bg-white shadow-lg rounded-full h-1.5 dark:bg-gray-700">
      <div className="bg-black h-1.5 rounded-full " style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}></div>
    </div>
  );

  return (
    <div className="bg-amber-50 ">
      {/* AI Agents section */}
      <section className="bg-amber-600 h-[calc(100vh-72px)] py-4 px-4 md:px-14 lg:px-24" id="ai-agents">
        <p className="text-white text-base text-center">Deploy pre-built agents or deploy custom solutions for every department</p>
        <div className="relative h-[90%] text-left">
          <Carousel
            autoPlay
            infiniteLoop
            showArrows={false}
            showIndicators={false}
            showStatus={false}
            showThumbs={false}
            interval={5000}
            className="mt-8 h-full-carousel"
            onChange={updateCurrentSlide}
            selectedItem={currentSlide}
          >
            <CarouselCard
              name="SDR Agent"
              desc="Automate lead generation, outreach and pipeline"
              desc2="management with intelligent sales workflows."
              footerDesc1="More Leads"
              footerDesc2="Response Rate"
              footerScore1="300%"
              footerScore2="85%"
              discount={"SALES"}
              Icon={Target}
              iconTitle={"Sales Department"}
              iconFooter="Lead Generation & Outreach" />
            <CarouselCard
              name="Custom Agent"
              desc="Build tailored Ai agent for your specific business needs with"
              desc2="our no code platform and advanced customization options"
              discount=""
              footerDesc1="Customizable"
              footerDesc2="Deployment"
              footerScore1="100%"
              footerScore2="24hrs"
              Icon={Settings}
              iconTitle="Custon Dashboard"
              iconFooter="" />
          </Carousel>
          <div className="flex items-center justify-center absolute bottom-5 left-1/2 -translate-x-1/2 bg-gray-400 rounded-lg px-4 py-1.5 gap-x-2">
            <div className="w-24 h-1.5 flex items-center">
              {progressBar}
            </div>
            <ul className="flex items-center justify-center p-0 m-0">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <li
                  style={{ background: currentSlide === i ? '#ff007f' : '#fff', width: 8, height: 8, display: 'inline-block', margin: '0 4px', borderRadius: '50%', cursor: 'pointer' }}
                  onClick={() => setCurrentSlide(i)}
                  key={i}
                  role="button"
                  tabIndex={0}
                  title={`Go to slide ${i + 1}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="h-[calc(100vh-72px)] py-10 md:py-14 px-4 md:px-14 lg:px-24 " id="how-it-works">
        <div className=" w-full md:w-[60%] shadow-xl bg-white mx-auto h-full md:h-[45%] rounded-xl p-4 md:p-10 flex flex-col gap-6">
          <div className="py-1 px-2 rounded-xl bg-amber-50 border border-amber-400 flex item-center justify-center gap-x-1 w-fit mx-auto">
            <Zap className="text-amber-500" />
            <div className="flex items-center justify-center">
              <p className="text-xs text-amber-500">Process</p>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-center ">Everything you need for your <br className="hidden lg:block" /> business on one platform</h2>
          <p className="text-muted-foreground font-light text-center">Simple setup, powerful automation, immediate results</p>
        </div>
        <FunctionalityCards />
      </section>

      {/* Integrations section */}
      <section className="bg-amber-500 h-[calc(100vh-72px)] py-10 md:py-12 px-4 md:px-14 lg:px-24 space-y-4" id="integrations">
        <div className="py-1.5 px-3 rounded-2xl bg-white flex item-center justify-center gap-x-1 w-fit mx-auto">
          <Link className="text-amber-500 h-6 w-6" />
          <div className="flex items-center justify-center">
            <p className="text-xs text-black font-semibold">Integrations</p>
          </div>
        </div>

        <div className="text-center text-white w-fit mx-auto space-y-3">
          <h2 className="capitalize text-4xl font-bold ">Works with your favorite tools</h2>
          <p className="">Connect with 50+ popular business applications</p>
        </div>

        <div className="flex flex-col md:flex-row gap-14 mt-10  mx-auto md:px-20">
          <div className="bg-white rounded-lg w-1/2 p-4 md:p-10 shadow-xl">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Popular Integrations</h3>
              <div className="py-2 px-4 rounded-2xl bg-amber-500 border  flex item-center justify-center gap-x-1 w-fit mx-auto">
                <p className="text-xs text-white font-semibold">Most Used</p>
              </div>
            </div>
            <div className="h-0.5 w-full bg-gray-100 opacity-60 my-4" />

            <IntegrationCards />
          </div>

          <div className="flex flex-col w-full md:w-1/2 gap-y-9">
            <div className="bg-white rounded-lg flex flex-col gap-y-3 w-full p-4 md:p-10 shadow-xl">

              <div className="bg-amber-500 h-12 w-12 rounded-xl flex items-center  justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <p className="font-bold text-lg">Sales</p>
              <p className="text-sm font-light">Lead gen, scoring, routing</p>
            </div>

            <div className="bg-white rounded-lg flex flex-col gap-y-3 w-full p-4 md:p-10 shadow-xl">

              <div className="bg-amber-500 h-12 w-12 rounded-xl flex items-center  justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <p className="font-bold text-lg">Support</p>
              <p className="text-sm font-light">Deflection, summaries, alerts</p>
            </div>
          </div>

        </div>
      </section>

      {/* Solutions section */}
      <section className=" min-h-[calc(100vh-72px)] py-4 md:py-14 px-4 md:px-14 lg:px-24" id="solutions">
        <div className=" w-full md:w-[60%] shadow-xl bg-white mx-auto h-full md:h-[45%] rounded-xl p-4 md:p-10 flex flex-col gap-6">
          <div className="py-1.5 px-3 rounded-xl bg-amber-50 border border-amber-400 flex item-center justify-center gap-x-1 w-fit mx-auto">
            <Target className="text-amber-500 h-4 w-4" />
            <div className="flex items-center justify-center">
              <p className="text-xs text-amber-500">Solutions</p>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-center ">Transform Every Department with<br className="hidden lg:block" />  our AI Agents</h2>
          <p className="text-muted-foreground font-light text-center">AI agents designed for specific business challenges</p>
        </div>

        <div>
          <div>
            
          </div>

          <SolutionsTabs />
        </div>
      </section>
    </div>
  );
}
