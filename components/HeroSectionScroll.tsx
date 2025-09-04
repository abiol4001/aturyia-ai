import React from 'react';
import { Zap, Shield, Rocket, Brain, Globe, Target, Settings } from 'lucide-react';

const InfiniteFeatureCards = () => {
  const features = [
    {
      id: 1,
      icon: <Target className="w-6 h-6" />,
      title: "Lead Enrichment",
      description: "Firmographics + intent",
    },
    {
      id: 2,
      icon: <Rocket className="w-6 h-6" />,
      title: "1:1 Outreach",
      description: "Personalised email",
    },
    {
      id: 3,
      icon: <Settings className="w-6 h-6" />,
      title: "Smart Routing",
      description: "ICP and territory",
    },
    {
      id: 4,
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered",
      description: "Advanced machine learning capabilities built-in",
    },
    {
      id: 5,
      icon: <Globe className="w-6 h-6" />,
      title: "Global Scale",
      description: "Worldwide infrastructure for maximum reliability",
    }
  ];

  // Create multiple copies for seamless infinite scroll
  const infiniteFeatures = [...features, ...features, ...features];

  return (
    <div className="w-full overflow-hidden  pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">  

        <div className="relative">
          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 via-slate-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 via-slate-50 to-transparent z-10"></div>

          {/* Infinite scrolling container */}
          <div className="overflow-hidden py-2">
            <div
              className="flex gap-6 continuous-scroll"
              // onMouseEnter={(e) => e.target.style.animationPlayState = 'paused'}
              // onMouseLeave={(e) => e.target.style.animationPlayState = 'running'}
            >
              {infiniteFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-80 group"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                    {/* Icon with colored background */}
                    <div className={`w-12 h-12 bg-gradient-to-bl from-orange-600 to-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .continuous-scroll {
            animation: continuous-slide 10s linear infinite;
          }
          
          @keyframes continuous-slide {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-1720px);
            }
          }
        `
      }} />
    </div>
  );
};

export default InfiniteFeatureCards;