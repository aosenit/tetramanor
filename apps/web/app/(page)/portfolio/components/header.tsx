"use client";
import { Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";
import Image from "next/image";
import logo from "../../../../public/logo.svg";

const Header = ({
  featuresRef,
}: {
  featuresRef?: React.RefObject<HTMLElement>;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (featuresRef?.current) {
        const rect = featuresRef.current.getBoundingClientRect();
        setScrolled(rect.top <= 100);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [featuresRef]);
  const isLargeScreen =
    typeof window !== "undefined" && window.innerWidth >= 1024;
  const headerBg =
    isLargeScreen && scrolled
      ? "bg-black bg-opacity-90 shadow-lg backdrop-blur-md"
      : isLargeScreen
        ? "bg-white/60 backdrop-blur-md"
        : "bg-black bg-opacity-90";

  const handleNavClick = () => setIsMenuOpen(false);

  const textClass = isLargeScreen && scrolled ? "text-white" : "text-white";

  return (
    <header
      className={`sticky top-0 left-0 w-full z-20 transition-colors duration-500 lg:h-[100px]`}
    >
      <div className="container mx-auto flex items-center justify-between py-8 px-10">
        <div className="flex items-center">
          <Image src={logo} alt="TM Logo" className="h-10 w-auto" />
        </div>
        <button
          className={`lg:hidden ${textClass}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <nav
          className={`fixed top-0 right-0 h-full w-80 bg-black bg-opacity-90 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } lg:relative lg:transform-none lg:flex-1 lg:flex lg:justify-center lg:bg-transparent  lg:w-auto`}
        >
          <div className="flex justify-end p-4 lg:hidden">
            <button className="text-white" onClick={() => setIsMenuOpen(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <ul
            className={`flex flex-col justify-center lg:justify-start h-[80%] lg:h-auto lg:flex-row gap-8 items-center font-semibold ${textClass} text-lg lg:text-sm p-4 lg:p-0`}
          >
            <li onClick={handleNavClick}>Home</li>
            <li onClick={handleNavClick}>About us</li>
            <li onClick={handleNavClick}>Services</li>
            <li className="flex items-center gap-1" onClick={handleNavClick}>
              Properties
              <FaChevronDown className="w-4 h-4" />
            </li>
            <li onClick={handleNavClick}>Blogs</li>
            <li onClick={handleNavClick}>Contact us</li>
            <li className="lg:hidden" onClick={handleNavClick}>
              <Button
                size="sm"
                rounded="0"
                className={`bg-white ${textClass} font-semibold rounded px-8 py-3 shadow-none text-base hover:bg-gray-200 w-full btn-animate`}
              >
                View dashboard
              </Button>
            </li>
          </ul>
        </nav>
        {/* Button */}
        <div className="hidden lg:block">
          <Button
            size="sm"
            rounded="0"
            className={`bg-white ${textClass} font-semibold rounded px-8 py-3 shadow-none text-base hover:bg-gray-200 w-full lg:w-auto mt-4 lg:mt-0 hidden lg:block btn-animate`}
          >
            View dashboard
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
