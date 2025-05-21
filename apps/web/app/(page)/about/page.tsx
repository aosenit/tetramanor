import Footer from "@/components/home/Footer";
import HomeHero from "./components/Hero";
import Achievements from "./components/Achievements";
import TetramoreCode from "./components/TetramoreCode";
import WhyChooseTetramanor from "./components/WhyChooseTetramanor";
import TestimonialsSection from "./components/TestimonialSection";
import MeetTheTeam from "./components/MeetTheTeam";

const AboutPage = () => {
  return (
    <div className="bg-[#fafafa]">
      <HomeHero />
      <Achievements />
      <TetramoreCode />
      <WhyChooseTetramanor />
      <TestimonialsSection />
      <MeetTheTeam/>
      <Footer/>
    </div>
  );
};

export default AboutPage;
