import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";

import styles from "./AccountBox.module.css";

function AccountBox({
  show,
  setAccountShow,
  data,
  setAccount,
  Reset,
  placeholder,
  heading,
}) {
  const [List, setList] = useState([]);

  const paymentNotificationDatabase = useSelector(
    (state) => state.database.paymentNotifications
  );

  const balanceNotificationDatabase = useSelector(
    (state) => state.database.balanceNotifications
  );

  const handleChange = (e) => {
    const index = List.findIndex((item) => e.target.value == item);
    if (index == -1 && e.target.value != -1) {
      setList((prev) => [...prev, e.target.value]);
    }
  };

  const handleRemove = (e) => {
    let stack = List.filter((item) => item != e);
    setList(stack);
  };

  const handleClear = () => {
    setList([]);
    setAccount([]);
  };

  const handleClose = () => {
    setAccountShow(false);
  };

  const handleApply = () => {
    setAccount(List);
    handleClose();
  };

  useEffect(() => {
    setList([]);
  }, [Reset, paymentNotificationDatabase, balanceNotificationDatabase]);

  return (
    <div className={styles.box} style={{ display: show ? "block" : "none" }}>
      <div className={styles.headerBox}>
        <div className={styles.heading}>{heading ?? "Account"}</div>
        <div onClick={handleClose}>
          <RxCross1 />
        </div>
      </div>

      <div className={styles.selectBox}>
        <select
          aria-label="Default select example"
          onChange={handleChange}
          className={styles.select}
        >
          <option value="-1">{placeholder}</option>
          {data?.map((e) => (
            <option value={e}>{e}</option>
          ))}
        </select>
      </div>
      <div className={styles.listBox}>
        {List?.map((e) => (
          <div className={styles.listItem}>
            <div onClick={() => handleRemove(e)}>
              <IoMdRemoveCircleOutline size={22} color="gray" />
            </div>
            <div>{e}</div>
          </div>
        ))}
      </div>
      <div className={styles.btnGroup}>
        <button className={styles.cancel} onClick={handleClear}>
          Clear
        </button>
        <button className={styles.submit} onClick={handleApply}>
          Apply
        </button>
      </div>
    </div>
  );
}

export default AccountBox;
