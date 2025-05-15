"use client";

import BuildWealth from "@/components/home/BuildWealth";
import ConstructionPartners from "@/components/home/ConstructionPartners";
import FindNextHome from "@/components/home/FindNextHome";
import Footer from "@/components/home/Footer";
import HomeFeaturedProperty from "@/components/home/HomeFeaturedProperty";
import HomeHero from "@/components/home/HomeHero";
import HomeKeyFeatures from "@/components/home/HomeKeyFeatures";
import OngoingCampaigns from "@/components/home/OngoingCampaigns";
import TetraOneWebApp from "@/components/home/TetraOneWebApp";
export default function Home() {
  return (
    <main className="bg-background min-h-screen font-sans text-gray">
      <HomeHero />

      <HomeKeyFeatures />

      <HomeFeaturedProperty />

      <FindNextHome />

      <ConstructionPartners />

      <BuildWealth />

      <OngoingCampaigns />

      <TetraOneWebApp />

      <Footer />
    </main>
  );
}
