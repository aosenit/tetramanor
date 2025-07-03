"use client";
import Image from "next/image";
import a from "@/assets/about/a.webp";
import b from "@/assets/about/b.webp";
import f from "@/assets/about/f.webp";

export default function MeetTheTeam() {
  const teams = [
    { id: 1, image: a, name: "John Beecroft", position: "MD" },
    {
      id: 2,
      image: b,
      name: "Chuka Atuchukwu",
      position: "Director/Accountant",
    },
    { id: 3, image: f, name: "Olumide Obasemo", position: "Project Manager" },
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
