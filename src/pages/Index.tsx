import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import FeaturedSkills from "@/components/FeaturedSkills";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <HowItWorks />
    <FeaturedSkills />
    <CTASection />
    <Footer />
  </div>
);

export default Index;
