import React from "react";
import { useDispatch } from "react-redux";
import styles from "./NotificationItem.module.css";
import { databaseActions } from "../../store/databaseSlice";

const NotificationItem = (props) => {
  const dispatch = useDispatch();

  const notificationHandler = () => {
    console.log(props.id);
    dispatch(
      databaseActions.notificationItem({
        id: props.id,
      })
    );
  };

  return (
    <div className={styles.notification} onClick={notificationHandler}>
      <div className={styles.timestamp}>{props.timestamp}</div>
      <div className={styles.eventcode}>{props.eventcode}</div>
      <div className={styles.pspreference}>{props.pspreference}</div>
    </div>
  );
};

export default NotificationItem;
