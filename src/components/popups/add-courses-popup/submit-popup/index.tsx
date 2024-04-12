"use client";
import { FC, useEffect } from "react";
import "./style.css";
import UncoloredAjantaLogo from "@/public/images/uncoloured-logo.svg";
import SuccessPng from "@/components/icons/successIcon.svg";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface SubmitPopupProps {
  open: boolean;
  onClose: () => void;
}

const SubmitPopup: FC<SubmitPopupProps> = ({ open, onClose }) => {
  const router = useRouter();
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (open) {
      // Set a timer to close the popup after 2 seconds
      timer = setTimeout(() => {
        onClose();
        router.push("/admin/admin-courses");
      }, 1000);
    }

    // Clean up the timer when the component unmounts or when the popup is closed
    return () => clearTimeout(timer);
  }, [open, onClose, router]);

  return (
    
      <div className={`submit-popup-main-container ${open ? "open" : ""}`}>
        <div className="submit-popup-logo">
          <Image src={UncoloredAjantaLogo} alt="" width={220} height={64} />
        </div>
        <div className="submit-popup-submit-icon">
          <Image src={SuccessPng} width={572} height={60} alt="submit Image" />
        </div>
        <div className="submit-popup-texts">
          <p className="submit-popup-text">
            Course has been updated successfully{" "}
          </p>
          <p className="submit-popup-second-text">Thank You!</p>
        </div>
  
    </div>
  );
};

export default SubmitPopup;
