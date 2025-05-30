"use client";
import React from "react";
import Image from "next/image";
import { FaCheck, FaCoins } from "react-icons/fa";

const steps = [
  {
    icon: "/investment/cash.png",
    title: "Partner Provides Capital",
    description: "The Partner supplies the initial investment.",
  },
  {
    icon: "/investment/hand.png",
    title: "Tetramanor Funds Balance",
    description: "Tetramanor funds the remaining project costs.",
  },
  {
    icon: "/investment/check.png",
    title: "Project Completion & Sales",
    description: "The development is completed and sold.",
  },
  {
    icon: "/investment/afuniloke.png",
    title: "Fixed ROI Payment",
    description:
      "Partner receives the agreed return, regardless of profit fluctuations.",
  },
];

function TabOne() {
  return (
    <div>
      <div className="space-y-12">
        <div className="bg-[#f9f4f0] rounded-xl p-2 md:p-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#11611414]">
                <FaCoins className="text-[#116114]" />
              </div>

              <h2 className="text-xl my-3 font-semibold">Fixed ROI Model</h2>

              <p className="text-[#0B0A0A] text-sm">
                This model targets smaller projects that can be completed within
                18 months, offering predictable and low-risk returns.
              </p>

              <ul className="space-y-3 mt-10">
                <li className="flex items-start gap-2">
                  <FaCheck className="h-5 w-3 mt-0.5 flex-shrink-0 text-[#0B0A0A]" />
                  <div className="text-sm font-medium text-[#0B0A0A]">
                    <span className="text-sm font-semibold">Project Size:</span>{" "}
                    1,000 - 2,000 sqm (5 - 15 homes)
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheck className="h-5 w-3 mt-0.5 flex-shrink-0 text-[#0B0A0A]" />
                  <div className="text-sm font-medium text-[#0B0A0A]">
                    <span className="font-semibold text-sm">
                      Investment Required:
                    </span>{" "}
                    Minimum ₦50M per investor
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheck className="h-5 w-3 mt-0.5 flex-shrink-0 text-[#0B0A0A]" />
                  <div className="text-sm font-medium text-[#0B0A0A]">
                    <span className=" text-sm font-semibold">Returns:</span> Up
                    to 50% on invested capital
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheck className="h-5 w-3 mt-0.5 flex-shrink-0 text-[#0B0A0A]" />
                  <div className="text-sm font-medium text-[#0B0A0A]">
                    <span className="text-sm font-semibold">
                      Number of Partners:
                    </span>{" "}
                    Maximum 5 per project
                  </div>
                </li>
              </ul>

              <div className="mt-6 flex gap-2">
                <p className="font-medium text-sm text-[#0B0A0A]">
                  More benefits include:
                  <span className="text-[#116114] text-sm font-bold">
                    {" "}
                    Guaranteed Returns, Lower Risk, Shorter Time Frame, Smaller
                    Investment Size, Diversification Option.
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="bg-amber-100 rounded-xl  w-full">
                <Image
                  src="/blog/guaranteed.png"
                  alt="Fixed ROI illustration showing houses and guaranteed returns"
                  className="w-full"
                  width={1200}
                  height={800}
                />
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
                <Image
                  src={step.icon}
                  width={30}
                  height={30}
                  alt={`${step.title} icon`}
                />
              </div>
              <h3 className="text-lg font-semibold text-[#000000]">
                {step.title}
              </h3>
              <p className="text-[#202020] text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TabOne;
