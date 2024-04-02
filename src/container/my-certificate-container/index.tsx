"use client";
import React, { FunctionComponent, useEffect, useState } from "react";
import "./style.css";
import MyCertificateCard from "@/components/cards/my-certificate-card";
import CLImage from "@/public/images/CL-image.svg";
import EmptyCertificate from "@/public/images/empty-certificate.svg";
import Image from "next/image";

interface MyCertificateProfileSectionProps {}

const MyCertificateProfileSection: FunctionComponent<
  MyCertificateProfileSectionProps
> = ({}) => {
  const [hasCertificates, setHasCertificates] = useState<boolean>(false);

  // Function to check if any certificates are present
  const checkCertificates = () => {
    const certificateCards = document.querySelectorAll(
      ".my-certificate-card-section .my-certificate-card"
    );
    setHasCertificates(certificateCards.length > 0);
  };

  useEffect(() => {
    checkCertificates();
  }, []);

  return (
    <section className="my-certificate-profile-main-section">
      <div className="my-certificate-profile-heading-section">
        <p className="my-certificate-heading-text">My Certifications</p>
      </div>
      <div className="my-certificate-profile-card-section">
      
          <>
            <MyCertificateCard
              imageUrl={CLImage}
              percentage={40}
              course_code={"BO1"}
              course_name={"Business Etiquette"}
              date={"24/10/2024"}
            />
            <MyCertificateCard
              imageUrl={CLImage}
              percentage={40}
              course_code={"BO1"}
              course_name={"Business Etiquette"}
              date={"24/10/2024"}
            />
            <MyCertificateCard
              imageUrl={CLImage}
              percentage={40}
              course_code={"BO1"}
              course_name={"Business Etiquette"}
              date={"24/10/2024"}
            />
            <MyCertificateCard
              imageUrl={CLImage}
              percentage={40}
              course_code={"BO1"}
              course_name={"Business Etiquette"}
              date={"24/10/2024"}
            />
          </>
      </div>
      {!hasCertificates && (
        <div className="my-certificate-profile-empty-certificate-section">
          {/* Display  image here when certificates are not issued */}
          {/* <Image
            src={EmptyCertificate}
            alt="Empty Certificate"
            height={150}
            width={180}
          /> 
          <p className="my-certificate-profile-empty-certificate-text">
            No certifications yet
          </p> */}
        </div>
      )}
    </section>
  );
};

export default MyCertificateProfileSection;