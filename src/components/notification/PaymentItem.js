import React from "react";
import styles from "./PaymentItem.module.css";

const PaymentItem = (props) => {

  return (
    <div className={styles.payments}>
      <div className={styles.status} style={{ color: props.success === "true" ? "green" : "red" }}>{"\u2981"}</div>
      <div className={styles.pspReference}>{props.pspreference}</div>
      <div className={styles.account}>{props.merchantaccount}</div>
      <div className={styles.paymentMethod}>{props.paymentmethod}</div>
      <div className={styles.amount}>
          <div className={styles.currency}>{props.currency}</div>
          <div className={styles.amount2}>{props.amount}</div>
      </div>
      <div className={styles.date}>{props.timestamp}</div>
      <div className={styles.merchantReference}>{props.merchantreference}</div>
      <div className={styles.eventCode}>{props.event}</div>
    </div>
  );
};

export default PaymentItem;
