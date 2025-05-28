"use client";
import Image from 'next/image'
import React, { useState } from 'react'
import house from '../../../../public/about/house.png'
import book from '../../../../public/about/book.png'
import forex from '../../../../public/about/forex.png'

const cardData = [
    {
      icon: house,
      title: 'Strategic Locations',
      description:
        'Our properties are situated in fully developed, high-demand areas, ensuring seamless access to essential infrastructure like roads, power, and water.',
    },
    {
      icon: book,
      title: 'Quality & Affordability',
      description:
        'We strike the perfect balance between premium craftsmanship and cost efficiency, making luxury living accessible without compromise.',
    },
    {
      icon: forex,
      title: 'Client-Centric Approach',
      description:
        'Your needs come first. From development to handover, we prioritize customer satisfaction, ensuring a seamless and rewarding experience',
    },
  ];

function WhyChooseTetramanor() {
    const [activeIndex, setActiveIndex] = useState(0);
  return (
      <div className='bg-[#f3f7f3]'>
          <div className='container mx-auto px-4 md:px-8 lg:px-16 py-12'>
              <div className='space-y-2 text-center max-w-2xl mx-auto'>
                  <h3 className='text-3xl font-semibold text-black'>Why Choose Tetramanor?</h3>
                  <p className='mt-4 text-gray-700 text-sm'>
                  With over 12 years of excellence, a combined team experience of 80+ years, and over ₦11 billion in sales, Tetramanor stands as a trusted leader in Nigeria’s real estate market. Our commitment to quality, integrity, and customer satisfaction sets us apart.
                  </p>
              </div> 
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="text-center flex flex-col justify-center max-w-sm mx-auto"
        >
          <Image className=' mx-auto' src={card.icon} alt="icon" width={40} height={40} />
          <h4 className="mt-4 text-black text-lg font-semibold">
            {card.title}
          </h4>
          <p className="mt-2 text-sm text-gray-700">{card.description}</p>
        </div>
      ))}
    </div>
      <div className="flex justify-center gap-2 mt-10">
        {cardData.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-1 w-6 rounded-sm ${
              index === activeIndex ? 'bg-black' : 'bg-gray-400'
            }`}
          ></button>
        ))}
      </div>
          </div>
    </div>
  )
}

export default WhyChooseTetramanor