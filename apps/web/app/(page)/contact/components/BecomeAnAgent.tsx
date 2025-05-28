import React from 'react'
import Image from 'next/image'
import cash from '../../../../public/investment/cash.png';
import hand from '../../../../public/investment/hand.png';
import check from '../../../../public/investment/check.png';
import afuniloke from '../../../../public/investment/afuniloke.png';
const steps = [
    {
      icon: cash,
      title: 'Unmatched Support',
      description: 'Ongoing guidance and mentorship from seasoned professionals.',
    },
    {
      icon: hand,
      title: 'Commission Advantage',
      description: 'Earn more with a performance-driven commission structure.',
    },
    {
      icon: check,
      title: 'Exclusive Listings',
      description: 'Access premium properties, from luxury homes to top investments.',
    },
    {
      icon: afuniloke,
      title: 'Strong Brand Reputation',
      description: 'Represent a reputable and respected real estate name in Nigeria.',
    },
  ];
function BecomeAnAgent() {
  return (
      <div className="container mx-auto px-4 lg:px-16 py-12">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
  <div>
    <h1 className="text-2xl text-black font-semibold">Become an Agent</h1>
    <p className="text-[#2B2D2F] mt-2">
      Launch your real estate career with Tetramanor
    </p>
  </div>
  <div>
    <button className="bg-[#116014] text-white py-2 px-4 rounded-md w-full md:w-44">
      Register here
    </button>
  </div>
</div>

           <div className="grid grid-cols-1 mt-8 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {steps.map((step, index) => (
                    <div key={index} className="space-y-4">
                      <div className="max-w-[200px]">
                        <Image src={step.icon} width={30} height={30} alt={`${step.title} icon`} />
                      </div>
                      <h3 className="text-lg font-semibold text-[#000000]">{step.title}</h3>
                      <p className="text-[#202020] text-sm">{step.description}</p>
                    </div>
                  ))}
                </div>
    </div>
  )
}

export default BecomeAnAgent