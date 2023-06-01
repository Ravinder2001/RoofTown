import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {

  return (
    <header className={styles.header}>
      <div className={styles.headerBar}>
        <Link className={styles.brandName} to="/">
          <p>ROOFTOWN</p>
        </Link>
        <div className={styles.headerChart}></div>
        <div className={styles.authentication}></div>
      </div>
    </header>
  );
};

export default Header;
