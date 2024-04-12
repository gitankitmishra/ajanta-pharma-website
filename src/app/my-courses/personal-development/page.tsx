import HomeHeroSection from "@/container/home-container/hero-section";
import PersonalDevelopmentProfileSection from "@/container/my-cources-container/personal-development-profile";
import { FunctionComponent } from "react";

interface PersonalDevelopmentProps {
    
}
 
const PersonalDevelopment: FunctionComponent<PersonalDevelopmentProps> = () => {
    return ( <main>
        <HomeHeroSection/>
        <PersonalDevelopmentProfileSection/>
    </main> );
}
 
export default PersonalDevelopment;