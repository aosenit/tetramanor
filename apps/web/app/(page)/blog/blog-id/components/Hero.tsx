"use client";
import Image from "next/image";
import { FiClock } from "react-icons/fi";
import { motion } from "framer-motion";
import { IoIosBriefcase } from "react-icons/io";
import { FaTag } from "react-icons/fa";
import Header from "@/components/Header";
import one from "@/assets/blog/one.webp";
import { useSearchParams } from "next/navigation";
import { useFetchData } from "@/hooks/useApi";

const staticBlog = {
  title: "Blog Title",
  date: "Feb 10, 2025",
  tag: "Main story",
  image: one,
};

const HeroSkeleton = () => (
  <section className="relative h-[60vh] overflow-hidden animate-pulse">
    <Header />
    <div className="absolute inset-0 w-full h-full bg-gray-200 z-0" />
    <div className="absolute inset-0 bg-black opacity-60 z-10" />
    <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-12 lg:px-20">
      <div className="h-12 w-2/3 bg-gray-300 rounded mb-6" />
      <div className="flex gap-6 mt-6">
        <div className="h-6 w-32 bg-gray-300 rounded" />
        <div className="h-6 w-32 bg-gray-300 rounded" />
        <div className="h-6 w-32 bg-gray-300 rounded" />
      </div>
    </div>
  </section>
);

const HomeHero = () => {
  const searchParams = useSearchParams();
  const blogId = searchParams.get("slug");
  const { data, isLoading } = useFetchData(blogId ? `blogs/${blogId}` : null);
  let blog = staticBlog;

  if (data?.data) {
    blog = {
      title: data.data.title,
      date: new Date(data.data.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      tag: data.data.tag || "Blog",
      image:
        data.data.coverImage?.imageUrl ||
        data.data.images?.[0]?.imageUrl ||
        one,
    };
  }

  return isLoading ? (
    <HeroSkeleton />
  ) : (
    <section className="relative h-[60vh] overflow-hidden">
      <Header />
      <Image
        src={blog.image}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        fill
        priority
      />
      <div className="absolute inset-0 bg-black opacity-60 z-10" />
      <div className="absolute inset-0 z-20  flex flex-col justify-center px-6 md:px-12 lg:px-20">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-white text-3xl container mx-auto px-4 lg:px-14  md:text-4xl lg:text-6xl font-extrabold leading-tight mb-6"
        >
          {blog.title}
        </motion.h1>
        <div className="flex container mx-auto px-4 lg:px-14  flex-wrap gap-6 mt-6 items-center text-white text-sm">
          <p className="flex items-center gap-2">
            <IoIosBriefcase className="text-white" />
            <strong>Published:</strong> {blog.date}
          </p>
          <p className="flex items-center gap-2">
            <FaTag className="text-white" />
            <strong>Category:</strong> {blog.tag}
          </p>
          <p className="flex items-center gap-2">
            <FiClock className="text-white" />
            <strong>Read Time:</strong> 5 min
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
