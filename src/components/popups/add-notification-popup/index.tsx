import { FC, useState } from "react";
import "./style.css";
import UncoloredAjantaLogo from "@/public/images/uncoloured-logo.svg";
import InfoIcon from "@/components/icons/info-icon.svg";

import Image from "next/image";
import PreviousButton from "@/components/buttons/previous-button";
import NextButton from "@/components/buttons/next-button";
import SuccessPopup from "../success-popup";

interface AddNotificationPopupProps {
  open: boolean;
  onClose: () => void;
}

const AddNotificationPopup: FC<AddNotificationPopupProps> = ({
  open,
  onClose,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const togglePopup = () => {
    setIsPopupOpen(true);
  };
  return (
    <div className="add-notification-popup-main-container">
      <div className="add-notification-popup-add-notification-icon">
        <Image
          src={InfoIcon}
          width={572}
          height={60}
          alt="add-notification Image"
        />
      </div>
      <div className="add-notification-popup-texts">
        <p className="add-notification-popup-text">
          Are you sure you want to send notification ?
        </p>
      </div>
      <div className="add-notification-popup-buttons">
        <div onClick={onClose}>
          <PreviousButton text="Cancel" width="128px" />
        </div>
        <div onClick={togglePopup}>
          <NextButton text="Add" width="128px" />
        </div>
      </div>
      <SuccessPopup
        open={isPopupOpen}
        onClose={togglePopup}
        text="Notification has been added successfully"
      />
    </div>
  );
};

export default AddNotificationPopup;
