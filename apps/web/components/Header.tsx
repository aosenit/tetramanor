"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
import logo from "@/assets/home/logo.webp";
import { X, Menu } from "lucide-react";

const navItems = [
  {
    name: "Solutions",
    href: "/",
    icon: <IoIosArrowDown className="ml-1 mt-1 inline-block w-4 h-4" />,
  },
  { name: "Buy a home", href: "/portfolio" },
  { name: "Apartment rentals", href: "/rental" },
  { name: "Build wealth with us", href: "/investment" },
  { name: "Our Journal", href: "/blog" },
  { name: "Want to talk?", href: "/contact" },
];

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = `text-sm lg:text-base font-medium transition-colors ${
    isScrolled
      ? "text-black hover:text-gray-800"
      : "text-white hover:text-gray-50"
  }`;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-300  ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-16 py-3">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src={logo} alt="Tetramanor Logo" width={80} height={20} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-6">
            {navItems.map((item) =>
              item.name === "Solutions" ? (
                <div
                  key={item.name}
                  className="relative"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <button className={`flex items-center ${navLinkClass}`}>
                    {item.name}
                    {item.icon}
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-44 p-2 bg-white rounded shadow-lg z-50">
                      <Link
                        href="/about"
                        className="block px-4 py-2 text-black hover:bg-[#116114] hover:text-white"
                      >
                        Meet Tetramanor
                      </Link>
                      <Link
                        href="/services"
                        className="block px-4 py-2 text-black hover:bg-[#116114] hover:text-white"
                      >
                        What We Do
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link key={item.name} href={item.href} className={navLinkClass}>
                  {item.name}
                </Link>
              )
            )}
          </nav>

          {/* Desktop Auth Button */}
          <div className="hidden xl:flex">
            <Link
              href="/dashboard"
              className={`px-6 py-2 text-sm font-medium rounded ${
                isScrolled
                  ? "bg-[#116114] text-white hover:bg-green-700"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              View Dashboard
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden inline-flex items-center justify-center p-2 rounded-md text-black hover:text-black focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className={`size-8 text-[var(--primary-green)]`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="xl:hidden bg-white h-screen block  pb-4 space-y-6 fixed top-0 left-0 w-full z-50 p-5">
            <div className="flex flex-col space-y-4 py-10 gap-5 justify-between h-full">
              <X
                className="size-8 text-red-500 fixed top-5 right-5"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
              <div className="flex flex-col gap-8">
                {navItems.map((item) =>
                  item.name === "Solutions" ? (
                    <div key={item.name}>
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center text-lg font-medium text-black"
                      >
                        {item.name}
                        <IoIosArrowDown
                          className={`ml-1 mt-1 w-4 h-4 transition-transform ${
                            isDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isDropdownOpen && (
                        <div className="ml-4 mt-2 space-y-2">
                          <Link
                            href="/about"
                            className="block text-base text-black hover:text-green-800"
                          >
                            Meet Tetramanor
                          </Link>
                          <Link
                            href="/services"
                            className="block text-base text-black hover:text-green-800"
                          >
                            What We Do
                          </Link>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium text-black"
                    >
                      {pathname === item.href && (
                        <span className="inline-block mr-2 h-2 w-2 rounded-full bg-gray-600" />
                      )}
                      {item.name}
                    </Link>
                  )
                )}
              </div>
              <Link
                href="/dashboard"
                className="px-4 py-4 w-full text-white bg-green-600 border border-primary-500 rounded-xl  font-medium hover:bg-green-700 text-center"
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
