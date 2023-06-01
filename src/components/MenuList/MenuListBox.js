import React from "react";
import { FiSettings } from "react-icons/fi";
import Dropdown from "react-bootstrap/Dropdown";

import styles from "./MenuListBox.module.css";

function MenuListBox({ MenuList, handleMenu }) {
  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">
        <FiSettings size={26} />
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.MenuList}>
        <div className={styles.heading}>Visible columns</div>
        {MenuList.map((e, index) => (
          <div key={index} className={styles.box} onClick={() => handleMenu({ name: e.id })}>
            <input type="checkbox" className={styles.check} name={e.id} id="" checked={e.status} />
            <div className={styles.text}>{e.title}</div>
          </div>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default MenuListBox;
