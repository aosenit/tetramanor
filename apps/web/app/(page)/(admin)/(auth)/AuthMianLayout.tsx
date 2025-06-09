"use client";

import AuthHeader from "./AuthHeader";
import { useState } from "react";
import Image from "next/image";
import authBg from "@/assets/portfolio/two.webp";

const AuthMianLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="border-b">
        <AuthHeader
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      </header>

      {isMobileMenuOpen ? (
        <></>
      ) : (
        <main className="flex-1 flex p-2">
          <div className="w-full md:w-1/2 p-4 md:p-12 flex flex-col justify-center">
            <div className="w-full lg:w-[400px] mx-auto">{children}</div>
          </div>
          <div className="hidden md:block md:w-1/2 relative rounded-md ">
            <Image
              src={authBg}
              alt="Property building"
              fill
              className="object-cover rounded-md"
              priority
            />
          </div>
        </main>
      )}
    </>
  );
};

export default AuthMianLayout;
