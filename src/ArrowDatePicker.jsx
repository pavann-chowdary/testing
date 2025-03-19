import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ArrowDatePicker({ value, onChange }) { // Accept value and onChange props
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const datePickerRef = useRef(null);

  const handleDateChange = (date) => {
    onChange(date); // Call the onChange prop
    setIsCalendarOpen(false);
  };

  const navigateDays = (days) => {
    const newDate = new Date(value);
    newDate.setDate(newDate.getDate() + days);
    onChange(newDate); // Call the onChange prop
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button onClick={() => navigateDays(-1)}>{"<"}</button>
        <div style={{ marginLeft: '10px', border: '1px solid #ccc', padding: '5px' }}>
          <span onClick={toggleCalendar}>
            {value.toDateString()}
          </span>
        </div>
        <button onClick={() => navigateDays(1)}>{">"}</button>
      </div>

      {isCalendarOpen && (
        <DatePicker
          ref={datePickerRef}
          selected={value}
          onChange={handleDateChange}
          inline
        />
      )}
    </div>
  );
}

export default ArrowDatePicker;