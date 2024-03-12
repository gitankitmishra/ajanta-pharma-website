
import HomeHeroSection from "@/container/home-container/hero-section";
import HomeProfileSection from "@/container/home-container/profile-section";
import { FunctionComponent } from "react";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <section  className="home-section-main-container">
      <HomeHeroSection />
      <HomeProfileSection />
    </section>
  );
};

export default Home;
