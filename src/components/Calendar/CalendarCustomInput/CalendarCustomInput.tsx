import styles from "./CalendarCustomInput.module.scss";
import icon from "../../../images/icons/calendar.svg";
import { LegacyRef, MouseEventHandler, forwardRef } from "react";

interface ICalendarCustomInput {
  value?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  error: boolean;
}

export const CalendarCustomInput = forwardRef(
  (
    { value, onClick, error }: ICalendarCustomInput,
    ref: LegacyRef<HTMLDivElement>
  ) => (
    <div
      className={`${styles.date} ${error && styles.error}`}
      onClick={onClick}
      ref={ref}
    >
      <p className={`${styles.paragraph} ${error && styles.error}`}>{value}</p>
      <img className={styles.image} src={icon} alt="икнока календаря" />
    </div>
  )
);
