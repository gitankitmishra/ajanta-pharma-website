"use client"
import { FC, useState } from "react";
import "./style.css";
import Breadcrumb from "@/components/breadcrumb";
import AddButton from "@/components/buttons/add-button";
import NextButton from "@/components/buttons/next-button";
import PreviousButton from "@/components/buttons/previous-button";
import AddNotificationPopup from "@/components/popups/add-notification-popup";

interface AddNotificationContainerProps {}

const AddNotificationContainer: FC<AddNotificationContainerProps> = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  const breadcrumbItems = [
    { label: "Notifications ", href: "/admin/admin-notification" },
    {
      label: " Add Notification",
      href: "/admin/admin-add-notification",
      isActive: true,
    },
  ];
  return (
    <section className="add-notification-container-main-section">
      <div className="add-notification-breadcrumb-section">
        <Breadcrumb items={breadcrumbItems} />
        <p className="add-notification-text">Add Notification</p>
      </div>
      <div className="add-notification-title-description-section">
        <div className="add-notification-title-div">
          <h3 className="add-notification-title-text">Title</h3>
          <textarea className="add-notification-title-textarea" />
        </div>
        <div className="add-notification-description-div">
          <h3 className="add-notification-description-text">Description</h3>
          <textarea className="add-notification-description-textarea" />
        </div>
      </div>
      <div className="add-notification-button-section">
        <div>
          <a href="/admin/admin-notification">
            <PreviousButton text="Discard" />
          </a>
        </div>
        <div onClick={togglePopup}>
           
          <NextButton text={"Add"} />
        </div>
      </div>
      {isPopupOpen && <AddNotificationPopup open={isPopupOpen} onClose={togglePopup} />}
    </section>
  );
};

export default AddNotificationContainer;
