import React from 'react';
import Image from 'next/image';
import shakehands from "../../../../public/investment/shakehands.png"
import cash from '../../../../public/investment/cash.png';
import hand from '../../../../public/investment/hand.png';
import check from '../../../../public/investment/check.png';
import afuniloke from '../../../../public/investment/afuniloke.png';
import { FaCheck} from 'react-icons/fa';
import { FaMoneyBillTrendUp } from 'react-icons/fa6';

const steps = [
  {
    icon: cash,
    title: 'Partner Provides Starting Capital',
    description: 'Partner funds the initial project phase.',
  },
  {
    icon: hand,
    title: 'Tetramanor Funds Through Sales',
    description: 'Sales proceeds are used to cover remaining project costs.',
  },
  {
    icon: check,
    title: 'Project Completed & Profits Shared',
    description: 'Upon completion, Tetramanor and Partners share profits.',
  },
  {
    icon: afuniloke,
    title: 'Partners Earns Based on Actual Profits',
    description: 'Returns depend on the real profit achieved, not a fixed rate.',
  },
];

function TabTwo() {
  return (
    <div>
       <div className="space-y-12">
                  <div className="bg-[#f9f4f0] rounded-xl p-2 md:p-4">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="flex items-center justify-center">
                        <div className="bg-amber-100 rounded-xl  w-full">
                          <Image
                            src={shakehands}
                            alt="Fixed ROI illustration showing houses and guaranteed returns"
                            className="w-full"
                          />
                        </div>
                      </div>
                      <div className="">
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#11611414]">
                         <FaMoneyBillTrendUp className="text-[#116114]"/>
                        </div>
    
                        <h2 className="text-xl my-3 font-semibold">Equity-Based Model</h2>
    
                        <p className="text-[#0B0A0A] text-sm">
                        Investors share in the actual profits for larger, long-term projects instead of receiving a fixed return.
                        </p>
    
                        <ul className="space-y-3 mt-10">
                          <li className="flex items-start gap-2">
                            <FaCheck className="h-5 w-3 mt-0.5 flex-shrink-0 text-[#0B0A0A]" />
                            <div className="text-sm font-medium text-[#0B0A0A]">
                              <span className="text-sm font-semibold">Project Size:</span> 1,000 - 2,000 sqm (5 - 15 homes)
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <FaCheck className="h-5 w-3 mt-0.5 flex-shrink-0 text-[#0B0A0A]" />
                            <div className="text-sm font-medium text-[#0B0A0A]">
                              <span className="font-semibold text-sm">Investment Required:</span> Minimum ₦50M per investor
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <FaCheck className="h-5 w-3 mt-0.5 flex-shrink-0 text-[#0B0A0A]" />
                            <div className="text-sm font-medium text-[#0B0A0A]">
                              <span className=" text-sm font-semibold">Returns:</span> Up to 50% on invested capital
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <FaCheck className="h-5 w-3 mt-0.5 flex-shrink-0 text-[#0B0A0A]" />
                            <div className="text-sm font-medium text-[#0B0A0A]">
                              <span className="text-sm font-semibold">Number of Partners:</span> Maximum 5 per project
                            </div>
                          </li>
                        </ul>
    
                        <div className="mt-6 flex gap-2">
                          <p className="font-medium text-sm text-[#0B0A0A]">More benefits include:
                            <span className="text-[#116114] text-sm font-bold"> {" "}
                              Guaranteed Returns, Lower Risk, Shorter Time Frame, Smaller Investment Size, Diversification
                              Option.
                            </span>
                          </p>
                        </div>
                      </div>
    
                    </div>
                  </div>
                </div>
    <div className="mt-10">
      <h2 className="text-3xl font-bold">How it works</h2>

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
    </div>
  );
}

export default TabTwo;
