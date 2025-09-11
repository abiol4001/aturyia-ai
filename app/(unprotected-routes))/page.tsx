"use client"

import {  Bot, CheckCircle, Link, Rocket, Settings, Target, Zap } from "lucide-react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import React, { useState } from 'react';
import CarouselCard from "@/components/CarouselCard";
import FunctionalityCards from "@/components/FunctionalityCards";
import IntegrationCards from "@/components/IntegrationCards";
import SolutionsTabs from "@/components/SolutionsTabs";
import { Progress } from "@/components/ui/progress";
import InfiniteFeatureCards from "@/components/HeroSectionScroll";
import { Button } from "@/components/ui/button";

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
    <div className=" ">

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col">
        {/* Main Hero Content */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-center space-y-8 py-4">
              {/* Hero Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
                <Bot className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-700">AI-Powered Workforce</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                  <span className="block text-gray-900">Hire your</span>
                  <span className="block bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                    AI Super Employees
                  </span>
                </h1>
                
                <p className="max-w-3xl mx-auto text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed">
                  Grow your business faster with our AI agents that work 24/7 - 
                  <br className="hidden sm:block" />
                  <span className="text-gray-800 font-medium"> scaling without limits whilst lowering your costs.</span>
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-1">
                <Button className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px]">
                  <Rocket className="mr-2 h-5 w-5" />
                  Get Started Today
                </Button>
                <Button variant="outline" className="h-14 px-8 text-lg font-semibold border-2 border-gray-300 hover:border-gray-400 rounded-full min-w-[200px] transition-all duration-300">
                  Watch Demo
                </Button>
              </div>

              {/* Trust Indicators */}
              {/* <div className="pt-6">
                <p className="text-sm text-gray-500 mb-6">Trusted by 500+ of the fastest-growing companies</p>
                <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                  <div className="h-8 w-24 bg-gray-200 rounded"></div>
                  <div className="h-8 w-28 bg-gray-200 rounded"></div>
                  <div className="h-8 w-20 bg-gray-200 rounded"></div>
                  <div className="h-8 w-32 bg-gray-200 rounded"></div>
                  <div className="h-8 w-24 bg-gray-200 rounded"></div>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Feature Cards Section */}
        <div className="w-full">
          <InfiniteFeatureCards />
        </div>
      </section>
      
      {/* AI Agents section */}
      <section className="bg-amber-600  py-4 px-4 md:px-14 md:pb-24 md:py-14 relative scroll-mt-[72px]" id="ai-agents">
        <div className="py-2 px-3 rounded-2xl bg-white flex item-center justify-center gap-x-1 w-fit mx-auto">
          <Bot className="text-amber-500 h-5 w-5" />
          <div className="flex items-center justify-center">
            <p className="text-xs text-black font-semibold">AI Agents</p>
          </div>
        </div>

        <div className="text-center text-white w-fit mx-auto space-y-3 mt-5">
          <h2 className="capitalize text-4xl font-bold ">Meet Your Specialised AI Workforce</h2>
          <p className="">Deploy pre-built agents or deploy custom solutions for every department</p>
        </div>
        <div className=" text-left">
          <Carousel
            autoPlay
            infiniteLoop
            showArrows={false}
            showIndicators={false}
            showStatus={false}
            showThumbs={false}
            interval={4000}
            transitionTime={1000}
            swipeScrollTolerance={50}
            preventMovementUntilSwipeScrollTolerance={true}
            className="mt-8 h-full-carousel carousel-root"
            onChange={updateCurrentSlide}
            selectedItem={currentSlide}
          >
            <CarouselCard
              name="Custom Agent"
              desc="Build tailored AI agent for your specific business needs with"
              desc2="our no-code platform and advanced customization options"
              discount=""
              footerDesc1="Customizable"
              footerDesc2="Deployment"
              footerScore1="100%"
              footerScore2="24hrs"
              Icon={Settings}
              iconTitle="Custom Dashboard"
              iconFooter="Personalized Solutions" />
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
          </Carousel>
          <div className="flex items-center justify-center absolute bottom-10 left-1/2 -translate-x-1/2 bg-gray-400 rounded-lg px-4 py-1.5 gap-x-2">
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
      <section className=" xl:h-fit py-10 px-4 md:px-14 lg:px-24 scroll-mt-[72px]" id="how-it-works">
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
      <section className="bg-amber-500 xl:h-fit py-10 md:py-12 px-4 md:px-14 lg:px-24 space-y-4 scroll-mt-[72px]" id="integrations">
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

        <div className="flex flex-col items-center md:flex-row md:items-start gap-14 mt-10  mx-auto md:px-20">
          <div className="bg-white rounded-lg w-full  p-4 md:p-11 shadow-xl">
            <div className="flex justify-between items-center">
              <h3 className="text:lg md:text-xl font-bold">Popular Integrations</h3>
              <div className="py-2 px-4 rounded-full bg-amber-500 border  w-fit">
                <p className="text-[10px] md:text-xs text-white font-semibold">Most Used</p>
              </div>
            </div>
            <div className="h-0.5 w-full bg-gray-100 opacity-60 my-4" />

            <IntegrationCards />
          </div>

          {/* <div className="flex md:flex-col  gap-x-5 w-full gap-y-9">
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
          </div> */}

        </div>
      </section>

      {/* Solutions section */}
      <section className=" py-4 md:py-14 px-4 md:px-14 lg:px-24 scroll-mt-[72px]" id="solutions">
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

      {/* Pricing section */}
      <section className="bg-amber-500 py-14 md:py-24 px-4 md:px-14 lg:px-24 space-y-11 scroll-mt-[72px]" id="pricing">

        <div className="w-full flex justify-center ">
          <Button className="h-[52px] bg-white hover:bg-gradient-to-br from-slate-100 to-slate-50 shadow-lg rounded-full w-fit  text-black" >
            <Rocket className="text-amber-500" />
            Ready to Get Started?
          </Button>
        </div>
        <div className="text-center text-white space-y-5">
          <h2 className="text-3xl md:text-5xl font-bold leading-[60px]">Transform Your Business <br className="hidden lg:block" />Today</h2>
          <p className="font-medium text-white leading-[30px]">Join thousands of companies already using AI agents to drive growth and <br className="hidden lg:block" /> innovation</p>
        </div>

        <div className="max-w-3xl mx-auto flex flex-wrap justify-center md:justify-between">
          <div className="rounded-full border-[0.5px] border-white/25 bg-gradient-to-r from-white/15 to-white/5 backdrop-blur-2xl p-3 flex gap-x-2 items-center w-fit shrink-0 shadow-xl">
            <CheckCircle className="text-green-400 h-6 w-6 drop-shadow-md" />
            <p className="font-medium text-white text-sm">No credit card required</p>
          </div>
          <div className="rounded-full border-[0.5px] border-white/25 bg-gradient-to-r from-white/15 to-white/5 backdrop-blur-2xl p-3 flex gap-x-2 items-center w-fit shrink-0 shadow-xl">
            <CheckCircle className="text-green-400 h-6 w-6 drop-shadow-md" />
            <p className="font-medium text-white text-sm">Cancel anytime</p>
          </div>
          <div className="rounded-full border-[0.5px] border-white/25 bg-gradient-to-r from-white/15 to-white/5 backdrop-blur-2xl p-3 flex gap-x-2 items-center w-fit shrink-0 shadow-xl">
            <CheckCircle className="text-green-400 h-6 w-6 drop-shadow-md" />
            <p className="font-medium text-white text-sm">SOC2-ready infrastructure</p>
          </div>
        </div>


      </section>
    </div>
  );
}
