import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ArrowDatePicker() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const datePickerRef = useRef(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
  };

  const navigateDays = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button onClick={() => navigateDays(-1)}>{"<"}</button> {/* Backward arrow */}
        <div style={{ marginLeft: '10px', border: '1px solid #ccc', padding: '5px' }}>
          <span onClick={toggleCalendar}>
            {selectedDate.toDateString()}
          </span>
        </div>
        <button onClick={() => navigateDays(1)}>{">"}</button> {/* Forward arrow */}
      </div>

      {isCalendarOpen && (
        <DatePicker
          ref={datePickerRef}
          selected={selectedDate}
          onChange={handleDateChange}
          inline
        />
      )}
    </div>
  );
}

export default ArrowDatePicker;