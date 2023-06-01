import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";
import BalanceNotificationItem from "./BalanceNotificationItem";
import AccountBox from "../AccountBox/AccountBox";
import DatePickerModal from "../DatePickerModal/DatePickerModal";
import styles from "./BalanceNotificationList.module.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { BiChevronsLeft } from "react-icons/bi";

const BalanceNotificationList = () => {
  let start = new Date("2023-02-02 00:00:00"); // moment().subtract(15, "days")["_d"]
  let end = new Date("2023-03-03 23:59:59"); //moment().subtract(1, "days")["_d"]
  let rowPerPage = 15;
  const balanceNotification = useSelector(
    (state) => state.database.balanceNotificationsExample
  );

  const balanceNotificationDatabase = useSelector(
    (state) => state.database.balanceNotifications
  );

  // console.log(balanceNotification);
  // console.log(balanceNotificationDatabase);

  const balanceNotificationItem = useSelector(
    (state) => state.database.balanceNotificationItem
  );

  const [data, setData] = useState(balanceNotification);
  const [temp, setTemp] = useState(balanceNotification);
  const [BalanceList, setBalanceList] = useState([]);
  const [TypeList, setTypeList] = useState([]);
  const [TypeShow, setTypeShow] = useState(false);
  const [BalanceShow, setBalanceShow] = useState(false);
  const [DateShow, setDateShow] = useState(false);
  const [Reset, setReset] = useState(false);

  //states for filter boxes

  const [text, setText] = useState("");
  const [type, setType] = useState([]);
  const [balance, setBalance] = useState([]);
  const [dateValue, setDateValue] = useState([start, end]);
  const [Page, setPage] = useState(1);

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
    setType([]);
    setBalance([]);
    setDateShow(false);
    setTypeShow(false);
    setBalanceShow(false);
    setReset(!Reset);
  };

  function isNotification(notification) {
    if (!balanceNotificationItem) {
      return notification.id === balanceNotification[0].id;
    } else {
      return notification.id === balanceNotificationItem;
    }
  }

  const body = balanceNotification.find(isNotification);

  useEffect(() => {
    if (
      text == "" &&
      new Date(dateValue[0]).getTime() === new Date(start).getTime() &&
      new Date(dateValue[1]).getTime() === new Date(end).getTime() &&
      balance.length == 0 &&
      type.length == 0
    ) {
      setTemp(balanceNotification);
      return setData(balanceNotification);
    } else {
      let stack = balanceNotification?.filter((e) => {
        const targetDate = new Date(e.timestamp);
        const targetTimezoneOffset = targetDate.getTimezoneOffset();
        const targetDateUTC = new Date(
          targetDate.getTime() + targetTimezoneOffset * 60 * 1000
        );

        const BalanceFilter = () => {
          if (balance.length) {
            const data = balance.map((item) => e.balanceplatform == item);
            return data.some((e) => e);
          } else {
            return true;
          }
        };
        const TypeFilter = () => {
          if (type.length) {
            const data = type.map((item) => e.type == item);
            return data.some((e) => e);
          } else {
            return true;
          }
        };

        if (
          (e.balanceplatform.includes(text) ||
            e.accountholderid.includes(text) ||
            e.balanceaccountid.includes(text) ||
            e.legalentityid.includes(text) ||
            e.paymentinstrumentid.includes(text) ||
            e.transferid.includes(text) ||
            e.psppaymentreference.includes(text) ||
            e.transactionid.includes(text)) &&
          TypeFilter() &&
          BalanceFilter() &&
          targetDateUTC.getTime() >= dateValue[0].getTime() &&
          targetDateUTC.getTime() <= dateValue[1].getTime()
        ) {
          console.log("eeee");
          return e;
        }
      });
      setTemp(stack);
      setData(stack);
    }
  }, [text, type, balance, dateValue]);

  useEffect(() => {
    balanceNotification?.forEach((e) => {
      if (e.type != "") {
        setTypeList((ele) => [
          ...ele.filter((item) => item != e.type.split(".").slice(1).join(".")),
          e.type.split(".").slice(1).join("."),
        ]);
      }
      if (e.balanceplatform != "") {
        setBalanceList((ele) => [
          ...ele.filter((item) => item != e.balanceplatform),
          e.balanceplatform,
        ]);
      }
    });
  }, [balanceNotification]);

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
              placeholder="Search by Platform, Account Holder, Balance Account, Legal Entity, Transfer ID, Transaction ID, PSP Reference or Payment Instrument"
            ></input>
          </div>
        </div>
      </div>
      <div className={styles.notificationFilter}>
        <div className={styles.eventCodeFilter} id={styles.account}>
          <div
            onClick={() => {
              setTypeShow(!TypeShow);
              setDateShow(false);
              setBalanceShow(false);
            }}
          >
            Type
          </div>
          <AccountBox
            show={TypeShow}
            setAccountShow={setTypeShow}
            data={TypeList}
            setAccount={setType}
            Reset={Reset}
            placeholder="Select Type"
            heading="Type"
          />
        </div>
        <div className={styles.accountFilter} id={styles.account}>
          <div
            onClick={() => {
              setBalanceShow(!BalanceShow);
              setDateShow(false);
              setTypeShow(false);
            }}
          >
            Balance Platform
          </div>
          <AccountBox
            show={BalanceShow}
            setAccountShow={setBalanceShow}
            data={BalanceList}
            setAccount={setBalance}
            Reset={Reset}
            placeholder="Select Balance Platform"
            heading="Balance Platform"
          />
        </div>
        <div className={styles.dateBoxFilter} id={styles.date}>
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
          <div className={styles.BalanceNotificationListHeader}>
            <div className={styles.timestamp}>Deliverd</div>
            <div className={styles.type}>Type</div>
            <div className={styles.balancePlatform}>Platform</div>
          </div>
          <div className={styles.notificationListTotal}>
            {data.map((notification) => (
              <BalanceNotificationItem
                key={notification.id}
                id={notification.id}
                timestamp={new Date(notification.timestamp)
                  .toUTCString()
                  .substring(5, notification.timestamp.length - 4)}
                type={notification.type.substring(16, notification.type.length)}
                balancePlatform={notification.balanceplatform}
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
          <pre>{JSON.stringify(body.balancenotification, null, 1)}</pre>
        </div>
      </div>
    </div>
  );
};

export default BalanceNotificationList;
