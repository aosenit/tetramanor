"use client";
import Image from "next/image";
import ceo from "@/assets/ceo.jpg";
import finance from "@/assets/finance.jpg";
import director from "@/assets/director.jpg";

export default function MeetTheTeam() {
  const teams = [
    { id: 1, image: ceo, name: "John O. Beecroft", position: "Managing Director/CEO" },
    {
      id: 2,
      image: finance,
      name: "Chuka Atuchukwu",
      position: "Finance and Accounts Manager",
    },
    { id: 3, image: director, name: "Nnamdi Onwurah", position: "Director" },
  ];

  return (
    <section className="px-4 md:px-8 lg:px-16 xl:px-44 py-12">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div className="w-full md:w-auto">
          <h3 className="text-[#EB8A43] font-semibold text-sm mb-2">
            MEET THE TEAM
          </h3>
          <h2 className="text-2xl md:text-3xl text-black font-semibold">
            Tetramanor's Visionaries, Inventors, Builders.
          </h2>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:gap-8 gap-6 pb-6">
        {teams.map((team) => (
          <div key={team.id} className="w-full">
            <div className="overflow-hidden rounded-lg w-full h-auto">
              <Image
                src={team.image}
                alt={team.name}
                width={500}
                height={500}
                className="object-cover w-full h-auto rounded-lg"
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
  );
}
