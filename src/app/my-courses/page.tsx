import CoursesCards from "@/components/cards/courses-card";
import HomeHeroSection from "@/container/home-container/hero-section";
import MyCoursesCardSection from "@/container/my-cources-container/card-section";
import CompetencyBasedSkill from "@/public/images/competency-based-skill.svg";
import { FC } from "react";

interface MyCoursesProps {}

const MyCourses: FC<MyCoursesProps> = () => {
  return (
    <main>
      <HomeHeroSection />
      <MyCoursesCardSection />
    </main>
  );
};

export default MyCourses;
