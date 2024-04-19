import HomeHeroSection from "@/container/home-container/hero-section";
import BussinessOrientationProfile from "@/container/my-cources-container/bussiness-orientation-profile-container";
import { FunctionComponent } from "react";

interface BussinessOrientationProps {}

const BussinessOrientation: FunctionComponent<
  BussinessOrientationProps
> = () => {
  return <main>
    <HomeHeroSection/>
    <BussinessOrientationProfile/>
  </main>;
};

export default BussinessOrientation;
