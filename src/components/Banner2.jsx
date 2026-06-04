import React from 'react';
import { Card } from '@heroui/react';
// Changed to 'Persons' as suggested by the Next.js compiler hint
import { Briefcase, Persons, Magnifier, Star } from '@gravity-ui/icons';

export default function Banner2() {
  const stats = [
    {
      id: 1,
      icon: <Briefcase width="20" height="20" className="text-gray-400" />,
      value: "50K",
      label: "Active Jobs",
    },
    {
      id: 2,
      // Using the verified 'Persons' icon for companies
      icon: <Persons width="20" height="20" className="text-gray-400" />,
      value: "12K",
      label: "Companies",
    },
    {
      id: 3,
      icon: <Magnifier width="20" height="20" className="text-gray-400" />,
      value: "2M",
      label: "Job Seekers",
    },
    {
      id: 4,
      icon: <Star width="20" height="20" className="text-gray-400" />,
      value: "97%",
      label: "Satisfaction Rate",
    },
  ];

  return (
    <section className="relative w-full min-h-[1000px] bg-black text-white flex flex-col justify-end items-center px-4 pb-10 md:pb-28 overflow-hidden select-none bg-[url('/images/globe.png')] bg-center bg-no-repeat bg-contain">
      
      {/* 1. Glow Effect behind the globe */}
      <div className="absolute inset-x-0 top-12 mx-auto w-[600px] h-[400px] bg-indigo-600/30 rounded-full blur-[120px] pointer-events-none" />

      {/* 2. Globe Background Image (Referencing hireBanner2.png) */}
      <div 
        className="absolute inset-x-0 top-0 mx-auto w-full  bg-center bg-no-repeat bg-contain opacity-80 pointer-events-none "
        
      />

      {/* 3. Hero Copy Content */}
      <div className="relative z-10 text-center max-w-2xl mb-16">
        <h2 className="text-3xl md:text-4xl font-normal tracking-tight text-slate-200 leading-snug">
          Assisting over <span className="font-semibold text-white">15,000 job seekers</span> <br />
          find their dream positions.
        </h2>
      </div>

      {/* 4. HeroUI v3 Stats Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl">
        {stats.map((stat) => (
          <Card 
            key={stat.id} 
            className="bg-gradient-to-b from-[#0d0d11] to-[#050507] border border-white/[0.06] rounded-2xl shadow-2xl backdrop-blur-sm"
          >
            <Card.Content className="p-6 flex flex-col justify-between min-h-[160px]">
              {/* Icon Slot */}
              <div className="mb-4 self-start">
                {stat.icon}
              </div>
              
              {/* Text Data */}
              <div className="space-y-1">
                <span className="text-4xl font-semibold tracking-tight text-white block">
                  {stat.value}
                </span>
                <span className="text-xs font-medium text-gray-400 tracking-wide uppercase">
                  {stat.label}
                </span>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>
    </section>
  );
}