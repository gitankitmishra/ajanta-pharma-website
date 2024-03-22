"use client";
import { FC } from "react";
import "./style.css";
import Image from "next/image";
import AjantaLogo from "@/public/images/ajanta-logo.svg";
import { ProfileIcon } from "@/components/icons/profile-icon";
import { useRouter } from "next/navigation";
interface AddCourseHeroSectionProps {}

const AddCourseHeroSection: FC<AddCourseHeroSectionProps> = () => {
  const router = useRouter();
  const pathname =router;
  // const hideProfileIcon = pathname.includes("/admin/admin-course-detail");
  return (
    <section className="add-course-hero-main-section">
      <div>
        <Image src={AjantaLogo} height={23} width={260} alt="Ajanta Logo" />
      </div>
      <div className="add-course-profile-icon">
        <ProfileIcon />
      </div>
    </section>
  );
};

export default AddCourseHeroSection;
