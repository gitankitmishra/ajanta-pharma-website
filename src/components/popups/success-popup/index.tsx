"use client";
import { FC, useEffect } from "react";
import "./style.css";
import UncoloredAjantaLogo from "@/public/images/uncoloured-logo.svg";
import SuccessPng from "@/components/icons/successIcon.svg";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface SuccessPopupProps {
  open: boolean;
  onClose: () => void;
  text: string;
}

const SuccessPopup: FC<SuccessPopupProps> = ({ open, onClose, text }) => {
  const router = useRouter();
  const routerPath = usePathname();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (open) {
      // Set a timer to close the popup after 2 seconds
      timer = setTimeout(() => {
        onClose();
        if (routerPath === "/admin/admin-course-detail") {
          // Change the navigation path to dashboard if the current path is /admin/admin-course-detail
          router.push("/admin/admin-courses");
        } else {
          router.push("/admin/admin-notification");
        }
      }, 2000);
    }

    // Clean up the timer when the component unmounts or when the popup is closed
    return () => clearTimeout(timer);
  }, [open, onClose, router]);

  return (
    <>
      <div className="overlay"></div>
      <div className={`success-popup-main-container ${open ? "open" : ""}`}>
        <div className="success-popup-logo">
          <Image src={UncoloredAjantaLogo} alt="" width={220} height={64} />
        </div>
        <div className="success-popup-success-icon">
          <Image src={SuccessPng} width={572} height={60} alt="Success Image" />
        </div>
        <div className="success-popup-texts">
          <p className="success-popup-text">{text}</p>
          <p className="success-popup-second-text">Thank You!</p>
        </div>
      </div>
    </>
  );
};

export default SuccessPopup;
