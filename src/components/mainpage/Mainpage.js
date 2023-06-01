import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
// import { layoutActions } from "../../store/layoutSlice";
import {
  MdArrowForwardIos,
  MdArrowBackIosNew,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Mainpage.css";

// import required modules
import { Pagination, Navigation } from "swiper";

const Mainpage = () => {
  const [swiperRef, setSwiperRef] = useState(null);
  const [horizontalSwiperRef, setHorizontalSwiperRef] = useState(null);

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleHorizontalPrevious = useCallback(() => {
    horizontalSwiperRef?.slidePrev();
  }, [horizontalSwiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  const handleHorizontalNext = useCallback(() => {
    horizontalSwiperRef?.slideNext();
  }, [horizontalSwiperRef]);

  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const date = new Date();

  const getDate = date.getDate();
  const getYear = date.getFullYear();
  const getDay = date.getDay();
  const getMonth = date.getMonth();
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weekday = dayNames[getDay];
  // const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const monthNamesShort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNamesShort[getMonth];
  const hours = date.getHours();
  const ampm = hours >= 12 ? "pm" : "am";
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const seconds = second < 10 ? "0" : "";
  const minutes = minute < 10 ? "0" : "";

  const hoursMinSeconds =
    date.getHours() +
    ":" +
    minutes +
    date.getMinutes() +
    ":" +
    seconds +
    date.getSeconds() +
    " " +
    ampm;
  // " - " +
  // tz;

  return (
    <div className="slide">
      <div className="back" onClick={handlePrevious}>
        <MdArrowBackIosNew size={44} />
      </div>
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={4}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
        breakpoints={{
          480: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          992: {
            slidesPerView: 4,
          },
        }}
        className="swiper"
      >
        <SwiperSlide className="horizontalSlide">
          <Link
            className="link"
            style={{ color: "#000000", textDecoration: "none" }}
            to="/payments"
          >
            Payments
          </Link>
        </SwiperSlide>
        <SwiperSlide className="horizontalSlide">Demo Store</SwiperSlide>
        <SwiperSlide className="slide3">
          {" "}
          <div className="up" onClick={handleHorizontalPrevious}>
            <MdKeyboardArrowUp size={28} />
          </div>
          <Swiper
            loop={true}
            onSwiper={setHorizontalSwiperRef}
            slidesPerView={3}
            spaceBetween={18}
            className="swiper-v"
            direction={"vertical"}
            modules={[Navigation]}
          >
            <SwiperSlide className="verticalSlide">
              <Link
                className="link"
                style={{ color: "#000000", textDecoration: "none" }}
                to="/snake"
              >
                Snake
              </Link>
            </SwiperSlide>
            <SwiperSlide className="verticalSlide">Test2</SwiperSlide>

            <SwiperSlide className="verticalSlide">Test3</SwiperSlide>
            <SwiperSlide className="verticalSlide">Test4</SwiperSlide>
            <SwiperSlide className="verticalSlide">Test5</SwiperSlide>
            <SwiperSlide className="verticalSlide">
              <div className="clock">
                <div className="clockDate">
                  <b>
                    {weekday}, {month} {getDate}, {getYear}
                  </b>
                </div>
                <div className="clockTime">{hoursMinSeconds}</div>
              </div>
            </SwiperSlide>
          </Swiper>
          <div className="down" onClick={handleHorizontalNext}>
            <MdKeyboardArrowDown size={28} />
          </div>
        </SwiperSlide>
        <SwiperSlide className="horizontalSlide">
          <Link
            className="link"
            style={{ color: "#000000", textDecoration: "none" }}
            to="/notification"
          >
            Notifications
          </Link>
        </SwiperSlide>
        <SwiperSlide className="horizontalSlide">Home</SwiperSlide>
        <SwiperSlide className="horizontalSlide">Contact</SwiperSlide>
        <SwiperSlide className="horizontalSlide">About</SwiperSlide>
        <SwiperSlide className="horizontalSlide">Alert</SwiperSlide>
      </Swiper>
      {/* <Swiper
          onSwiper={setSwiperRef}
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          // navigation={true}
          breakpoints={{
            480: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            992: {
              slidesPerView: 4,
            },
          }}
          modules={[Navigation]}
          // className={styles.swiper}
        >
          <SwiperSlide className={styles.horizontalSlide}>Payments</SwiperSlide>
          <SwiperSlide className={styles.horizontalSlide}>
            Demo Store
          </SwiperSlide>
          <SwiperSlide className={styles.verticalSlide}>
            {" "}
            <div className={styles.up} onClick={handleHorizontalPrevious}>
              <button className={styles.button}>
                <MdKeyboardArrowUp size={28} />
              </button>
            </div>
            <Swiper
              loop={true}
              onSwiper={setHorizontalSwiperRef}
              slidesPerView={3}
              spaceBetween={20}
              className={styles.swiperLight}
              direction={"vertical"}
              modules={[Navigation]}
            >
              <SwiperSlide className={styles.swiperLightBox}>Test1</SwiperSlide>
              <SwiperSlide className={styles.swiperLightBox}>Test2</SwiperSlide>
              <SwiperSlide className={styles.swiperLightBox}>Test3</SwiperSlide>
              <SwiperSlide className={styles.swiperLightBox}>Test4</SwiperSlide>
              <SwiperSlide className={styles.swiperLightBox}>Test5</SwiperSlide>
              <SwiperSlide className={styles.swiperLightBox}>Test6</SwiperSlide>
            </Swiper>
            <div className={styles.down} onClick={handleHorizontalNext}>
              <button className={styles.button}>
                <MdKeyboardArrowDown size={28} />
              </button>
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.horizontalSlide}>
            Notification
          </SwiperSlide>
          <SwiperSlide className={styles.horizontalSlide}>Home</SwiperSlide>
          <SwiperSlide className={styles.horizontalSlide}>Contact</SwiperSlide>
          <SwiperSlide className={styles.horizontalSlide}>About</SwiperSlide>
          <SwiperSlide className={styles.horizontalSlide}>Alert</SwiperSlide>
        </Swiper> */}
      <div className="forward" onClick={handleNext}>
        <MdArrowForwardIos size={44} />
      </div>
    </div>
  );
};

// const Mainpage = () => {
//   // const dispatch = useDispatch();

//   // useEffect(() => {
//   //   dispatch(stockPrice());
//   // }, [dispatch]);

//   // const changeLayout = () => {
//   //   dispatch(layoutActions.footerProduct());
//   //   dispatch(layoutActions.showCardIcon());
//   // };

//   return (
//     <div className={styles.mainPageContainer}>
//       <div className={styles.donation}></div>
//       <div className={styles.slide}>
//         <div className={styles.left}>
//           <MdArrowBackIosNew size={42}/>
//         </div>
//         <div className={styles.demoStore}>Demo Store</div>
//         <div className={styles.payments}>
//           <Link
//             className={styles.link}
//             style={{ color: "#000000", textDecoration: "none" }}
//             to="/pong"
//           >
//             Payments
//           </Link>
//         </div>
//         <div className={styles.notifications}>
//           <Link
//             style={{ color: "#000000", textDecoration: "none" }}
//             to="/notification"
//           >
//             <p>Notifications</p>
//           </Link>
//         </div>
//         <div className={styles.playStore}>
//           <div className={styles.up}><MdKeyboardArrowUp size={30}/></div>
//           <div className={styles.clock}>test</div>
//           <div className={styles.adyen}>test</div>
//           <div className={styles.etherium}>test</div>
//           <div className={styles.down}><MdKeyboardArrowDown size={30}/></div>
//         </div>
//         <div className={styles.right}>
//           <MdArrowForwardIos size={42}/>
//         </div>
//       </div>

//     </div>
//   );
// };

export default Mainpage;
