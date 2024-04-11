import { FC, useState } from "react";
import "./style.css";
import InfoIcon from "@/components/icons/info-icon.svg";
import Image from "next/image";
import PreviousButton from "@/components/buttons/previous-button";
import NextButton from "@/components/buttons/next-button";
import SuccessPopup from "../../success-popup";
import SubmitPopup from "../submit-popup";

interface ConfirmationPopupProps {
  open: boolean;
  onClose: () => void;
}

const ConfirmationPopup: FC<ConfirmationPopupProps> = ({ open, onClose }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen); // Toggle the popup
  };

  if (!open) return null; // Only render if open is true

  return (
    <div className="confirm-popup-overlay">
      <div className="confirm-popup-main-container">
        <div className="confirm-popup-confirm-icon">
          <Image src={InfoIcon} width={572} height={60} alt="confirm Image" />
        </div>
        <div className="confirm-popup-texts-section">
          <p className="confirm-popup-text">Are you sure you want to leave?</p>
          <p className="confirm-popup-subtitle-text">
            Going back will erase unsaved changes. Proceed anyway?
          </p>
        </div>
        <div className="confirm-popup-buttons">
          <div onClick={onClose}>
            <PreviousButton text="No" width="128px" />
          </div>
          <div onClick={togglePopup}>
            <NextButton text="Yes" width="128px" />
          </div>
        </div>
        <SubmitPopup open={isPopupOpen} onClose={togglePopup} />
      </div>
    </div>
  );
};
export default ConfirmationPopup;
