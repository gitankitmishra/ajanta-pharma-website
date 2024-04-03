import HomeHeroSection from "@/container/home-container/hero-section";
import CompetencyBasedSkillsProfile from "@/container/my-cources-container/competency-based-skills-profile";
import { FunctionComponent } from "react";

interface CompetencyBasedSkillProps {
    
}
 
const CompetencyBasedSkill: FunctionComponent<CompetencyBasedSkillProps> = () => {
    return ( <main>
        <HomeHeroSection/>
        <CompetencyBasedSkillsProfile/>
    </main> );
}
 
export default CompetencyBasedSkill;