import React, { useState } from "react";
import DateTimePicker from "../DateTimePicker/DateTimePicker";
import moment from "moment";
import { RxCross1 } from "react-icons/rx";

import styles from "./DatePickerModal.module.css";

function DatePickerModal({
  show,
  handleDateRange,
  dateValue,
  setDateShow,
  start,
  end,
}) {
  const [TempDate, setTempDate] = useState([dateValue[0], dateValue[1]]);
  const [StartTime, setStartTime] = useState("00:00");
  const [EndTime, setEndTime] = useState("23:59");
  const handleDateSubmit = () => {
    const startDate = new Date(TempDate[0]);
    const endDate = new Date(TempDate[1]);

    const newStartDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
      parseInt(StartTime.split(":")[0]),
      parseInt(StartTime.split(":")[1])
      // StartTime.getSeconds()
    );

    const newEndDate = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate(),
      parseInt(EndTime.split(":")[0]),
      parseInt(EndTime.split(":")[1])
      // endTime.getSeconds()
    );

    let MainData = [newStartDate, newEndDate];
    console.log(" MainData:", MainData);
    handleDateRange(MainData);
    setDateShow(!show);
  };
  const handleClear = () => {
    setTempDate([start, end]);
  };
  const handleCancel = () => {
    setDateShow(false);
  };

  const handleChange = (type, e) => {
    console.log("StartTime", e.target.value.split(":"));
    if (type == "start") {
      setStartTime(e.target.value);
    }
    if (type == "end") {
      setEndTime(e.target.value);
    }
  };
  console.log("show", show);
  return (
    <div className={styles.mainContainer}  style={{ display: show ? "block" : "none" }}>
      <div className={styles.box}>
        <div>
          <DateTimePicker dateValue={TempDate} setTempDate={setTempDate} />
        </div>

        <div className={styles.menu}>
          <div className={styles.cross} onClick={handleCancel}>
            <RxCross1 />
          </div>
          <div className={styles.heading}>Select Dates</div>
          <div className={styles.DateBox}>
            <div>From :</div>
            <div className={styles.container}>
              <div>{moment(TempDate[0]).format("DD-MM-YYYY")}</div>
              <div>
                <input
                  type="time"
                  value={StartTime}
                  onChange={(e) => handleChange("start", e)}
                  className={styles.inputDate}
                />
              </div>
            </div>
          </div>
          <div className={styles.DateBox}>
            <div>To :</div>
            <div className={styles.container}>
              <div>{moment(TempDate[1]).format("DD-MM-YYYY")}</div>
              <div>
                <input
                  type="time"
                  value={EndTime}
                  onChange={(e) => handleChange("end", e)}
                  className={styles.inputDate}
                />
              </div>
            </div>
          </div>
          <div className={styles.btnGroup}>
            <button className={styles.cancel} onClick={handleClear}>
              Clear
            </button>
            <button className={styles.submit} onClick={handleDateSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DatePickerModal;
