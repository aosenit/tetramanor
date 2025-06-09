"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/home/logo.webp";
import Image from "next/image";

export default function AuthHeader({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isMobileMenuOpen: boolean) => void;
}) {
  const pathname = usePathname();

  // Array of navigation links, making it easy to add or remove items.
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Properties", href: "/rental" },
    { name: "Investments", href: "/investment" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact us", href: "/contact" },
  ];

  return (
    // Main navigation container with a sleek, modern design.
    <nav className="bg-white  font-sans sticky top-0 z-50 ">
      {" "}
      {/* Changed from rounded-b-xl */}
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo/Brand Section */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src={logo}
            alt="Tetramanor Logo"
            width={100}
            height={100}
            className="w-14 h-10 object-contain"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name} // Unique key for each mapped item
              href={link.href}
              // Apply active styling based on current route
              className={`text-md font-medium transition-colors duration-200 ease-in-out
                ${
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href))
                    ? "text-green-700 hover:text-green-800"
                    : "text-gray-600 hover:text-gray-800"
                }
                relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-green-700 after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300
              `}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Dashboard Button (Desktop) */}
        {/* Hidden on small screens, displayed on medium and larger screens */}
        <Link
          href="/login"
          className="hidden md:block bg-[var(--primary-green)] hover:bg-green-700 text-white px-5 py-2.5 rounded-sm text-sm font-semibold  transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          View Dashboard
        </Link>

        {/* Mobile Menu Button (Hamburger Icon) */}
        {/* Displayed on small screens, hidden on medium and larger screens */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} // Toggle mobile menu state
          className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
          aria-label="Toggle navigation"
        >
          {/* Hamburger icon SVG */}
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMobileMenuOpen ? (
              // Close icon (X) when menu is open
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            ) : (
              // Hamburger icon when menu is closed
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            )}
          </svg>
        </button>
      </div>
      {/* Mobile Navigation Menu */}
      {/* Conditionally rendered based on isMobileMenuOpen state */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white py-2 px-4 shadow-inner rounded-b-xl z-50 h-screen">
          <nav className="flex flex-col space-y-2 h-[80%] justify-between">
            <ul className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
                  className={`block px-3 py-2 rounded-lg text-lg font-medium transition-colors duration-200 ease-in-out
                  ${
                    pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(link.href))
                      ? "text-green-700 bg-green-50" // Active link style
                      : "text-gray-700 hover:bg-gray-50" // Inactive link style
                  }
                `}
                >
                  {link.name}
                </Link>
              ))}
            </ul>
            {/* Dashboard Button (Mobile) */}
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on button click
              className="mt-4 block w-full text-center bg-green-800 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl text-md font-semibold shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              View Dashboard
            </Link>
          </nav>
        </div>
      )}
    </nav>
  );
}
