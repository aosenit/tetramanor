import React from "react";
import Footer from "@/components/home/Footer";
import AppSideBar from "../components/AppSideBar";
import Hero from "./components/Hero";
import SingleBlog from "./components/BlogPage";


function Page() {
  return (
    <div className="bg-[#fafafa]">
          <Hero />
          <div className="container mx-auto px-4 lg:px-16 py-12">
              <AppSideBar>
          <SingleBlog/>
              </AppSideBar>
          </div>
      <Footer />
    </div>
  );
}

export default Page;
