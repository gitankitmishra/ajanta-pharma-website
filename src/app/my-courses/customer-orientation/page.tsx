import HomeHeroSection from "@/container/home-container/hero-section";
import CustomerOrientationProfile from "@/container/my-cources-container/customer-orientation";
import { FunctionComponent } from "react";

interface CustomerOrientationProps {}

const CustomerOrientation: FunctionComponent<CustomerOrientationProps> = () => {
  return (
    <main>
      <HomeHeroSection />
      <CustomerOrientationProfile />
    </main>
  );
};

export default CustomerOrientation;
