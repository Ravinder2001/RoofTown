import React, { useState, useEffect } from "react";
import styles from "./Webhooks.module.css";
import NotificationList from "./NotificationList";
import { useDispatch } from "react-redux";
import BalanceNotificationList from "./BalanceNotificationList";
import { balanceNotifications, paymentNotifications } from "../../store/databaseSlice.js";


const Webhooks = () => {
  const [webhook, setWebhook] = useState("payments");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(balanceNotifications());
    dispatch(paymentNotifications());
  }, [dispatch]);

  return (
    <div>
      <div className={styles.notificationToggle}>
        <button
          className={styles.paymentNotifications}
          onClick={() => setWebhook("payments")}
        >
          Payments
        </button>
        <button
          className={styles.balanceNotifications}
          onClick={() => setWebhook("balance")}
        >
          Balance Platform
        </button>
      </div>
      <div className={styles.webhookContainer}>
        {(() => {
          switch (webhook) {
            case "payments":
              return <NotificationList />;
            case "balance":
              return <BalanceNotificationList />;
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
};

export default Webhooks;
