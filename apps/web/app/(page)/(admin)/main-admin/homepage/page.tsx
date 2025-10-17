import Header from "./components/header";
import QuickActions from "./components/QuickActions";
import FeaturedProperty from "./components/FeaturedProperty";
import CapitalAppreciation from "./components/CapitalAppreciation";
import { Suspense } from "react";
import Loader from "@/components/Loader";

export default function HomepagePage() {
  return (
    <Suspense fallback={<Loader />}>
      <div className="space-y-4 pb-28">
        <div className="text-lg md:text-xl  font-medium text-[#858C95]">
          Admin /{" "}
          <span className="text-[#116114] text-lg md:text-xl font-medium">
            Homepage management
          </span>
        </div>
        <div className="bg-white p-1"></div>
        <Header />
        <QuickActions />
        <CapitalAppreciation />
        <FeaturedProperty />
      </div>
    </Suspense>
  );
}
