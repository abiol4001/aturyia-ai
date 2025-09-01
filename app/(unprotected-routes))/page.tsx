"use client"

import { Settings, Target } from "lucide-react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import React, { useState } from 'react';
import CarouselCard from "@/components/CarouselCard";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 2; // We have 2 slides

  const updateCurrentSlide = (index: number) => {
    if (currentSlide !== index) {
      setCurrentSlide(index);
    }
  };

  const progressBar = (
    <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
      <div className="bg-black h-1.5 rounded-full " style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}></div>
    </div>
  );

  return (
    <div className="bg-amber-50">
      <section className="bg-amber-600 h-[calc(100vh-72px)] py-4">
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
    </div>
  );
}
