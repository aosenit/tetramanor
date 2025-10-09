"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How many rental properties are available in Lagos?",
    answer:
      "We have a curated selection of premium rental properties available across Lagos, with new listings added regularly. Our properties are located in prime areas including Lekki, Victoria Island, Ikoyi, and other sought-after neighborhoods.",
  },
  {
    question: "What types of properties can I rent?",
    answer:
      "We offer various property types including studio apartments, 1-bedroom, 2-bedroom, 3-bedroom, 4-bedroom, and 5+ bedroom apartments and houses. All properties are carefully selected to meet our high standards of quality and location.",
  },
  {
    question: "Are the properties furnished or unfurnished?",
    answer:
      "We offer both furnished and unfurnished options to suit your preferences. You can filter properties by furnishing status using our advanced search filters to find exactly what you need.",
  },
  {
    question: "What amenities are included?",
    answer:
      "Our properties feature various amenities including 24/7 power supply, swimming pools, gyms, security, parking, elevators, WiFi, air conditioning, and water supply. Specific amenities vary by property - check individual listings for details.",
  },
  {
    question: "How do I schedule a property viewing?",
    answer:
      "Click on 'View Details' on any property card to see full information and contact details. You can then reach out directly to schedule a viewing at your convenience.",
  },
  {
    question: "What are the typical rental payment terms?",
    answer:
      "Rental payment terms typically include annual rent, agency fee (usually 10%), legal fee (10%), and caution deposit (10%). Service charges may apply for serviced apartments. Specific terms are listed on each property.",
  },
];

export default function RentalFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Frequently Asked Questions
      </h2>
      <p className="text-gray-600 text-sm mb-6">
        Find answers to common questions about renting properties in Lagos
      </p>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-900 pr-4">
                {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-[#116114] flex-shrink-0 transition-transform duration-200 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

