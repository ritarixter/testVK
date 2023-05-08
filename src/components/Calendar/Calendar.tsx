import { FC } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Calendar.module.scss";
import { isDayWeekend, years } from "../../utils";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import { CalendarCustomInput } from "./CalendarCustomInput";
import { TCalendar } from "../../types";
import { dateFormat, months } from "./constants";

export const Calendar: FC<TCalendar> = ({ startDate, setStartDate, error }) => {
  const dayClassNameFunction = (date: Date) => {
    if (date === startDate) {
      return styles.currentDay;
    }
    if (isDayWeekend(date)) {
      return styles.dayWeekend;
    }
    return styles.days;
  };

  return (
    <div className={styles.wrapper}>
      <DatePicker
        calendarClassName={styles.datepicker}
        className={styles.style}
        dayClassName={dayClassNameFunction}
        showPopperArrow={false}
        dateFormat={dateFormat}
        locale={"en-GB"}
        selected={startDate}
        onChange={(date) => setStartDate(date as Date)}
        shouldCloseOnSelect={false}
        formatWeekDay={() => ""}
        customInput={<CalendarCustomInput error={error} />}
        renderCustomHeader={({ date, changeYear, changeMonth }) => (
          <div className={styles.container}>
            <select
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(Number(value))}
              className={styles.select}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
              className={styles.select}
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
      />
    </div>
  );
};
