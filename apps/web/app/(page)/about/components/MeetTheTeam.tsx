"use client"
import Image from "next/image"
import { useState } from "react"
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
    { id: 8, image: eighteen, name: "Lydia Oluwapelumi", position: "Intern Construction Engineer" },
    { id: 9, image: nineteen, name: "Peter Okenla", position: "Site Security Officer" },
    { id: 10, image: twenty, name: "Judith obiekezie ", position: "Client Service Officer" },
    { id: 11, image: twoone, name: "Ugonna Nwafulume", position: "Graphics Artist " },
    { id: 12, image: twotwo, name: "Seun Oni", position: "Digital Marketing strategist" },
    { id: 13, image: twothree, name: "Sunday Chukwunalu", position: "Maintenance Officer" },
    { id: 14, image: fourteen, name: "Peter Blessing", position: "Administrative Officer" },
    { id: 15, image: eighteen, name: "Jamiu Adeyemi", position: "Driver" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 6;
  const maxIndex = Math.max(teams.length - visibleCount, 0);

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const visibleTeams = teams.slice(currentIndex, currentIndex + visibleCount);

  return (
    <section className="pl-4 md:pl-16 lg:pl-44 py-12 overflow-hidden">
    <div className="flex justify-between items-center mb-8 flex-wrap">
      <div>
        <h3 className="text-[#EB8A43] font-semibold text-sm mb-2">MEET THE TEAM</h3>
        <h2 className="text-3xl text-[#000000] font-semibold">Tetramanor's Visionaries, Inventors, Builders.</h2>
      </div>
      <div className="flex">
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
          className="p-2 rounded-full border hover:bg-gray-100 transition-colors ml-2"
          aria-label="Next"
          disabled={currentIndex === maxIndex}
        >
          <BsArrowRight />
        </button>
      </div>
    </div>
  
    <div className="flex overflow-x-auto">
      {visibleTeams.map((team) => (
        <div key={team.id} className="mr-6 last:mr-0"> {/* Only right margin for spacing */}
          <Image
            src={team.image}
            alt={team.name}
            width={200}
            height={200}
            className="object-cover"
          />
          <h3 className="text-lg font-semibold text-black mt-2">{team.name}</h3>
          <p className="text-sm text-gray-600">{team.position}</p>
        </div>
      ))}
    </div>
  </section>
  
  );
}
