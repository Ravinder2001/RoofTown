import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";

import styles from "./AmountBox.module.css";

function AmountBox({ show, setAmountShow, setRange }) {
  const [number, setNumber] = useState({ min: "", max: "" });

  const handleChange = (e) => {
    setNumber((prev) => ({
      ...prev,
      [e.target.name]: parseInt(e.target.value),
    }));
  };

  const handleClear = () => {
    setNumber({ min: "", max: "" });
    setRange({ min: 0, max: 1000 });
  };
  const handleSubmit = () => {
    setRange({ min: number.min, max: number.max });
    setAmountShow(false);
  };

  const handleClose = () => {
    setAmountShow(false);
  };

  return (
    <div style={{ display: show ? "block" : "none" }} className={styles.box}>
      <div className={styles.headerBox}>
        <div className={styles.heading}>Amount</div>
        <div onClick={handleClose}>
          <RxCross1 />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.inputBox}>
          <div>From :</div>
          <div>
            <input
              type="number"
              value={number.min}
              onChange={handleChange}
              name="min"
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.inputBox}>
          <div>To :</div>
          <div>
            <input
              type="number"
              value={number.max}
              onChange={handleChange}
              name="max"
              className={styles.input}
            />
          </div>
        </div>
      </div>

      <div className={styles.btnGroup}>
        <button className={styles.cancel} onClick={handleClear}>
          Clear
        </button>
        <button
          disabled={
            !(typeof number.min == "number" && typeof number.max == "number")
          }
          className={styles.submit}
          onClick={handleSubmit}
        >
          Apply
        </button>
      </div>
    </div>
  );
}

export default AmountBox;
