import HomeHeroSection from "@/container/home-container/hero-section";
import TeamReportProfile from "@/container/team-performance-container/team-report-profile";
import { FunctionComponent } from "react";

interface TeamReportProps {
    
}
 
const TeamReport: FunctionComponent<TeamReportProps> = () => {
    return ( <main>
        <HomeHeroSection/>
        <TeamReportProfile/>
    </main> );
}
 
export default TeamReport;
