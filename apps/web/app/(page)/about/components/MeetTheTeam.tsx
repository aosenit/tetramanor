"use client";
import Image from "next/image";
import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import a from "@/assets/about/a.webp"
import b from "@/assets/about/b.webp"
import d from "@/assets/about/d.webp"
import e from "@/assets/about/e.webp"
import f from "@/assets/about/f.webp"
import g from "@/assets/about/g.webp"
import h from "@/assets/about/h.webp"
import i from "@/assets/about/i.webp"
import k from "@/assets/about/k.webp"
import l from "@/assets/about/l.webp"
import m from "@/assets/about/m.webp"
import n from "@/assets/about/n.webp"
import o from "@/assets/about/o.webp"

export default function MeetTheTeam() {
  const teams = [
    {
      id: 1,
      image: a,
      name: "John Beecroft",
      position: "MD",
    },
    {
      id: 2,
      image: b,
      name: "Chuka Atuchukwu",
      position: "Director/Accountant",
    },
    {
      id: 3,
      image: f,
      name: "Olumide Obasemo",
      position: "Project Manager",
    },
    {
      id: 4,
      image: d,
      name: "Jerry Onojemete",
      position: "Construction Engineer",
    },
    {
      id: 5,
      image: e,
      name: "Stephen Nnenji",
      position: "Construction Engineer",
    },
    {
      id: 6,
      image: f,
      name: "Jamiu Yakub",
      position: "Asst. Construction Engineer",
    },
    {
      id: 7,
      image: g,
      name: "Tega Ezemiefe",
      position: "Senior Architect",
    },
    {
      id: 8,
      image: h,
      name: "Lydia Oluwapelumi",
      position: "Intern Construction Engineer",
    },
    {
      id: 9,
      image: i,
      name: "Peter Okenla",
      position: "Site Security Officer",
    },
    {
      id: 10,
      image: i,
      name: "Judith obiekezie ",
      position: "Client Service Officer",
    },
    {
      id: 11,
      image: k,
      name: "Ugonna Nwafulume",
      position: "Graphics Artist ",
    },
    {
      id: 12,
      image: l,
      name: "Seun Oni",
      position: "Digital Marketing strategist",
    },
    {
      id: 13,
      image: m,
      name: "Sunday Chukwunalu",
      position: "Maintenance Officer",
    },
    {
      id: 14,
      image: n,
      name: "Peter Blessing",
      position: "Administrative Officer",
    },
    {
      id: 15,
      image: o,
      name: "Jamiu Adeyemi",
      position: "Driver",
    },
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
    <>
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <section className="px-4  md:pl-8 lg:pl-16 xl:pl-44 py-12 overflow-hidden">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div className="w-full md:w-auto">
            <h3 className="text-[#EB8A43] font-semibold text-sm mb-2">
              MEET THE TEAM
            </h3>
            <h2 className="text-2xl md:text-3xl text-[#000000] font-semibold">
              Tetramanor's Visionaries, Inventors, Builders.
            </h2>
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

        <div className="flex overflow-x-auto pb-6 -mx-4 md:mx-0 no-scrollbar">
          {visibleTeams.map((team) => (
            <div key={team.id} className="flex-none px-4 w-[280px] md:w-[300px]">
              <div className="aspect-square relative overflow-hidden rounded-lg">
                <Image
                  src={team.image}
                  alt={team.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 280px, 300px"
                />
              </div>
              <h3 className="text-lg font-semibold text-black mt-4">
                {team.name}
              </h3>
              <p className="text-sm text-gray-600">{team.position}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
