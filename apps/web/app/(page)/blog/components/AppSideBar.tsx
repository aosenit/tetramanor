"use client";
import React, { ReactNode } from "react";
import Image from "next/image";

interface SidebarItem {
  id: number;
  image: string;
  link: string;
  description: string;
}

interface Props {
  children?: ReactNode;
}

const sidebarItems: SidebarItem[] = [
  {
    id: 1,
    image: "/blog/first.png",
    link: "/blog/featured",
    description:
      "Tetramanor's Strategic Approach to Real Estate Investment in Nigeria",
  },
  {
    id: 2,
    image: "/blog/second.png",
    link: "/blog/latest",
    description:
      "Tetramanor's Strategic Approach to Real Estate Investment in Nigeria",
  },
  {
    id: 3,
    image: "/blog/third.png",
    link: "/blog/latest",
    description:
      "Tetramanor's Strategic Approach to Real Estate Investment in Nigeria",
  },
  {
    id: 4,
    image: "/blog/four.png",
    link: "/blog/latest",
    description:
      "Tetramanor's Strategic Approach to Real Estate Investment in Nigeria",
  },
  {
    id: 5,
    image: "/blog/five.png",
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
            <Image
              src={item.image}
              alt={`Image for ${item.description}`}
              width={80}
              height={80}
              className="rounded-md object-cover"
            />
            <p className="text-sm text-gray-600">{item.description}</p>
          </a>
        ))}
      </aside>
    </div>
  );
};

export default AppSideBar;
