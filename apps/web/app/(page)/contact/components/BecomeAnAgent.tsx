"use client";
import React from "react";
import Image from "next/image";
import a from "@/assets/investment/icons/a.webp";
import b from "@/assets/investment/icons/b.webp";
import c from "@/assets/investment/icons/c.webp";
import d from "@/assets/investment/icons/d.webp";
import { IoMdMail } from "react-icons/io";
import { MdCall } from "react-icons/md";
const steps = [
  {
    icon: a,
    title: "Unmatched Support",
    description: "Ongoing guidance and mentorship from seasoned professionals.",
  },
  {
    icon: b,
    title: "Commission Advantage",
    description: "Earn more with a performance-driven commission structure.",
  },
  {
    icon: c,
    title: "Exclusive Listings",
    description:
      "Access premium properties, from luxury homes to top investments.",
  },
  {
    icon: d,
    title: "Strong Brand Reputation",
    description:
      "Represent a reputable and respected real estate name in Nigeria.",
  },
];
function BecomeAnAgent() {
  return (
    <div className="bg-[#f3f7f3] py-12">
      <div className="container mx-auto px-4 lg:px-16 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl text-black font-semibold">
              Become an Agent
            </h1>
            <p className="text-[#2B2D2F] mt-2">
              Launch your real estate career with Tetramanor
            </p>
          </div>
          <div className="flex flex-col gap-4 lg:flex-row">
            <p className="flex items-center gap-4">
              <span className="text-green-700">
                <MdCall />
              </span>
              +234 812 345 67
            </p>
            <p className="flex items-center gap-4">
              <span className="text-green-700">
                <IoMdMail />
              </span>{" "}
              tetramanor@mail.com
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 mt-16 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

export default BecomeAnAgent;
