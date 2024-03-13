import { FC } from "react";
import "./style.css";
import AdminSearchFieldSection from "@/components/fields/admin-search-field";
import Image from "next/image";
import AjantaLogo from "@/public/images/ajanta-logo.svg";

interface AdminCoursesHeroSectionProps {}

const AdminCoursesHeroSection: FC<AdminCoursesHeroSectionProps> = () => {
  return (
    <section className="admin-course-hero-main-section">
      <div>
        <Image src={AjantaLogo} height={23} width={260} alt="Ajanta Logo" />
      </div>
      <div>
        <AdminSearchFieldSection />
      </div>
    </section>
  );
};

export default AdminCoursesHeroSection;
