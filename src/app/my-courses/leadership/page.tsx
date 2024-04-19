import HomeHeroSection from "@/container/home-container/hero-section";
import LeadershipProfile from "@/container/my-cources-container/leadership-profile";
import { FunctionComponent } from "react";

interface LeadershipProps {
    
}
 
const Leadership: FunctionComponent<LeadershipProps> = () => {
    return ( <main>
        <HomeHeroSection/>
        <LeadershipProfile/>
    </main> );
}
 
export default Leadership;