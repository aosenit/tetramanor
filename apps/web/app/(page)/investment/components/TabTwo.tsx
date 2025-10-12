"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { FaCheck, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import a from "@/assets/investment/icons/a.webp";
import b from "@/assets/investment/icons/b.webp";
import c from "@/assets/investment/icons/c.webp";
import d from "@/assets/investment/icons/d.webp";
import four from "@/assets/investment/four.webp";
import InvestmentDetailsModal from "./InvestmentDetailsModal";

const steps = [
  {
    icon: a,
    title: "Partner Provides Starting Capital",
    description: "Partner funds the initial project phase.",
  },
  {
    icon: b,
    title: "Tetramanor Funds Through Sales",
    description: "Sales proceeds are used to cover remaining project costs.",
  },
  {
    icon: c,
    title: "Project Completed & Profits Shared",
    description: "Upon completion, Tetramanor and Partners share profits.",
  },
  {
    icon: d,
    title: "Partners Earns Based on Actual Profits",
    description:
      "Returns depend on the real profit achieved, not a fixed rate.",
  },
];

function TabTwo({ investments }: { investments: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [selectedInvestment, setSelectedInvestment] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToIndex = (idx: number) => {
    if (scrollRef.current) {
      const card = scrollRef.current.children[idx] as HTMLElement;
      if (card) {
        card.scrollIntoView({
          behavior: "smooth",
          inline: "start",
          block: "nearest",
        });
      }
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent((prev) => {
        scrollToIndex(prev - 1);
        return prev - 1;
      });
    }
  };

  const handleNext = () => {
    if (current < investments.length - 1) {
      setCurrent((prev) => {
        scrollToIndex(prev + 1);
        return prev + 1;
      });
    }
  };

  // Define InvestmentImage type if not already defined
  // (If already imported from TabOne, you can remove this)
  type InvestmentImage = {
    imageUrl: string;
    isPrimary?: boolean;
  };

  const getInvestmentImage = (images: InvestmentImage[] | undefined) => {
    if (!images || images.length === 0) return four;
    const primary = images.find((img) => img.isPrimary);
    return primary?.imageUrl || images[0].imageUrl || four;
  };

  return (
    <div>
      <div className="space-y-12">
        <div className="relative">
          {investments.length > 1 && (
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 disabled:opacity-50"
              onClick={handlePrev}
              disabled={current === 0}
              aria-label="Previous"
            >
              <FaChevronLeft />
            </button>
          )}
          <div
            className="flex overflow-x-auto gap-8 scrollbar-hide pb-2 overscroll-x-contain overflow-y-hidden"
            ref={scrollRef}
          >
            {investments.map((investment, idx) => (
              <div
                key={idx}
                className="bg-[#f9f4f0] rounded-xl p-2 md:p-4 min-w-full max-w-full flex-shrink-0"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex items-center justify-center h-[350px]">
                    <div className="bg-amber-100 rounded-xl w-full h-[350px] flex items-center justify-center overflow-hidden">
                      <Image
                        src={getInvestmentImage(investment?.image)}
                        alt={investment?.projectName || ""}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        width={400}
                        height={300}
                      />
                    </div>
                  </div>
                  <div className="h-[300px] flex flex-col justify-between">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#11611414]">
                      <FaMoneyBillTrendUp className="text-[#116114]" />
                    </div>

                    <h2 className="text-xl my-3 font-semibold">
                      {investment?.projectName || "Equity-Based Model"}
                    </h2>

                    <p className="text-[#0B0A0A] text-sm">
                      {investment?.description ||
                        "Investors share in the actual profits for larger, long-term projects instead of receiving a fixed return."}
                    </p>

                    <ul className="space-y-3 mt-10">
                      <li className="flex items-start gap-2">
                        <FaCheck className="h-5 w-3 mt-0.5 flex-shrink-0 text-[#0B0A0A]" />
                        <div className="text-sm font-medium text-[#0B0A0A]">
                          <span className="text-sm font-semibold">
                            Estimated ROI:
                          </span>{" "}
                          {investment?.estimatedROI || "Up to"}% on invested
                          capital
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <FaCheck className="h-5 w-3 mt-0.5 flex-shrink-0 text-[#0B0A0A]" />
                        <div className="text-sm font-medium text-[#0B0A0A]">
                          <span className="font-semibold text-sm">
                            Minimum Investment:
                          </span>{" "}
                          ₦{investment?.minAmount?.toLocaleString() || "50M"}{" "}
                          {investment?.currency || "NGN"}
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <FaCheck className="h-5 w-3 mt-0.5 flex-shrink-0 text-[#0B0A0A]" />
                        <div className="text-sm font-medium text-[#0B0A0A]">
                          <span className="text-sm font-semibold">
                            Duration:
                          </span>{" "}
                          {investment?.duration || "12"} months
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <FaCheck className="h-5 w-3 mt-0.5 flex-shrink-0 text-[#0B0A0A]" />
                        <div className="text-sm font-medium text-[#0B0A0A]">
                          <span className="text-sm font-semibold">Status:</span>{" "}
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              investment?.status === "PUBLISHED"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {investment?.status || "DRAFT"}
                          </span>
                        </div>
                      </li>
                    </ul>

                    <div className="mt-6 flex gap-2">
                      <p className="font-medium text-sm text-[#0B0A0A]">
                        More benefits include:
                        <span className="text-[#116114] text-sm font-bold">
                          {" "}
                          Profit Sharing, Higher Potential Returns, Long-term
                          Growth, Portfolio Diversification, Real Estate
                          Exposure.
                        </span>
                      </p>
                    </div>

                    {/* Invest Now Button */}
                    <div className="mt-8">
                      <Button
                        onClick={() => {
                          setSelectedInvestment(investment);
                          setIsModalOpen(true);
                        }}
                        className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3"
                      >
                        Invest Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {investments.length > 1 && (
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 disabled:opacity-50"
              onClick={handleNext}
              disabled={current === investments.length - 1}
              aria-label="Next"
            >
              <FaChevronRight />
            </button>
          )}
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

      {/* Investment Details Modal */}
      <InvestmentDetailsModal
        investment={selectedInvestment}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedInvestment(null);
        }}
      />
    </div>
  );
}

export default TabTwo;
