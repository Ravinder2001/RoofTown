import React from "react";
import { useDispatch } from "react-redux";
import styles from "./BalanceNotificationItem.module.css";
import { databaseActions } from "../../store/databaseSlice";

const BalanceNotificationItem = (props) => {
  const dispatch = useDispatch();

  const balanceNotificationHandler = () => {
    dispatch(
      databaseActions.balanceNotificationItem({
        id: props.id,
      })
    );
  };

  return (
    <div className={styles.notification} onClick={balanceNotificationHandler}>
      <div className={styles.timestamp}>{props.timestamp}</div>
      <div className={styles.type}>{props.type}</div>
      <div className={styles.balancePlatform}>{props.balancePlatform}</div>
    </div>
  );
};

export default BalanceNotificationItem;
