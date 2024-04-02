"use client";
import { FC, useState } from "react";
import "./style.css";
import Link from "next/link";
import AddButton from "@/components/buttons/add-button";
import CustomPagination from "@/components/pagination";
import Image from "next/image";
import NotificationImage from "@/public/images/notification-bell-img.png";

interface NotificationContainerProps {}
interface Notification {
  boldText: string;
  summaryText: string;
  date: string;
  time: string;
}

const NotificationContainer: FC<NotificationContainerProps> = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Add logic here to fetch data for the new page, etc.
  };
  // Array of notifications
  const notifications: Notification[] = [
    {
      boldText: "Lorem ipsum dolor sit amet, consectetu",
      summaryText:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod sit nisi est facere dignissimos hic, nobis sapiente architecto totam sunt!",
      date: "Today",
      time: "16:14",
    },
    {
      boldText: "Lorem ipsum dolor sit amet, consectetu",
      summaryText:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod sit nisi est facere dignissimos hic, nobis sapiente architecto totam sunt!",
      date: "Yesterday",
      time: "16:14",
    },
  ];

  // Function to get the current date in the format "Today" -------Ankita
  const getFormattedDate = (date: string): string => {
    const today = new Date();
    const notificationDate = new Date(date);

    if (
      notificationDate.getDate() === today.getDate() &&
      notificationDate.getMonth() === today.getMonth() &&
      notificationDate.getFullYear() === today.getFullYear()
    ) {
      return "Today";
    } else if (
      notificationDate.getDate() === today.getDate() - 1 &&
      notificationDate.getMonth() === today.getMonth() &&
      notificationDate.getFullYear() === today.getFullYear()
    ) {
      return "Yesterday";
    } else {
      return date;
    }
  };

  return (
    <section className="notification-main-container">
      <div className="notification-text-btn-section">
        <p className="notification-notification-list-text">Notifications</p>
      </div>
      {notifications.length === 0 ? (
        <div className="notification-no-notifications">
          <Image
            src={NotificationImage}
            alt="Empty Certificate"
            height={180}
            width={180}
          />
          <p className="notification-no-notification-text">
            No Notifications yet
          </p>
        </div>
      ) : (
        notifications.map((notification, index) => (
          <div
            className={`notification-user-notifications-section ${getFormattedDate(
              notification.date
            )}`}
            key={index}
          >
            <div className="notification-section-texts">
              <p className="notification-bold-text">{notification.boldText}</p>
              <p className="notification-summary-text">
                {notification.summaryText}
              </p>
            </div>
            <div className="notification-section-date-and-time">
              <p className="notification-date">{notification.date}</p>
              <div className="notification-time">{notification.time}</div>
            </div>
          </div>
        ))
      )}

      <div className="notification-pagination">
        {" "}
        <CustomPagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default NotificationContainer;
