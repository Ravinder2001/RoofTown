import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { GrPowerReset } from "react-icons/gr";
import { AiOutlineSearch } from "react-icons/ai";

import PaymentTable from "../PaymentTable/PaymentTable";
import MenuListBox from "../MenuList/MenuListBox";
import DatePickerModal from "../DatePickerModal/DatePickerModal";
import AccountBox from "../AccountBox/AccountBox";
import AmountBox from "../AmountBox/AmountBox";
import { DefaultVisibleColumn } from "../../Utils/Constant";

import styles from "./PaymentList.module.css";

const PaymentList = () => {
  let start = new Date("2023-03-01 11:00:00"); // moment().subtract(15, "days")["_d"]
  let end = new Date("2023-03-24 23:59:59"); //moment().subtract(1, "days")["_d"]
  const fullPaymentList = useSelector((state) => state.database.paymentList);

  const [data, setData] = useState(fullPaymentList);
  const [MenuList, setMenuList] = useState([]);
  const [AccountList, setAccountList] = useState([]);
  const [DateShow, setDateShow] = useState(false);
  const [AccountShow, setAccountShow] = useState(false);
  const [AmountShow, setAmountShow] = useState(false);

  //states for filter options
  const [text, setText] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [account, setAccount] = useState([]);
  const [status, setStatus] = useState("");
  const [dateValue, setDateValue] = useState([start, end]);
  const [Range, setRange] = useState({ min: 0, max: 1000 });
  const [Reset,setReset]=useState(false)
  

  const handleInputFilter = (e) => {
    let name = e.target.name;
    let text = e.target.value;
    switch (name) {
      case "Main":
        return setText(text);
      case "Payment Method":
        return setPaymentMethod(text);
      case "Status":
        return setStatus(text);
      default:
        return;
    }
  };

  const handleDateRange = (e) => {
    if (e) {
      const startDate = new Date(e[0]);
      const endDate = new Date(e[1]);
      setDateValue([startDate, endDate]);
    } else {
      setDateValue([start, end]);
    }
  };

  const handleReset = () => {
    setText("");
    setAccount([]);
    setPaymentMethod("");
    setStatus("");
    setDateValue([start, end]);
    setDateShow(false);
    setAccountShow(false);
    setAmountShow(false);
    setRange({ min: 0, max: 1000 });
    setReset(!Reset)
  };

  const handleMenu = ({ name }) => {
    const data = MenuList?.map((e) => {
      if (e.id == name) {
        return {
          title: e.title,
          status: !e.status,
          id: e.id,
          key: e.key,
        };
      } else {
        return e;
      }
    });
    setMenuList(data);
  };

  useEffect(() => {
    if (
      text == "" &&
      paymentMethod == "" &&
      account.length == 0 &&
      status == "" &&
      new Date(dateValue[0]).getTime() === new Date(start).getTime() &&
      new Date(dateValue[1]).getTime() === new Date(end).getTime() &&
      Range.min == 0 &&
      Range.max == 1000
    ) {
      return setData(fullPaymentList);
    } else {
      let stack = fullPaymentList?.filter((e) => {
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
        if (
          (e.pspreference.includes(text) ||
            e.merchantreference.includes(text) ||
            e.shopperreference.includes(text)) &&
          e.paymentmethod.includes(paymentMethod) &&
          e.success.includes(status) &&
          targetDateUTC.getTime() >= dateValue[0].getTime() &&
          targetDateUTC.getTime() <= dateValue[1].getTime() &&
          e.amount >= Range.min &&
          e.amount <= Range.max &&
          AccountFilter()
        ) {
          return e;
        }
      });
      setData(stack);
    }
  }, [text, paymentMethod, account, status, dateValue, Range]);

  useEffect(() => {
    let stack = [];
    DefaultVisibleColumn?.map((e) =>
      stack.push({
        title: e.title,
        status: e.default,
        id: e.id,
        key: e.key,
      })
    );
    setMenuList(stack);

    fullPaymentList?.forEach((e) => {
      setAccountList((ele) => [
        ...ele.filter((item) => item != e.merchantaccount),
        e.merchantaccount,
      ]);
      return e.merchantaccount;
    });
  }, [fullPaymentList]);
  return (
    <div className={styles.paymentContainer}>
      <div className={styles.paymentListSearch}>
        <div className={styles.paymentSearchItem}>
          <div className={styles.paymentSearchIcon}>
            <AiOutlineSearch size={20} color="black" />
          </div>
          <div className={styles.paymentSearchText}>
            <input
              className={styles.paymentTextSearch}
              placeholder="Search by PSP Reference, Merchant Reference, or Shopper Reference"
              name="Main"
              value={text}
              onChange={handleInputFilter}
            ></input>
          </div>
        </div>
      </div>
      <div className={styles.paymentListFilter}>
        <div>
          <div className={styles.methodFilter}>
            <input
              type="text"
              name="Payment Method"
              placeholder="Payment Method"
              value={paymentMethod}
              onChange={handleInputFilter}
              className={styles.filterInput}
            />
          </div>
          <div className={styles.accountFilter} id={styles.account}>
            <div
              onClick={() => {
                setAccountShow(!AccountShow);
                setDateShow(false);
                setAmountShow(false);
              }}
            >
              Account
            </div>
            <AccountBox
              show={AccountShow}
              setAccountShow={setAccountShow}
              data={AccountList}
              setAccount={setAccount}
              account={account}
              Reset={Reset}
              placeholder="Select Account"
            />
          </div>
          <div className={styles.accountFilter} id={styles.amount}>
            <div
              onClick={() => {
                setAmountShow(!AmountShow);
                setDateShow(false);
                setAccountShow(false);
              }}
            >
              Amount
            </div>
            <AmountBox
              show={AmountShow}
              setAmountShow={setAmountShow}
              setRange={setRange}
              Range={Range}
            />
          </div>
          <div className={styles.statusFilter}>
            <input
              type="text"
              name="Status"
              placeholder="Status"
              value={status}
              onChange={handleInputFilter}
              className={styles.filterInput}
            />
          </div>
          <div className={styles.statusFilter}>
            <div
              onClick={() => {
                setDateShow(!DateShow);
                setAccountShow(false);
                setAmountShow(false);
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
            <GrPowerReset size={15} />
            <div className={styles.resetText}>Reset</div>
          </div>
        </div>
        <div className={styles.menuBtn}>
          <MenuListBox MenuList={MenuList} handleMenu={handleMenu} />
        </div>
      </div>
      <div className={styles.tableBox}>
        <PaymentTable data={data} MenuList={MenuList} />
      </div>
    </div>
  );
};

export default PaymentList;
