import { FC, useEffect } from "react";
import "./style.css";
import UncoloredAjantaLogo from "@/public/images/uncoloured-logo.svg";
import SuccessPng from "@/components/icons/successIcon.svg";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface SuccessPopupProps {
  open: boolean;
  onClose: () => void;
  text: string;
}

const SuccessPopup: FC<SuccessPopupProps> = ({ open, onClose, text }) => {
  const router = useRouter();
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (open) {
      // Set a timer to close the popup after 2 seconds
      timer = setTimeout(() => {
        onClose();
        router.push("/admin/admin-notification");
      }, 2000);
    }

    // Clean up the timer when the component unmounts or when the popup is closed
    return () => clearTimeout(timer);
  }, [open, onClose]);

  return (
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
  );
};

export default SuccessPopup;
