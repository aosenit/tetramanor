import React from "react";
import Hero from "./components/Hero";
import Footer from "@/components/home/Footer";
import AppSideBar from "./components/AppSideBar";
import Blogs from "./components/Blogs";


function Page() {
  return (
    <div className="bg-[#fafafa]">
          <Hero />
          <div className="container mx-auto px-4 lg:px-16 py-12">
              <AppSideBar>
                  <Blogs slug={""}/>
              </AppSideBar>
          </div>
      <Footer />
    </div>
  );
}

export default Page;
