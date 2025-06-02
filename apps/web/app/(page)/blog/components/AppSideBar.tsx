"use client";
import React, { ReactNode } from "react";
import Image, { StaticImageData } from "next/image";
import a from "@/assets/blog/a.webp"
import b from "@/assets/blog/b.webp"
import c from "@/assets/blog/c.webp"
import d from "@/assets/blog/d.webp"
import e from "@/assets/blog/e.webp"
interface SidebarItem {
  id: number;
  image: StaticImageData;
  link: string;
  description: string;
}

interface Props {
  children?: ReactNode;
}

const sidebarItems: SidebarItem[] = [
  {
    id: 1,
    image: a,
    link: "/blog/featured",
    description:
      "Tetramanor's Strategic Approach to Real Estate Investment in Nigeria",
  },
  {
    id: 2,
    image: b,
    link: "/blog/latest",
    description:
      "Tetramanor's Strategic Approach to Real Estate Investment in Nigeria",
  },
  {
    id: 3,
    image: c,
    link: "/blog/latest",
    description:
      "Tetramanor's Strategic Approach to Real Estate Investment in Nigeria",
  },
  {
    id: 4,
    image: d,
    link: "/blog/latest",
    description:
      "Tetramanor's Strategic Approach to Real Estate Investment in Nigeria",
  },
  {
    id: 5,
    image: e,
    link: "/blog/latest",
    description:
      "Tetramanor's Strategic Approach to Real Estate Investment in Nigeria",
  },
];

const AppSideBar: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-12">
      <main className="flex-1">{children}</main>
      <aside className="lg:w-1/3 space-y-4">
        <h1 className="text-xl font-semibold mb-4">Featured Post</h1>
        {sidebarItems.map((item) => (
          <a
            key={item.id}
            href={item.link}
            className="flex gap-4 max-w-md items-start p-3 bg-[#f3f5f3] rounded-md shadow-sm hover:bg-gray-200 transition"
          >
            <div className="relative w-[100px] h-[60px] flex-shrink-0">
              <Image
                src={item.image}
                alt={`Image for ${item.description}`}
                fill
                className="rounded-md object-cover"
                sizes="80px"
              />
            </div>
            <p className="text-sm text-gray-600 flex-1">{item.description}</p>
          </a>
        ))}
      </aside>
    </div>
  );
};

export default AppSideBar;
