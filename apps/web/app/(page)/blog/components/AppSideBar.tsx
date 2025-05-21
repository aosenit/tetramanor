import React, { ReactNode } from 'react';
import Image, { StaticImageData } from 'next/image';
import one from '../../../../public/blog/first.png';
import two from '../../../../public/blog/second.png';
import three from '../../../../public/blog/third.png';
import four from '../../../../public/blog/four.png';
import five from '../../../../public/blog/five.png';

interface SidebarItem {
  id: number;
  image: StaticImageData;
  link: string;
  description: string;
}

interface Props {
  children?: ReactNode;
}

const sidebar: SidebarItem[] = [
  {
    id: 1,
    image: one,
    link: "/blog/featured",
    description: "lorem ipsum dolor sit amet consectetur adipiscing elit. Curabitur nec odio vel dui euismod fermentum."
  },
  {
    id: 2,
    image: two,
    link: "/blog/latest",
    description: "lorem ipsum dolor sit amet consectetur adipiscing elit. Curabitur nec odio vel dui euismod fermentum."
  },
  {
    id: 3,
    image: three,
    link: "/blog/latest",
    description: "lorem ipsum dolor sit amet consectetur adipiscing elit. Curabitur nec odio vel dui euismod fermentum."
  },
  {
    id: 4,
    image: four,
    link: "/blog/latest",
    description: "lorem ipsum dolor sit amet consectetur adipiscing elit. Curabitur nec odio vel dui euismod fermentum."
  },
  {
    id: 5,
    image: five,
    link: "/blog/latest",
    description: "lorem ipsum dolor sit amet consectetur adipiscing elit. Curabitur nec odio vel dui euismod fermentum."
  },
];

const AppSideBar: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-12">
      <main className="flex-1">
        {children}
      </main>
      <aside className="lg:w-1/3 space-y-4">
        <h1 className="text-xl font-semibold mb-4">Featured Post</h1>
        {sidebar.map((item) => (
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
