"use client"

import { useState, useRef, useEffect } from "react"
import { FaStar } from "react-icons/fa"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(1) // Default for small screens
  const testimonialsRef = useRef<HTMLDivElement>(null)

  const testimonials = [
    {
      id: 1,
      rating: 5,
      text: "Great work in progress. Dedicated and trusted team, effective and efficient communication with prospective clients. Tetramanor, well done.",
      author: "Babatunde Andu",
    },
    {
      id: 2,
      rating: 5,
      text: "As always, TM never fails to astonish you with exquisite finishing yet again...love the sample 3BR Apartment.",
      author: "Atinuke Haroun",
    },
    {
      id: 3,
      rating: 5,
      text: "Great ambiance...coming back for more. The attention to detail is impeccable and the customer service is top-notch.",
      author: "Muyiwa Adedapo",
    },
    {
      id: 4,
      rating: 5,
      text: "Exceptional quality and professionalism. The team went above and beyond to meet our expectations.",
      author: "Chioma Okafor",
    },
    {
      id: 5,
      rating: 5,
      text: "Truly impressed with the level of craftsmanship. Would highly recommend to anyone looking for quality service.",
      author: "Oluwaseun Adeyemi",
    },
  ]

  const updateVisibleCount = () => {
    if (window.innerWidth >= 1024) {
      setVisibleCount(3)
    } else if (window.innerWidth >= 768) {
      setVisibleCount(2)
    } else {
      setVisibleCount(1)
    }
  }

  useEffect(() => {
    updateVisibleCount()
    window.addEventListener("resize", updateVisibleCount)
    return () => window.removeEventListener("resize", updateVisibleCount)
  }, [])

  const nextSlide = () => {
    if (currentIndex < testimonials.length - visibleCount) {
      setCurrentIndex((prevIndex) => prevIndex + 1)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1)
    }
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    if (testimonialsRef.current) {
      testimonialsRef.current.style.transform = `translateX(-${
        (currentIndex * 100) / visibleCount
      }%)`
    }
  }, [currentIndex, visibleCount])

  return (
    <section className="pl-4 md:pl-16 lg:pl-40 py-12">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h3 className="text-[#EB8A43] font-semibold text-sm mb-2">TESTIMONIALS</h3>
          <h2 className="text-3xl text-[#000000] font-semibold">What People are Saying About Us</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full border hover:bg-gray-100 transition-colors disabled:opacity-50"
            disabled={currentIndex === 0}
          >
            <BsArrowLeft />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full border hover:bg-gray-100 transition-colors disabled:opacity-50"
            disabled={currentIndex >= testimonials.length - visibleCount}
          >
            <BsArrowRight />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          ref={testimonialsRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            width: `${(testimonials.length * 100) / visibleCount}%`,
          }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="pl-2 w-full"
        
            >
              <div className="bg-[#f5f5f5] rounded-lg h-full">
                <div className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="bg-green-700 text-white p-0.5 mr-0.5">
                        <FaStar className="h-4 w-4" />
                      </div>
                    ))}
                  </div>
                  <p className="mb-8 text-[#202020] font-medium">{testimonial.text}</p>
                  <p className="font-semibold text-[#000000]">{testimonial.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
