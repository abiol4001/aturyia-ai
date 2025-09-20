"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';

// Custom slider styles
const sliderStyles = `
  .slider {
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
  }

  .slider::-webkit-slider-track {
    background: #e5e7eb;
    height: 8px;
    border-radius: 4px;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    background: #f97316;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 2px 6px rgba(249, 115, 22, 0.3);
  }

  .slider::-moz-range-track {
    background: #e5e7eb;
    height: 8px;
    border-radius: 4px;
    border: none;
  }

  .slider::-moz-range-thumb {
    background: #f97316;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 2px 6px rgba(249, 115, 22, 0.3);
  }
`;

const Pricing = () => {
  const [monthlyProspects, setMonthlyProspects] = React.useState(1000);
  const [conversionRate, setConversionRate] = React.useState(0.1);
  const [dealValue, setDealValue] = React.useState(10000);

  // Calculate annual revenue potential
  const annualRevenue = Math.round((monthlyProspects * conversionRate / 100 * dealValue) * 12);

  const formatNumber = (num: number) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };

  const formatCurrency = (num: number) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
      return '$' + (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return '$' + (num / 1000).toFixed(0) + 'K';
    }
    return '$' + num.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 relative overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: sliderStyles }} />
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Calculate Your AI Agent ROI
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover the revenue potential with our intelligent AI agents. See how specialized automation can transform your business metrics with precision and innovation.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* SDR LITE Card */}
          <div className="w-full p-6 bg-gradient-to-br from-orange-50/80 to-amber-50/80 backdrop-blur-[20px] rounded-2xl border border-orange-200/50 relative overflow-hidden transition-all duration-500 ease-out cursor-pointer hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(249,115,22,0.15)] hover:border-orange-300/70 group flex flex-col h-full">
            {/* Shimmer Effect */}
            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-orange-200/20 to-transparent transition-all duration-500 ease-out group-hover:left-full"></div>
            
            <div className="text-center mb-6 relative z-10">
              <div className="text-xl font-bold text-gray-800 mb-2">
                SDR LITE
              </div>
              <div className="text-4xl font-extrabold text-orange-600 mb-3">
                £---/month
              </div>
              <p className="text-gray-600 text-base">
                Perfect for growing sales teams
              </p>
            </div>

            <ul className="space-y-3 mb-6 flex-grow relative z-10">
              <li className="text-gray-700 py-1.5 pl-5 relative before:content-['✓'] before:absolute before:left-0 before:text-emerald-500 before:font-bold text-sm">
                Up to 500 leads per month
              </li>
              <li className="text-gray-700 py-1.5 pl-5 relative before:content-['✓'] before:absolute before:left-0 before:text-emerald-500 before:font-bold text-sm">
                Up to 3000 emails (6 touch cadence)
              </li>
              <li className="text-gray-700 py-1.5 pl-5 relative before:content-['✓'] before:absolute before:left-0 before:text-emerald-500 before:font-bold text-sm">
                1 mailbox, 1 LinkedIn seat
              </li>
              <li className="text-gray-700 py-1.5 pl-5 relative before:content-['✓'] before:absolute before:left-0 before:text-emerald-500 before:font-bold text-sm">
                Email + Slack support
              </li>
            </ul>

            <div className="bg-yellow-100/80 border border-yellow-300/50 rounded-lg p-3 mb-6 backdrop-blur-sm relative z-10">
              <p className="text-yellow-800 text-center font-medium text-sm">
                12 month contract minimum
              </p>
            </div>

            <button className="w-full p-3 bg-orange-500/90 border-2 border-orange-400/50 rounded-xl text-white font-semibold text-sm cursor-pointer transition-all duration-300 ease-out hover:bg-orange-600 hover:scale-105 flex items-center justify-center gap-2 mt-auto relative z-10">
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* SDR UNLIMITED Card */}
          <div className="w-full p-6 bg-gradient-to-br from-purple-50/80 to-indigo-50/80 backdrop-blur-[20px] rounded-2xl border border-purple-200/50 relative overflow-hidden transition-all duration-500 ease-out cursor-pointer hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] hover:border-purple-300/70 group flex flex-col h-full">
            {/* Shimmer Effect */}
            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-blue-200/20 to-transparent transition-all duration-500 ease-out group-hover:left-full"></div>
            
            <div className="text-center mb-6 relative z-10">
              <div className="text-xl font-bold text-gray-800 mb-2">
                SDR UNLIMITED
              </div>
              <div className="text-4xl font-extrabold text-purple-600 mb-3">
                £---/month
              </div>
              <p className="text-gray-600 text-base">
                For high-volume sales operations
              </p>
            </div>

            <ul className="space-y-3 mb-6 flex-grow relative z-10">
              <li className="text-gray-700 py-1.5 pl-5 relative before:content-['✓'] before:absolute before:left-0 before:text-emerald-500 before:font-bold text-sm">
                Unlimited leads and email sends
              </li>
              <li className="text-gray-700 py-1.5 pl-5 relative before:content-['✓'] before:absolute before:left-0 before:text-emerald-500 before:font-bold text-sm">
                Safety throttle: 200 emails/inbox/day
              </li>
              <li className="text-gray-700 py-1.5 pl-5 relative before:content-['✓'] before:absolute before:left-0 before:text-emerald-500 before:font-bold text-sm">
                3 mailboxes, 3 LinkedIn seats
              </li>
              <li className="text-gray-700 py-1.5 pl-5 relative before:content-['✓'] before:absolute before:left-0 before:text-emerald-500 before:font-bold text-sm">
                Email + Slack support
              </li>
              <li className="text-gray-700 py-1.5 pl-5 relative before:content-['✓'] before:absolute before:left-0 before:text-emerald-500 before:font-bold text-sm">
                Dedicated CSM
              </li>
            </ul>

            <button className="w-full p-3 bg-purple-500/90 border-2 border-purple-400/50 rounded-xl text-white font-semibold text-sm cursor-pointer transition-all duration-300 ease-out hover:bg-purple-600 hover:scale-105 flex items-center justify-center gap-2 mt-auto relative z-10">
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ROI Calculator Section */}
        <div className="mt-16">
          <div className="bg-gradient-to-br from-gray-50/90 to-slate-50/90 backdrop-blur-[20px] rounded-2xl border border-gray-200/50 p-6 max-w-5xl mx-auto shadow-lg">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Panel - Input Calculator */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Calculate Your Business Potential</h3>
                
                {/* Monthly Prospects */}
                <div className="space-y-3">
                  <label className="text-base font-semibold text-gray-700">Monthly Prospects</label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={formatNumber(monthlyProspects)}
                      readOnly
                      className="w-full p-2.5 bg-white/80 border border-gray-300/50 rounded-lg text-orange-600 font-semibold text-base text-center shadow-sm"
                    />
                    <div className="relative">
                      <input
                        type="range"
                        min="1000"
                        max="100000"
                        step="1000"
                        value={monthlyProspects}
                        onChange={(e) => setMonthlyProspects(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1K</span>
                        <span>100K</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Conversion Rate */}
                <div className="space-y-3">
                  <label className="text-base font-semibold text-gray-700">Conversion Rate</label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={`${conversionRate}%`}
                      readOnly
                      className="w-full p-2.5 bg-white/80 border border-gray-300/50 rounded-lg text-orange-600 font-semibold text-base text-center shadow-sm"
                    />
                    <div className="relative">
                      <input
                        type="range"
                        min="0.1"
                        max="5"
                        step="0.1"
                        value={conversionRate}
                        onChange={(e) => setConversionRate(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0.1%</span>
                        <span>5%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Average Deal Value */}
                <div className="space-y-3">
                  <label className="text-base font-semibold text-gray-700">Average Deal Value</label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={formatCurrency(dealValue)}
                      readOnly
                      className="w-full p-2.5 bg-white/80 border border-gray-300/50 rounded-lg text-orange-600 font-semibold text-base text-center shadow-sm"
                    />
                    <div className="relative">
                      <input
                        type="range"
                        min="10000"
                        max="1000000"
                        step="10000"
                        value={dealValue}
                        onChange={(e) => setDealValue(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>$10K</span>
                        <span>$1M</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel - Results and CTA */}
              <div className="flex flex-col justify-center items-center text-center space-y-6">
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-gray-800">Annual Revenue Potential</h4>
                  <div className="relative">
                    <div className="text-5xl font-bold text-orange-600">{formatCurrency(annualRevenue)}</div>
                    <div className="w-20 h-1 bg-orange-500 mx-auto mt-2 rounded-full"></div>
                  </div>
                </div>

                <button className="w-full max-w-xs bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg">
                  Start Your AI Journey
                </button>

                <p className="text-gray-600 text-sm max-w-sm leading-relaxed">
                  Ready to unlock your business potential? Our AI agents help you prospect smarter, convert better, and scale efficiently with cutting-edge automation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;