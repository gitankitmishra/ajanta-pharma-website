"use client";
import { FC, useState } from "react";
import "./style.css";
import Link from "next/link";
import AddButton from "@/components/buttons/add-button";
import CustomPagination from "@/components/pagination";

interface AdminNotificationContainerProps {}
interface Notification {
  boldText: string;
  summaryText: string;
  date: string;
  time: string;
}

const AdminNotificationContainer: FC<AdminNotificationContainerProps> = () => {
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
    <section className="admin-notification-main-container">
      <div className="admin-notification-text-btn-section">
        <p className="admin-notification-notification-list-text">
          Notification List
        </p>
        <div className="admin-notification-add-notification-btn">
          <Link href="/admin/admin-add-notification">
            <AddButton text="Add Notification" width="247px" />
          </Link>
        </div>
      </div>
      {notifications.map((notification, index) => (
        <div
          className={`admin-notification-user-notifications-section ${getFormattedDate(
            notification.date
          )}`}
          key={index}
        >
          <div className="notification-section-texts">
            <p className="admin-notification-bold-text">
              {notification.boldText}
            </p>
            <p className="admin-notification-summary-text">
              {notification.summaryText}
            </p>
          </div>
          <div className="notification-section-date-and-time">
            <p className="admin-notification-date">{notification.date}</p>
            <div className="admin-notification-time">{notification.time}</div>
          </div>
        </div>
      ))}
      <div className="admin-notification-pagination">
        {" "}
        <CustomPagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default AdminNotificationContainer;
