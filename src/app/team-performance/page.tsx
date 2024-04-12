import HomeHeroSection from "@/container/home-container/hero-section";
import TeamPerformanceProfileContainer from "@/container/team-performance-container/team-performace-profile";
import { FunctionComponent } from "react";

interface TeamPerformanceProps {}

const TeamPerformance: FunctionComponent<TeamPerformanceProps> = () => {
  return (
    <main>
      <HomeHeroSection />
      <TeamPerformanceProfileContainer/>
    </main>
  );
};

export default TeamPerformance;
