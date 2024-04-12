import HomeHeroSection from "@/container/home-container/hero-section";
import MedicalProfileSection from "@/container/my-cources-container/medical-profile";
import { FunctionComponent } from "react";

interface MedicalProps {}

const Medical: FunctionComponent<MedicalProps> = () => {
  return (
    <main>
      <HomeHeroSection />
      <MedicalProfileSection />
    </main>
  );
};

export default Medical;
