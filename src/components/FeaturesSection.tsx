import React from 'react';
import { Check, Search, Settings, User, Home, Calendar } from 'lucide-react';

const features = [
  {
    icon: <Search className='h-6 w-6 text-zebotix-blue' />,
    title: 'Smart Insights',
    description:
      'Understand your data instantly with clear analytics and visual reports that guide better business decisions.',
  },
  {
    icon: <Settings className='h-6 w-6 text-zebotix-blue' />,
    title: 'Seamless Integration',
    description:
      'Easily connect with your existing apps and systems to keep your workflow smooth and efficient.',
  },
  {
    icon: <User className='h-6 w-6 text-zebotix-blue' />,
    title: 'Advanced User Control',
    description:
      'Manage users, roles, and permissions securely with our easy-to-use access management tools.',
  },
  {
    icon: <Home className='h-6 w-6 text-zebotix-blue' />,
    title: 'Custom Dashboards',
    description:
      'Design personalized dashboards that show only the data and metrics that matter most to your business.',
  },
  {
    icon: <Calendar className='h-6 w-6 text-zebotix-blue' />,
    title: 'Automated Scheduling',
    description:
      'Plan, automate, and track tasks with built-in scheduling tools that save time and boost productivity.',
  },
  {
    icon: <Check className='h-6 w-6 text-zebotix-blue' />,
    title: 'Real-Time Progress Tracking',
    description:
      'Monitor team performance and project milestones in real time with interactive reports and alerts.',
  },
];

const FeaturesSection = () => {
  return (
    <div id='features' className='bg-zebotix-black py-16 md:py-24'>
      <div className='section-container'>
        <div className='text-center max-w-3xl mx-auto mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            Powerful <span className='gradient-text'>Features</span> to Grow Your Business
          </h2>
          <p className='text-gray-400'>
            Discover an all-in-one platform designed to simplify your workflows, enhance
            collaboration, and help your business scale faster with smart automation and analytics.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='bg-zebotix-darkGray p-6 rounded-xl border border-gray-800 hover:border-zebotix-blue/50 transition-all duration-300 card-shadow'
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className='bg-zebotix-blue/10 w-12 h-12 flex items-center justify-center rounded-lg mb-4'>
                {feature.icon}
              </div>
              <h3 className='text-xl font-semibold mb-2 text-white'>{feature.title}</h3>
              <p className='text-gray-400'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
