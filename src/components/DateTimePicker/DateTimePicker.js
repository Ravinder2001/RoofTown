import React, { useState } from "react";

import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Import default styles
import "react-date-range/dist/theme/default.css";
function DateTimePicker({ show, dateValue, setTempDate, setDateStatus }) {
  const handleChange = (e) => {
    setTempDate(e);
  };
  const [dateRange, setDateRange] = useState([
    {
      startDate: dateValue[0],
      endDate: dateValue[1],
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setTempDate([ranges.selection.startDate, ranges.selection.endDate]);
    setDateRange([ranges.selection]);
  };

  return <DateRangePicker ranges={dateRange} onChange={handleSelect} />;
}

export default DateTimePicker;
