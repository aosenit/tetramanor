import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="text-[#252525] bg-[#F6F6F6] pt-12">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between gap-12 px-4 pb-8">
        {/* Left */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="">
            <img src="./logo.svg" alt="TM Logo" className="h-10 w-auto mb-2" />
          </div>
          <div className="text-[#000000] mb-4">
            Your Trusted Real Estate Partner in Lagos
          </div>
          <form className="flex items-center gap-0 w-full max-w-md">
            <div className="flex items-center bg-white border border-[#383838] px-4 py-3 r w-full">
              <IoLocationOutline className="mr-2 text-lg text-[#383838]" />

              <input
                type="text"
                placeholder="Enter a location"
                className="bg-transparent outline-none text-[#383838] placeholder-[#383838] w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-[#116114] px-8 py-3  text-white font-semibold"
            >
              Search
            </button>
          </form>
        </div>
        {/* Links */}
        <div className="flex-1 flex flex-row justify-end gap-24 text-black">
          <div>
            <div className="text-[#737373] font-semibold mb-3">QUICK LINKS</div>
            <ul className="space-y-2">
              <li>About us</li>
              <li>Services</li>
              <li>Investment</li>
              <li>Blogs</li>
            </ul>
          </div>
          <div>
            <div className="text-[#737373] font-semibold mb-3">SUPPORT</div>
            <ul className="space-y-2">
              <li>Legal</li>
              <li>Privacy policy</li>
              <li>Terms of use</li>
            </ul>
          </div>
        </div>
      </div>
      <div className=" py-4">
        <div className="px-12 mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-black font-medium flex items-center gap-2">
            <span className="text-base">©</span> Tetramanor, 2025
          </div>
          <div className="flex gap-6 text-[#151515] text-xl">
            <FaFacebookF />
            <FaTwitter />
            <FaYoutube />
            <FaLinkedinIn />
          </div>
        </div>
      </div>
    </footer>
  );
}
