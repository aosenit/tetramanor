import React from "react";
import Image from "next/image";
import logo from "../../public/logo.svg";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="bg-[#252525] text-white pt-12">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between gap-12 px-4 pb-8">
        {/* Left */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="">
            <Image src={logo} alt="TM Logo" className="h-10 w-auto mb-2" />
          </div>
          <div className="text-gray-300 mb-4">
            Your Trusted Real Estate Partner in Lagos
          </div>
          <form className="flex items-center gap-0 w-full max-w-md">
            <div className="flex items-center bg-[#484848] px-4 py-3 r w-full">
              <IoLocationOutline className="mr-2 text-lg text-[#FFFFFF]" />

              <input
                type="text"
                placeholder="Enter a location"
                className="bg-transparent outline-none text-white placeholder-white w-full"
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
        <div className="flex-1 flex flex-row justify-end gap-24">
          <div>
            <div className="text-gray-400 font-semibold mb-3">QUICK LINKS</div>
            <ul className="space-y-2">
              <li>About us</li>
              <li>Services</li>
              <li>Investment</li>
              <li>Blogs</li>
            </ul>
          </div>
          <div>
            <div className="text-gray-400 font-semibold mb-3">SUPPORT</div>
            <ul className="space-y-2">
              <li>Legal</li>
              <li>Privacy policy</li>
              <li>Terms of use</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-[#2E2E2E] border-t border-[#2d2d2d] py-4">
        <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row justify-between items-center px-4 gap-4">
          <div className="text-gray-400 flex items-center gap-2">
            <span className="text-lg">©</span> Tetramanor, 2025
          </div>
          <div className="flex gap-6 text-white text-xl">
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
