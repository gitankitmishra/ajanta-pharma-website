import { FC } from "react";
import Image from "next/image";
import "./style.css";
import AjantaLogo from "@/public/images/ajanta-logo.svg";
import DasboardSearchField from "@/components/fields/dashboard-search-field";

interface DashboardHeroSectionProps {}

const DashboardHeroSection: FC<DashboardHeroSectionProps> = () => {
  return (
    <section className="dashboard-hero-section-main-container">
      <div>
        <Image src={AjantaLogo} height={23} width={260} alt="Ajanta Logo" />
      </div>
      <DasboardSearchField />
    </section>
  );
};

export default DashboardHeroSection;
