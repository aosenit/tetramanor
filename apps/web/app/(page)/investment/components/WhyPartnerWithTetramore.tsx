import React from 'react';
import Image from 'next/image';
import people from '../../../../public/investment/people.png';
import badge from '../../../../public/investment/badge.png';
import hike from '../../../../public/investment/hike.png';
import bank from '../../../../public/investment/bank.png';

const features = [
  {
    icon: people,
    title: 'Proven Track Record',
    description: 'Completed projects in high-demand locations.',
  },
  {
    icon: badge,
    title: 'High ROI',
    description: 'Structured investment models with strong returns.',
  },
  {
    icon: hike,
    title: 'Risk Management',
    description: 'Tetramanor handles all operational and financial complexities.',
  },
  {
    icon: bank,
    title: 'Market Expertise',
    description: 'Extensive knowledge of Lagos and Abuja real estate markets.',
  },
];

function WhyPartnerWithTetramore() {
  return (
    <div className="container mx-auto px-4 lg:px-16 py-12">
      <h2 className="text-3xl font-bold">Why Partner with Tetramanor?</h2>

      <div className="grid grid-cols-1 mt-8 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="space-y-4">
            <div className="max-w-[200px]">
              <Image src={feature.icon} width={30} height={30} alt={`${feature.title} icon`} />
            </div>
            <h3 className="text-lg font-semibold text-[#000000]">{feature.title}</h3>
            <p className="text-[#202020] text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhyPartnerWithTetramore;
