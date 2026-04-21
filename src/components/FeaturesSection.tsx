'use client';

import React from 'react';
import { Check, Search, Settings, User, Home, Calendar } from 'lucide-react';
import { FEATURES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/animations';

const iconMap: Record<string, React.ReactNode> = {
  Search: <Search className='h-6 w-6 text-zebotix-blue' />,
  Settings: <Settings className='h-6 w-6 text-zebotix-blue' />,
  User: <User className='h-6 w-6 text-zebotix-blue' />,
  Home: <Home className='h-6 w-6 text-zebotix-blue' />,
  Calendar: <Calendar className='h-6 w-6 text-zebotix-blue' />,
  Check: <Check className='h-6 w-6 text-zebotix-blue' />,
};

const FeaturesSection = () => {
  return (
    <section id='features' className='bg-zebotix-black py-16 md:py-24 overflow-hidden'>
      <div className='section-container'>
        <div className='text-center max-w-3xl mx-auto mb-16'>
          <Reveal>
            <h2 className='text-3xl md:text-5xl font-bold mb-4 text-white'>
              Powerful <span className='bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent'>Features</span> to Grow Your Business
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className='text-gray-400 text-lg'>
              Discover an all-in-one platform designed to simplify your workflows, enhance
              collaboration, and help your business scale faster with smart automation and analytics.
            </p>
          </Reveal>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {FEATURES.map((feature, index) => (
            <Reveal 
              key={index} 
              delay={0.1 * (index % 3)} 
              distance={30}
              className="h-full"
            >
              <div
                className={cn(
                  'bg-zebotix-darkGray p-8 rounded-2xl border border-gray-800 h-full',
                  'hover:border-zebotix-blue/50 transition-all duration-300 shadow-xl group'
                )}
              >
                <div className='bg-zebotix-blue/10 w-14 h-14 flex items-center justify-center rounded-xl mb-6 group-hover:bg-zebotix-blue/20 transition-colors'>
                  {iconMap[feature.iconName]}
                </div>
                <h3 className='text-2xl font-semibold mb-3 text-white'>{feature.title}</h3>
                <p className='text-gray-400 leading-relaxed'>{feature.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
