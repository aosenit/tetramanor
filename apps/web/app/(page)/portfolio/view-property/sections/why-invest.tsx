"use client";
import React from "react";
import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import type { PropertyItem } from "@/types/property";
import placeholder from "@/assets/placeholder.jpg";

interface WhyInvestProps {
  property: PropertyItem;
}

export default function WhyInvest({ property }: WhyInvestProps) {
  const whyInvest = property.whyInvest;
  return (
    <div className="bg-[#f3f7f3]">
      <div className="container mx-auto px-4 lg:px-16 py-12 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
            <Image
              src={property.images?.[0]?.imageUrl || placeholder}
              alt={property.name || "Property image"}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-8 text-[#0b0a0a]">
              {property ? `Why Invest in ${property.name}?` : "Why Invest?"}
            </h2>
            {whyInvest?.length ? (
              <div className="space-y-8">
                {whyInvest?.map((adv, idx) => (
                  <div className="flex items-start" key={idx}>
                    <div className="mt-1 mr-4 flex-shrink-0">
                      <FaCheck className="h-5 w-5 text-[#116114]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{adv.title}</h3>
                      <p className="text-[#5c5c5c]">{adv.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>No investment information available for this property.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
