import HomeHeroSection from "@/container/home-container/hero-section";
import ClassroomTrainingProfileSection from "@/container/my-cources-container/classroom-training-profile";
import { FunctionComponent } from "react";

interface ClassroomTrainingProps {}

const ClassroomTraining: FunctionComponent<ClassroomTrainingProps> = () => {
  return (
    <main>
      <HomeHeroSection />
      <ClassroomTrainingProfileSection />
    </main>
  );
};

export default ClassroomTraining;
