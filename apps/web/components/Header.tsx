"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "../public/logo.svg";
import { IoIosArrowDown } from "react-icons/io";

const navItems = [
  { name: "Meet Tetramanor", href: "/" },
  { name: "What we do", href: "/about" },
  {
    name: "Our Portfolio",
    href: "/portfolio",
    icon: <IoIosArrowDown className="ml-1 text-white inline-block w-4 h-4" />,
  },
  { name: "Build wealth with us", href: "/services" },
  { name: "Our Journal", href: "/properties" },
  { name: "Want to talk", href: "/contact" },
];


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white sm:bg-white xl:bg-transparent fixed top-0 w-full z-50 ">
      <div className="container mx-auto px-4 lg:px-16 py-3">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              alt="logo"
              src={Logo}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-6">
          {navItems.map((item) => (
  <Link
    key={item.name}
    href={item.href}
    className={`text-sm lg:text-base font-medium transition-colors ${
      pathname === item.href
        ? "text-black lg:text-white"
        : "text-black hover:text-gray-800 lg:text-white lg:hover:text-gray-50"
    }`}
  >
    {item.name}
    {item.icon && item.icon}
  </Link>
))}

          </nav>

          {/* Desktop Auth Button */}
          <div className="hidden xl:flex">
            <Link
              href="/dashboard"
              className="px-6 py-2 text-black bg-white text-sm font-medium hover:bg-gray-100"
            >
              View Dashboard
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden inline-flex items-center justify-center p-2 rounded-md text-black hover:text-black focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="xl:hidden bg-white h-screen block mt-4 pb-4 space-y-6">
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg space-y-6 font-medium text-black"
                >
                  {pathname === item.href && (
                    <span className="inline-block mr-2 h-2 w-2 rounded-full bg-gray-600" />
                  )}
                  {item.name}
                </Link>
              ))}
              <Link
                href="/dashboard"
                className="px-4 py-4 w-full text-white bg-black border border-primary-500 rounded-xl text-sm font-medium hover:bg-gray-800 text-center"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
