import React, { useEffect } from "react";

import styles from "./PaymentTable.module.css";
import moment from "moment"

function PaymentTable({ data, MenuList }) {
  useEffect(() => {
    const table = document.getElementById("resizeMe");
    const cols = table.querySelectorAll("th");

    [].forEach.call(cols, (col) => {
      const resizer = document.createElement("div");
      resizer.classList.add(styles.resizer);
      resizer.style.height = `${table.offsetHeight}px`;
      col.appendChild(resizer);
      createResizableColumn(col, resizer);
    });
  }, [MenuList]);

  const createResizableColumn = (col, resizer) => {
    let x = 0;
    let w = 0;

    const mouseDownHandler = (e) => {
      x = e.clientX;
      const styles = window.getComputedStyle(col);
      w = parseInt(styles.width, 10);
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    };

    const mouseMoveHandler = (e) => {
      const dx = e.clientX - x;
      col.style.width = `${w + dx}px`;
    };

    const mouseUpHandler = () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };

    resizer.addEventListener("mousedown", mouseDownHandler);
    resizer.addEventListener("mouseup", mouseUpHandler);
  };

  const resizerHoverHandler = (e) => {
    e.target.classList.add("resizing");
  };

  const resizerMouseUpHandler = (e) => {
    e.target.classList.remove("resizing");
  };
  return (
    <table className="table" id="resizeMe">
      <thead className={styles.thead}>
        <tr>
          {MenuList?.map((e) => (
            <>{e.status && <th>{e.title}</th>}</>
          ))}
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {data?.map((e) => (
          <tr>
            {MenuList?.map((el) => {
              let className = {};
              let text = e[el.key];

              if (el.title == "Status") {
                className = styles.status;
                text = "\u2981";
              }
              // if (el.title == "Date") {
              //   text=moment(text).format("DD/MM/YYYY hh:mm:ss")
              //   console.log(moment(text).format("DD/MM/YYYY"));
              // }
              return (
                <>
                  {el.status && (
                    <td
                      className={className}
                      style={
                        el.title == "Status"
                          ? {
                              color: e.success === "true" ? "green" : "red",
                            }
                          : {}
                      }
                    >
                      {text}
                    </td>
                  )}
                </>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PaymentTable;
