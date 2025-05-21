"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import eleven from "../../../../public/about/eleven.png"
import twelve from "../../../../public/about/twelve.png"
import thirteen from "../../../../public/about/thirteen.png"
import fourteen from "../../../../public/about/fourteen.png"
import fifteen from "../../../../public/about/fifteen.png"
import sixteen from "../../../../public/about/sixteen.png"
import seventeen from "../../../../public/about/seventeen.png"
import eighteen from "../../../../public/about/eighteen.png"
import nineteen from "../../../../public/about/nineteen.png"
import twenty from "../../../../public/about/twenty.png"
import twoone from "../../../../public/about/twoone.png"
import twotwo from "../../../../public/about/twotwo.png"
import twothree from "../../../../public/about/twothree.png"

export default function MeetTheTeam() {
  const teams = [
    { id: 1, image: eleven, name: "John Beecroft", position: "MD" },
    { id: 2, image: twelve, name: "Chuka Atuchukwu", position: "Director/Accountant" },
    { id: 3, image: thirteen, name: "Olumide Obasemo", position: "Project Manager" },
    { id: 4, image: fourteen, name: "Jerry Onojemete", position: "Construction Engineer" },
    { id: 5, image: fifteen, name: "Stephen Nnenji", position: "Construction Engineer" },
    { id: 6, image: sixteen, name: "Jamiu Yakub", position: "Asst. Construction Engineer" },
    { id: 7, image: seventeen, name: "Tega Ezemiefe", position: "Senior Architect" },
    { id: 8, image: eighteen, name: "Ngozi Umeh", position: "Graphic Designer" },
    { id: 9, image: nineteen, name: "Samuel Johnson", position: "Digital Marketer" },
    { id: 10, image: twenty, name: "Kemi Adebayo", position: "Customer Relations Officer" },
    { id: 11, image: twoone, name: "Ibrahim Sulaimon", position: "Procurement Officer" },
    { id: 12, image: twotwo, name: "Blessing Eze", position: "Logistics Manager" },
    { id: 13, image: twothree, name: "David Obinna", position: "Electrical Engineer" },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(4)

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth
      if (width < 640) setVisibleCount(1)
      else if (width < 768) setVisibleCount(2)
      else if (width < 1024) setVisibleCount(3)
      else setVisibleCount(4)
    }

    updateVisibleCount()
    window.addEventListener("resize", updateVisibleCount)
    return () => window.removeEventListener("resize", updateVisibleCount)
  }, [])

  const handleNext = () => {
    if (currentIndex < teams.length - visibleCount) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  return (
    <section className="pl-4 md:pl-16 lg:pl-40 py-12 overflow-hidden">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h3 className="text-[#EB8A43] font-semibold text-sm mb-2">Meet The Team</h3>
          <h2 className="text-3xl text-[#000000] font-semibold">Tetramanor's Visionaries, Inventors, Builders.</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full border hover:bg-gray-100 transition-colors"
            aria-label="Previous"
            disabled={currentIndex === 0}
          >
            <BsArrowLeft />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full border hover:bg-gray-100 transition-colors"
            aria-label="Next"
            disabled={currentIndex >= teams.length - visibleCount}
          >
            <BsArrowRight />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(100 / visibleCount) * currentIndex}%)`,
            width: `${(teams.length * 100) / visibleCount}%`,
          }}
        >
          {teams.map((team) => (
            <div
              key={team.id}
              className="flex-shrink-0 pl-2"
            >
              <div className="mb-4">
                <Image
                  src={team.image}
                  alt={team.name}
                  width={200}
                  height={200}
                  className="object-cover "
                />
              </div>
              <h3 className="text-lg font-semibold  text-black">{team.name}</h3>
              <p className="text-sm text-gray-600 ">{team.position}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
