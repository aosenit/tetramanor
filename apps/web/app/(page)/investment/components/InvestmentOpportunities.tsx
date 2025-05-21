"use client";

import { FaMoneyBillWave, FaShieldAlt, FaClock } from "react-icons/fa";

const features = [
  {
    icon: FaMoneyBillWave,
    title: "High Returns",
    description: "Earn up to 50% ROI over a short duration (1-18 months)",
  },
  {
    icon: FaShieldAlt,
    title: "Minimal Risk",
    description: "Tetramanor handles the entire process, from land acquisition to sales",
  },
  {
    icon: FaClock,
    title: "Flexible Investment Options",
    description: "Choose between Fixed ROI or Equity-Based Profit Sharing",
  },
];

function Feature({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="flex gap-4 max-w-lg items-start p-3 rounded-md bg-[#f5f5f5]">
      <div className="h-12 w-12 rounded-full bg-[#e3eae4] flex items-center justify-center">
        <Icon className="h-6 w-6 text-green-600" aria-hidden="true" />
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-muted-foreground text-xs text-justify">{description}</p>
      </div>
    </div>
  );
}

export default function InvestmentOpportunities() {
  return (
    <section className="container mx-auto px-4 lg:px-16 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <h1 className="text-3xl font-semibold tracking-tight">Tetramanor Investment Opportunities</h1>
          <p className="text-sm text-justify text-muted-foreground">
            The value of the real estate market in Nigeria is huge! Growth rate is currently around 7.2% per annum.
          </p>
          <p className="text-sm  text-justify text-muted-foreground">
            At Tetramanor, we have developed a proven strategy for delivering massive returns from real estate projects.
            As part of our expansion drive, we are actively seeking Partners to participate in lucrative real estate
            markets in Lagos and Abuja.
          </p>
        </div>

        <div className="space-y-8">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
