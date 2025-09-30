"use client"

import {  Bot, CheckCircle, Link, Rocket, Settings, Target, Zap } from "lucide-react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import React, { useState, useEffect } from 'react';
import CarouselCard from "@/components/CarouselCard";
import FunctionalityCards from "@/components/FunctionalityCards";
import IntegrationCards from "@/components/IntegrationCards";
import SolutionsTabs from "@/components/SolutionsTabs";
import AIAgentPreview from "@/components/AIAgentPreview";
// import { Progress } from "@/components/ui/progress";
import InfiniteFeatureCards from "@/components/HeroSectionScroll";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const totalSlides = 2; // We have 2 slides

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe all sections
    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

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
      <section className="relative min-h-screen overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-400/20 to-red-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-amber-300/10 to-orange-400/10 rounded-full blur-3xl animate-spin" style={{ animationDuration: '20s' }}></div>
        </div>

        {/* Main Hero Content */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-4 relative z-10">
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-center space-y-8 py-10">

              {/* Main Heading */}
              <div className="space-y-10">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                  <span 
                    className="block text-gray-900 animate-fade-in-up"
                    style={{ animationDelay: '0.4s' }}
                  >
                    Hire your
                  </span>
                  <span 
                    className="block bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent animate-fade-in-up"
                    style={{ animationDelay: '0.6s' }}
                  >
                    AI Super Employees
                  </span>
                </h1>

                <p 
                  className="max-w-3xl mx-auto text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed animate-fade-in-up"
                  style={{ animationDelay: '0.8s' }}
                >
                  Grow your business faster with our AI agents that work 24/7 -
                  <br className="hidden sm:block" />
                  <span className="text-gray-800 font-medium"> scaling without limits whilst lowering your costs.</span>
                </p>
              </div>

              {/* CTA Buttons */}
              <div 
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-1 animate-fade-in-up"
                style={{ animationDelay: '1s' }}
              >
                <Button className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px] hover:scale-105 hover:-translate-y-1">
                  Get Started Today
                </Button>
                <Button variant="outline" className="h-14 px-8 text-lg font-semibold border-2 border-gray-300 hover:border-gray-400 rounded-full min-w-[200px] transition-all duration-300 hover:scale-105 hover:-translate-y-1">
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
        <div className="w-full ">
          <InfiniteFeatureCards />
        </div>
      </section>

      {/* How it works section */}
      <section 
        className="xl:h-fit py-10 px-4 md:px-14 lg:px-24 scroll-mt-[72px] relative overflow-hidden" 
        id="how-it-works" 
        data-animate="how-it-works"
        style={{
          background: 'white',
          position: 'relative'
        }}
      >
        {/* Enhanced Moving Grid Background */}
        <div 
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage: `
              linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 10s linear infinite'
          }}
        ></div>
        
        {/* Enhanced Animated Dots */}
        <div className="absolute inset-0">
          <div 
            className="absolute w-2 h-2 bg-orange-500 rounded-full animate-pulse hover:scale-150 transition-transform duration-300"
            style={{ top: '20%', left: '30%', animationDelay: '0s' }}
          ></div>
          <div 
            className="absolute w-1 h-1 bg-orange-500 rounded-full animate-pulse hover:scale-150 transition-transform duration-300"
            style={{ top: '40%', left: '60%', animationDelay: '0.5s' }}
          ></div>
          <div 
            className="absolute w-1 h-1 bg-orange-500 rounded-full animate-pulse hover:scale-150 transition-transform duration-300"
            style={{ top: '70%', left: '20%', animationDelay: '1s' }}
          ></div>
          <div 
            className="absolute w-1 h-1 bg-orange-500 rounded-full animate-pulse hover:scale-150 transition-transform duration-300"
            style={{ top: '30%', left: '80%', animationDelay: '1.5s' }}
          ></div>
          {/* Additional floating elements */}
          <div 
            className="absolute w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-bounce opacity-60"
            style={{ top: '60%', left: '10%', animationDelay: '2s', animationDuration: '3s' }}
          ></div>
          <div 
            className="absolute w-2 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-bounce opacity-60"
            style={{ top: '10%', left: '70%', animationDelay: '2.5s', animationDuration: '4s' }}
          ></div>
        </div>
        
        <div 
          className={`relative z-10 w-full md:w-[60%] shadow-2xl border-t bg-white mx-auto h-full md:h-[45%] rounded-xl p-4 md:p-10 flex flex-col gap-6 transition-all duration-1000 ${
            isVisible['how-it-works'] ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="py-1 px-2 rounded-xl bg-amber-50 border border-amber-400 flex item-center justify-center gap-x-1 w-fit mx-auto hover:scale-105 transition-transform duration-300">
            <Zap className="text-amber-500 animate-pulse h-5 w-5" />
            <div className="flex items-center justify-center">
              <p className="text-xs text-amber-500">Process</p>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-center hover:text-orange-600 transition-colors duration-300">Everything you need for your <br className="hidden lg:block" /> business on one platform</h2>
          <p className="text-muted-foreground font-light text-center">Simple setup, powerful automation, immediate results</p>
        </div>
        <div 
          className={`relative z-10 transition-all duration-1000 delay-300 ${
            isVisible['how-it-works'] ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-10'
          }`}
        >
          <FunctionalityCards />
        </div>
        
        {/* AI Agent Live Preview */}
        <div 
          className={`relative z-10 mt-16 transition-all duration-1000 delay-500 ${
            isVisible['how-it-works'] ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-10'
          }`}
        >
          <AIAgentPreview />
        </div>
      </section>

      {/* Solutions section */}
      <section 
        className="px-4 md:px-14 lg:px-24 scroll-mt-[72px] bg-white relative" 
        id="solutions"
        data-animate="solutions"
      >
        <div className="py-4 md:py-14 border relative overflow-hidden" style={{
          backgroundImage: `radial-gradient(circle, #e5e7eb 2px, transparent 1px)`,
          backgroundSize: '15px 15px',
          backgroundPosition: '0 0'
        }}>
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-4 h-4 bg-orange-400 rounded-full animate-ping opacity-30"></div>
            <div className="absolute top-20 right-20 w-2 h-2 bg-amber-400 rounded-full animate-ping opacity-30" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-20 left-20 w-3 h-3 bg-orange-500 rounded-full animate-ping opacity-30" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-10 right-10 w-2 h-2 bg-amber-500 rounded-full animate-ping opacity-30" style={{ animationDelay: '3s' }}></div>
          </div>

          <div 
            className={`w-full md:w-[60%] shadow-2xl border-t bg-white mx-auto h-full md:h-[45%] rounded-xl p-4 md:p-10 flex flex-col gap-6 transition-all duration-1000 ${
              isVisible['solutions'] ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="py-1.5 px-3 rounded-xl bg-amber-50 border border-amber-400 flex item-center justify-center gap-x-1 w-fit mx-auto hover:scale-105 transition-transform duration-300">
              <Target className="text-amber-500 h-4 w-4 animate-pulse" />
              <div className="flex items-center justify-center">
                <p className="text-xs text-amber-500">Solutions</p>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-center hover:text-orange-600 transition-colors duration-300">Transform Every Department with<br className="hidden lg:block" />  our AI Agents</h2>
            <p className="text-muted-foreground font-light text-center">AI agents designed for specific business challenges</p>
          </div>

          <div 
            className={`transition-all duration-1000 delay-300 ${
              isVisible['solutions'] ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-10'
            }`}
          >
            <SolutionsTabs />
          </div>
        </div>
      </section>
      
      {/* AI Agents section */}
      <section 
        className="bg-amber-600 py-4 px-4 md:px-14 md:pb-24 md:py-14 relative scroll-mt-[72px] overflow-hidden" 
        id="ai-agents"
        data-animate="ai-agents"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-6 h-6 bg-white/20 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-4 h-4 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-40 w-5 h-5 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-40 right-40 w-3 h-3 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>

        <div 
          className={`py-2 px-3 rounded-2xl bg-white flex item-center justify-center gap-x-1 w-fit mx-auto transition-all duration-1000 hover:scale-105 ${
            isVisible['ai-agents'] ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-10'
          }`}
        >
          <Bot className="text-amber-500 h-5 w-5 animate-bounce" style={{ animationDuration: '2s' }} />
          <div className="flex items-center justify-center">
            <p className="text-xs text-black font-semibold">AI Agents</p>
          </div>
        </div>

        <div 
          className={`text-center text-white w-fit mx-auto space-y-3 mt-5 transition-all duration-1000 delay-200 ${
            isVisible['ai-agents'] ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="capitalize text-4xl font-bold hover:text-amber-200 transition-colors duration-300">Meet Your Specialised AI Workforce</h2>
          <p className="hover:text-amber-100 transition-colors duration-300">Deploy pre-built agents or deploy custom solutions for every department</p>
        </div>
        <div 
          className={`text-left transition-all duration-1000 delay-400 ${
            isVisible['ai-agents'] ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-10'
          }`}
        >
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
            className="mt-8 h-full-carousel carousel-root hover:scale-105 transition-transform duration-500"
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
          <div className="flex items-center justify-center absolute bottom-10 left-1/2 -translate-x-1/2 bg-gray-400 rounded-lg px-4 py-1.5 gap-x-2 hover:scale-105 transition-transform duration-300">
            <div className="w-24 h-1.5 flex items-center">
              {progressBar}
            </div>
            <ul className="flex items-center justify-center p-0 m-0">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <li
                  className="transition-all duration-300 hover:scale-125"
                  style={{ 
                    background: currentSlide === i ? '#ff007f' : '#fff', 
                    width: 8, 
                    height: 8, 
                    display: 'inline-block', 
                    margin: '0 4px', 
                    borderRadius: '50%', 
                    cursor: 'pointer',
                    transform: currentSlide === i ? 'scale(1.2)' : 'scale(1)',
                    boxShadow: currentSlide === i ? '0 0 10px rgba(255, 0, 127, 0.5)' : 'none'
                  }}
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

      {/* Integrations section */}
      <section 
        className="bg-amber-500 xl:h-fit py-10 md:py-12 px-4 md:px-14 lg:px-24 space-y-4 scroll-mt-[72px] relative overflow-hidden" 
        id="integrations"
        data-animate="integrations"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-8 h-8 bg-white/20 rounded-full animate-bounce"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-40 w-7 h-7 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-40 right-40 w-5 h-5 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '3s' }}></div>
        </div>

        <div 
          className={`py-1.5 px-3 rounded-2xl bg-white flex item-center justify-center gap-x-1 w-fit mx-auto transition-all duration-1000 hover:scale-105 ${
            isVisible['integrations'] ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-10'
          }`}
        >
          <Link className="text-amber-500 h-6 w-6 animate-pulse" />
          <div className="flex items-center justify-center">
            <p className="text-xs text-black font-semibold">Integrations</p>
          </div>
        </div>

        <div 
          className={`text-center text-white w-fit mx-auto space-y-3 transition-all duration-1000 delay-200 ${
            isVisible['integrations'] ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="capitalize text-4xl font-bold hover:text-amber-200 transition-colors duration-300">Works with your favorite tools</h2>
          <p className="hover:text-amber-100 transition-colors duration-300">Connect with 50+ popular business applications</p>
        </div>

        <div 
          className={`flex flex-col items-center md:flex-row md:items-start gap-14 mt-10 mx-auto md:px-20 transition-all duration-1000 delay-400 ${
            isVisible['integrations'] ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-white rounded-lg w-fit mx-auto p-4 md:px-14 md:py-11 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex justify-between items-center">
              <h3 className="text:lg md:text-xl font-bold hover:text-orange-600 transition-colors duration-300">Popular Integrations</h3>
              <div className="py-2 px-4 rounded-full bg-amber-500 border w-fit hover:bg-amber-600 transition-colors duration-300">
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

      

      {/* Pricing section */}
      <section 
        id="pricing"
        data-animate="pricing"
        className="bg-amber-500 xl:h-fit py-10 md:py-12 px-4 md:px-14 lg:px-24 space-y-4 scroll-mt-[72px] relative overflow-hidden" 
      >
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-10 h-10 bg-white/20 rounded-full animate-ping"></div>
          <div className="absolute top-40 right-20 w-8 h-8 bg-white/20 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-40 w-6 h-6 bg-white/20 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-40 right-40 w-12 h-12 bg-white/20 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
        </div>

        <div 
          className={`w-full flex justify-center transition-all duration-1000 ${
            isVisible['pricing'] ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-10'
          }`}
        >
          <Button className="h-[52px] bg-white hover:bg-gradient-to-br from-slate-100 to-slate-50 shadow-lg rounded-full w-fit text-black hover:scale-105 hover:-translate-y-1 transition-all duration-300" >
            <Rocket className="text-amber-500 animate-bounce" style={{ animationDuration: '2s' }} />
            Ready to Get Started?
          </Button>
        </div>
        <div 
          className={`text-center text-white space-y-5 transition-all duration-1000 delay-200 ${
            isVisible['pricing'] ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-bold leading-[60px] hover:text-amber-200 transition-colors duration-300">Transform Your Business <br className="hidden lg:block" />Today</h2>
          <p className="font-medium text-white leading-[30px] hover:text-amber-100 transition-colors duration-300">Join thousands of companies already using AI agents to drive growth and <br className="hidden lg:block" /> innovation</p>
        </div>

        <div 
          className={`max-w-3xl mx-auto flex flex-wrap justify-center md:justify-between transition-all duration-1000 delay-400 ${
            isVisible['pricing'] ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="rounded-full border-[0.5px] border-white/25 bg-gradient-to-r from-white/15 to-white/5 backdrop-blur-2xl p-3 flex gap-x-2 items-center w-fit shrink-0 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <CheckCircle className="text-green-400 h-6 w-6 drop-shadow-md animate-pulse" />
            <p className="font-medium text-white text-sm">No credit card required</p>
          </div>
          <div className="rounded-full border-[0.5px] border-white/25 bg-gradient-to-r from-white/15 to-white/5 backdrop-blur-2xl p-3 flex gap-x-2 items-center w-fit shrink-0 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <CheckCircle className="text-green-400 h-6 w-6 drop-shadow-md animate-pulse" style={{ animationDelay: '1s' }} />
            <p className="font-medium text-white text-sm">Cancel anytime</p>
          </div>
        </div>

        {/* Security and Compliance Section */}
        <div className="mt-8 flex flex-col items-center">
          <div className="rounded-xl border-[0.5px] border-white/25 bg-gradient-to-r from-white/15 to-white/5 backdrop-blur-2xl p-6 flex flex-col items-center gap-4 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <p className="font-medium text-white text-sm text-center">Security and compliance you can trust</p>
            <div className="flex items-center gap-6">
              {/* SOC 2 Logo */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <span className="text-white font-bold text-lg">SOC</span>
                </div>
                <span className="text-white/80 text-xs font-medium">SOC 2</span>
              </div>
              
              {/* ISO 27001 Logo */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <span className="text-white font-bold text-xs">ISO</span>
                </div>
                <span className="text-white/80 text-xs font-medium">ISO 27001</span>
              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
