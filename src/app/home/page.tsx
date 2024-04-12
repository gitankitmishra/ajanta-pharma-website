
import HomeAssignedCoursesSection from "@/container/home-container/assigned-courses-section";
import HomeContinueLearningSection from "@/container/home-container/continue-learning-section";
import HomeHeroSection from "@/container/home-container/hero-section";
import HomeProfileSection from "@/container/home-container/profile-section";
import { FunctionComponent } from "react";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <main  className="home-section-main-container">
      <HomeHeroSection />
      <HomeProfileSection />
      <HomeContinueLearningSection/>
      <HomeAssignedCoursesSection/>
    </main>
  );
};

export default Home;
