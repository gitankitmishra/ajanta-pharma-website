import { FC } from "react";
import "./style.css";
import Link from "next/link";
import AddButton from "@/components/buttons/add-button";

interface AdminNotificationContainerProps {}

const AdminNotificationContainer: FC<AdminNotificationContainerProps> = () => {
  return <section className="admin-notification-main-container">
     <div className="admin-notification-text-btn-section">
        <p className="admin-notification-notification-list-text">Notification List</p>
        <div className="admin-notification-add-notification-btn">
          <Link href="/admin/admin-add-notification">
            <AddButton text="Add Notification" />
          </Link>
        </div>
      </div>
  </section>;
};

export default AdminNotificationContainer;
