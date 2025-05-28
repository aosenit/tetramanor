import React from 'react';
import Image from 'next/image';
import { IoIosBriefcase } from 'react-icons/io';
import { FaTag } from 'react-icons/fa';
import queenmary from '../../../../public/portfolio/queenmary.png';
import benefit from '../../../../public/blog/benefit.png';
import maryland from '../../../../public/blog/maryland.png';
import facts from '../../../../public/blog/facts.png';
import Pagination from './Pagination';
import Link from 'next/link';
interface PropertyCardProps {
  slug: string;
}

const blogPosts = [
  {
    id: 1,
    slug: "blog-1",
    title: "Blog Title",
    description: "Lorem ipsum dolor sit amet consectetur. Dictum consectetur nulla duis sed sed augue pulvinar...",
    image: queenmary,
    date: 'Feb 10, 2025',
    tag: 'Main story'
  },
  {
    id: 2,
    slug: "blog-2",
    title: "Blog Title",
    description: "Egestas facilisi elit pellentesque porttitor euismod. Amet scelerisque velit lectus a sed malesuada amet...",
    image: benefit,
    date: 'Feb 12, 2025',
    tag: 'Fashion'
  },
  {
    id: 3,
    slug: "blog-3",
    title: "Blog Title",
    description: "Aliquam facilisi feugiat ut dictum vivamus gravida. Placerat a posuere curabitur platea et sed eget...",
    image: facts,
    date: 'Feb 15, 2025',
    tag: 'Events'
  },
  {
    id: 4,
    slug: "blog-4",
    title: "Blog Title",
    description: "Nisl iaculis sit imperdiet quis fringilla. Amet scelerisque velit lectus a sed malesuada amet...",
    image: maryland,
    date: 'Feb 20, 2025',
    tag: 'History'
  }
];
const Blogs: React.FC<PropertyCardProps> = ({
  slug
}) => {
  return (
    <div>
    <div className='space-y-10'>
      {blogPosts.map((post) => (
        <div key={post.id} className='h-full overflow-y-auto  rounded-md'>
          <Image src={post.image} alt={post.title} className='w-full object-cover' />
          <div className='space-y-4 p-4 bg-[#f1f4f1]'>
            <h5 className='text-xl font-semibold'>{post.title}</h5>
            <p className='text-black text-justify leading-relaxed'>{post.description}</p>
            <div className='flex justify-between items-center'>
              <Link
                href={{
                  pathname: "blog/blog-id",
                  query: { slug },
          }}
                className='px-6 py-2 bg-[#116114] text-sm text-white'>Continue Reading</Link>
              <div className='flex gap-6'>
                <p className='text-sm text-black flex items-center gap-2'>
                  <IoIosBriefcase className='text-[#eb8a43]' />{post.date}
                </p>
                <p className='text-sm text-black flex items-center gap-2'>
                  <FaTag className='text-[#eb8a43]' />{post.tag}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
      <div className='flex justify-between items-center mt-10 max-w-md mx-auto'>
     <Pagination/>
      </div>
    </div>
  );
}

export default Blogs
