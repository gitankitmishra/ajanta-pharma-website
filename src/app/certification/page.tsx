import HomeHeroSection from "@/container/home-container/hero-section";
import MyCertificateProfileSection from "@/container/my-certificate-container";
import { FunctionComponent } from "react";

interface CertificationProps {}

const Certification: FunctionComponent<CertificationProps> = () => {
  return <main>
    <HomeHeroSection/>
  <MyCertificateProfileSection/>
  </main>;
};

export default Certification;
