import SearchFieldSection from "@/components/fields/search-field";
import { FC } from "react";
import Image from "next/image";
import "./style.css"

import AjantaLogo from "@/public/images/ajanta-logo.svg";

interface HomeHeroSectionProps {}

const HomeHeroSection: FC<HomeHeroSectionProps> = () => {
  return (
    <section className="home-hero-section-main-container">
      <div>
        <Image src={AjantaLogo} height={23} width={260} alt="Ajanta Logo" />
      </div>
      <SearchFieldSection />
    </section>
  );
};

export default HomeHeroSection;
