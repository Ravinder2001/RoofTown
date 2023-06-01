import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";
import NotificationItem from "./NotificationItem";
import AccountBox from "../AccountBox/AccountBox";
import DatePickerModal from "../DatePickerModal/DatePickerModal";
import styles from "./NotificationList.module.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { BiChevronsLeft } from "react-icons/bi";

const NotificationList = () => {
  let start = new Date("2023-02-09 00:00:00"); // moment().subtract(15, "days")["_d"]
  let end = new Date("2023-02-13 23:59:59"); //moment().subtract(1, "days")["_d"]
  let rowPerPage = 15;

  const paymentNotification = useSelector(
    (state) => state.database.paymentNotificationsExample
  );

  const paymentNotificationDatabase = useSelector(
    (state) => state.database.paymentNotifications
  );

  console.log(paymentNotification);
  console.log(paymentNotificationDatabase);

  const notificationItem = useSelector(
    (state) => state.database.paymentNotificationItem
  );

  const [data, setData] = useState(paymentNotification);
  const [temp, setTemp] = useState(paymentNotification);
  const [AccountList, setAccountList] = useState([]);
  const [EventCodeList, setEventCodeList] = useState([]);
  const [AccountShow, setAccountShow] = useState(false);
  const [EventShow, setEventShow] = useState(false);
  const [DateShow, setDateShow] = useState(false);
  const [Reset, setReset] = useState(false);
  const [Page, setPage] = useState(1);

  //states for filter boxes

  const [text, setText] = useState("");
  const [account, setAccount] = useState([]);
  const [event, setEvent] = useState([]);
  const [dateValue, setDateValue] = useState([start, end]);

  const handleDateRange = (e) => {
    if (e) {
      const startDate = new Date(e[0]);
      const endDate = new Date(e[1]);
      setDateValue([startDate, endDate]);
    } else {
      setDateValue([start, end]);
    }
  };

  const handleInputFilter = (e) => {
    let name = e.target.name;
    let text = e.target.value;
    switch (name) {
      case "Main":
        return setText(text);
      default:
        return;
    }
  };

  const handleReset = () => {
    setText("");
    setDateValue([start, end]);
    setAccount([]);
    setEvent([]);
    setDateShow(false);
    setAccountShow(false);
    setEventShow(false);
    setReset(!Reset);
    setPage(1)
  };

  function isNotification(notification) {
    if (!notificationItem) {
      return notification.id === paymentNotification[0].id;
    } else {
      return notification.id === notificationItem;
    }
  }

  const body = paymentNotification.find(isNotification);

  useEffect(() => {
    if (
      text == "" &&
      new Date(dateValue[0]).getTime() === new Date(start).getTime() &&
      new Date(dateValue[1]).getTime() === new Date(end).getTime() &&
      account.length == 0 &&
      event.length == 0
    ) {
      const startIndex = (Page - 1) * rowPerPage;
      const endIndex = startIndex + rowPerPage;
      const PaginatedData = paymentNotification.slice(startIndex, endIndex);
      setTemp(paymentNotification);
      setData(PaginatedData);
      return;
    } else {
      let stack = paymentNotification?.filter((e) => {
        const targetDate = new Date(e.timestamp);
        const targetTimezoneOffset = targetDate.getTimezoneOffset();
        const targetDateUTC = new Date(
          targetDate.getTime() + targetTimezoneOffset * 60 * 1000
        );

        const AccountFilter = () => {
          if (account.length) {
            const data = account.map((item) => e.merchantaccount == item);
            return data.some((e) => e);
          } else {
            return true;
          }
        };

        const EventFilter = () => {
          if (event.length) {
            const data = event.map((item) => e.eventcode == item);
            return data.some((e) => e);
          } else {
            return true;
          }
        };

        if (
          e.pspreference.includes(text) &&
          targetDateUTC.getTime() >= dateValue[0].getTime() &&
          targetDateUTC.getTime() <= dateValue[1].getTime() &&
          AccountFilter() &&
          EventFilter()
        ) {
          return e;
        }
      });
      setTemp(stack);
      setData(stack);
    }
  }, [text, dateValue, account, event]);

  useEffect(() => {
    paymentNotification?.forEach((e) => {
      if (e.merchantaccount != "") {
        setAccountList((ele) => [
          ...ele.filter((item) => item != e.merchantaccount),
          e.merchantaccount,
        ]);
      }
      if (e.eventcode != "") {
        setEventCodeList((ele) => [
          ...ele.filter((item) => item != e.eventcode),
          e.eventcode,
        ]);
      }
    });
  }, []);

  useEffect(() => {
    const startIndex = (Page - 1) * rowPerPage;
    const endIndex = startIndex + rowPerPage;
    const PaginatedData = temp.slice(startIndex, endIndex);

    setData(PaginatedData);
  }, [temp, Page]);

  return (
    <div className={styles.notificationContainer}>
      <div className={styles.notificationSearch}>
        <div className={styles.notificationSearchItem}>
          <div className={styles.notificationSearchIcon}>
            <AiOutlineSearch size={27} />
          </div>
          <div className={styles.notificationSearchText}>
            <input
              name="Main"
              value={text}
              onChange={handleInputFilter}
              className={styles.notificationTextSearch}
              placeholder="Search by PSP Reference, Merchant Reference, or Shopper Reference"
            ></input>
          </div>
        </div>
      </div>
      <div className={styles.notificationFilter}>
        <div className={styles.eventCodeFilter} id={styles.account}>
          <div
            onClick={() => {
              setEventShow(!EventShow);
              setDateShow(false);
              setAccountShow(false);
            }}
          >
            Event Code
          </div>
          <AccountBox
            show={EventShow}
            setAccountShow={setEventShow}
            data={EventCodeList}
            setAccount={setEvent}
            Reset={Reset}
            placeholder="Select Event Code"
            heading="Event Code"
          />
        </div>
        <div className={styles.accountFilter} id={styles.account}>
          <div
            onClick={() => {
              setAccountShow(!AccountShow);
              setDateShow(false);
              setEventShow(false);
            }}
          >
            Account
          </div>
          <AccountBox
            show={AccountShow}
            setAccountShow={setAccountShow}
            data={AccountList}
            setAccount={setAccount}
            Reset={Reset}
            placeholder="Select Account"
          />
        </div>
        <div className={styles.accountFilter} id={styles.date}>
          <div
            onClick={() => {
              setDateShow(!DateShow);
              setAccountShow(false);
            }}
          >
            Date
          </div>
          <DatePickerModal
            dateValue={dateValue}
            handleDateRange={handleDateRange}
            show={DateShow}
            setDateShow={setDateShow}
            start={start}
            end={end}
          />
        </div>
        <div className={styles.resetFilter} onClick={handleReset}>
          <GrPowerReset size={17} />
          <div className={styles.resetText}>Reset</div>
        </div>
      </div>
      <div className={styles.CallbackContainer}>
        <div className={styles.notificationList}>
          <div className={styles.notificationListHeader}>
            <div className={styles.timestamp}>Deliverd</div>
            <div className={styles.eventcode}>EventCode</div>
            <div className={styles.pspreference}>PSP Reference</div>
          </div>
          <div className={styles.notificationListTotal}>
            {data.map((notification) => (
              <NotificationItem
                key={notification.id}
                id={notification.id}
                timestamp={new Date(notification.timestamp)
                  .toUTCString()
                  .substring(5, notification.timestamp.length - 4)}
                eventcode={notification.eventcode}
                pspreference={notification.pspreference}
              />
            ))}
          </div>
          <div className={styles.notificationListSwiper}>
            <div className={styles.page}>
              Page {Page} of {Math.ceil(temp.length / rowPerPage)}
            </div>
            <div className={styles.arrows}>
              <div className={styles.arrowBack} onClick={() => setPage(1)}>
                <BiChevronsLeft size={25} />
              </div>
              <div
                className={styles.arrowPrev}
                onClick={() => {
                  if (Page >= 2) {
                    setPage(Page - 1);
                  }
                }}
              >
                <MdKeyboardArrowLeft size={25} />
              </div>
              <div
                className={styles.arrowNext}
                onClick={() => {
                  if (Page < Math.ceil(temp.length / rowPerPage)) {
                    setPage(Page + 1);
                  }
                }}
              >
                <MdKeyboardArrowRight size={25} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.notificationbody}>
          <pre>{JSON.stringify(body.notification, null, 1)}</pre>
        </div>
      </div>
    </div>
  );
};

export default NotificationList;
