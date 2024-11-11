import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameDay,
  isBefore,
  isWithinInterval,
} from "date-fns";

const CustomDatePicker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState({
    startDate: null,
    endDate: null,
  });

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleDateClick = (day) => {
    if (
      !selectedRange.startDate ||
      (selectedRange.startDate && selectedRange.endDate)
    ) {
      // Start new selection
      setSelectedRange({ startDate: day, endDate: null });
    } else if (isBefore(day, selectedRange.startDate)) {
      // If clicked date is before start date, reset startDate to this date
      setSelectedRange({ startDate: day, endDate: selectedRange.startDate });
    } else {
      // Set the end date
      setSelectedRange({ ...selectedRange, endDate: day });
    }
  };

  const renderCalendar = (monthOffset) => {
    const monthStart = startOfMonth(addMonths(currentDate, monthOffset));
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const isSelected =
          (selectedRange.startDate &&
            isSameDay(day, selectedRange.startDate)) ||
          (selectedRange.endDate && isSameDay(day, selectedRange.endDate)) ||
          (selectedRange.startDate &&
            selectedRange.endDate &&
            isWithinInterval(day, {
              start: selectedRange.startDate,
              end: selectedRange.endDate,
            }));

        days.push(
          <div
            key={day}
            onClick={() => handleDateClick(day)}
            className={`py-2 text-center rounded-lg cursor-pointer ${
              isSelected
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {format(day, "d")}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-2" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return (
      <div className="p-4">
        <div className="text-center font-semibold">
          {format(monthStart, "MMMM yyyy")}
        </div>
        <div className="grid grid-cols-7 gap-2 mt-2 text-gray-500">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className="text-center">
              {day}
            </div>
          ))}
        </div>
        {rows}
      </div>
    );
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4">
      <div className="flex justify-between mb-4">
        <button onClick={handlePrevMonth}>&lt;</button>
        <div className="flex gap-4">
          {renderCalendar(0)}
          {renderCalendar(1)}
          {renderCalendar(2)}
        </div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
    </div>
  );
};

export default CustomDatePicker;
