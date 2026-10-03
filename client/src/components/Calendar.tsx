import { useState } from "react";
import calendarIllustration from "../assets/plant-calendar.png";

const Calendar = () => {
  const [currentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = currentDate.getDate();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysArray: Array<number | null> = Array.from({ length: firstDayOfMonth }, () => null);
  for (let day = 1; day <= daysInMonth; day++) {
    daysArray.push(day);
  }

  return (
    <div>
      <div className="calendar">
        <h2>
          {currentDate.toLocaleDateString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <div className="calendar-grid">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="day-header">
              {day}
            </div>
          ))}
          {daysArray.map((day, index) => (
            <div
              key={index}
              className={`day-cell ${day === today ? "today" : ""}`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
      <div className="illustrations">
        <img src={calendarIllustration} alt="Teal flowering plant" />
      </div>
    </div>
  );
};

export default Calendar;
