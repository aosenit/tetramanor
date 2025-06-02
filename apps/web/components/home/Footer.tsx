import React from "react";
import Image from "next/image";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import Link from "next/link";
import logo from "@/assets/home/logo.webp";

export default function Footer() {
  return (
    <footer className="bg-[#252525] text-white pt-12">
      {/* ------------ Top section ------------ */}
      <div className="container mx-auto px-4 lg:px-16 ">
        <div className="flex flex-col md:flex-row gap-4 justify-between pb-10">
          {/* Brand + search */}
          <div className=" space-y-4">
            <Link href="/">
              <Image src={logo} alt="Logo" width={60} height={20} />
            </Link>

            <p className="text-gray-300 max-w-md">
              Your Trusted Real Estate Partner in Lagos
            </p>
            <form className="flex flex-col sm:flex-row w-full max-w-md">
              <label className="flex flex-1 items-center bg-[#484848] px-4 py-3 sm:rounded-l-md">
                <IoLocationOutline className="mr-2 text-lg text-white shrink-0" />
                <input
                  type="text"
                  placeholder="Enter a location"
                  className="w-full bg-transparent placeholder-white outline-none text-sm"
                />
              </label>
              <button
                type="submit"
                className="bg-[#116114] px-8 py-3 text-sm font-semibold sm:rounded-r-md mt-3 sm:mt-0"
              >
                Search
              </button>
            </form>
          </div>
          <div className="">
            <div className="grid grid-cols-2 gap-14">
              <div>
                <h4 className="text-gray-400 font-semibold mb-3">
                  QUICK LINKS
                </h4>
                <ul className="space-y-2 text-white ">
                  <Link href="/about">
                    <li>About us</li>
                  </Link>
                  <Link href="/services">
                    <li>Services</li>
                  </Link>
                  <Link href="/investment">
                    <li>Investment</li>
                  </Link>
                  <Link href="/blog">
                    <li>Blogs</li>
                  </Link>
                </ul>
              </div>

              <div>
                <h4 className="text-gray-400 font-semibold mb-3">SUPPORT</h4>
                <ul className="space-y-2 text-sm">
                  <li className="hover:text-gray-300 cursor-pointer">Legal</li>
                  <li className="hover:text-gray-300 cursor-pointer">
                    Privacy policy
                  </li>
                  <li className="hover:text-gray-300 cursor-pointer">
                    Terms of use
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------ Bottom bar ------------ */}
      <div className="bg-[#2E2E2E] border-t border-[#2D2D2D] py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-16">
          <span className="text-gray-400 text-sm">© Tetramanor, 2025</span>

          <div className="flex gap-6 text-xl">
            <a aria-label="Facebook" className="hover:text-gray-300" href="#">
              <FaFacebookF />
            </a>
            <a aria-label="Twitter" className="hover:text-gray-300" href="#">
              <FaTwitter />
            </a>
            <a aria-label="YouTube" className="hover:text-gray-300" href="#">
              <FaYoutube />
            </a>
            <a aria-label="LinkedIn" className="hover:text-gray-300" href="#">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
