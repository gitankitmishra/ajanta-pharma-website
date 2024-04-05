import HomeHeroSection from "@/container/home-container/hero-section";
import MarketingProfileSection from "@/container/my-cources-container/marketing-profile";
import { FunctionComponent } from "react";

interface MarketingProps {}

const Marketing: FunctionComponent<MarketingProps> = () => {
  return (
    <main>
      <HomeHeroSection />
      <MarketingProfileSection />
    </main>
  );
};

export default Marketing;
