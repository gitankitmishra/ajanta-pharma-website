import HomeHeroSection from "@/container/home-container/hero-section";
import OperationAnalyticsProfile from "@/container/my-cources-container/oea-profile";
import { FunctionComponent } from "react";

interface OpearationAnalyticsProps {}

const OpearationAnalytics: FunctionComponent<OpearationAnalyticsProps> = () => {
  return (
    <main>
      <HomeHeroSection />
      <OperationAnalyticsProfile />
    </main>
  );
};

export default OpearationAnalytics;
