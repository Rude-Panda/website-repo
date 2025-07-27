import { HeroSection } from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ModelsSupported from "@/components/ModelsSupported";
import PricingSection from "@/components/Pricing";


export default function Home() {
  return (
    <div
      style={{
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth'
      }}
    >
      <HeroSection />
      <FeaturesSection /> 
      <ModelsSupported /> 
      <PricingSection />
    </div>
  );
}
