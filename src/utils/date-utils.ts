import range from "lodash/range";
import getYear from "date-fns/getYear";

export const isDayWeekend = (date: Date) => {
  return date.getDay() === 6 || date.getDay() === 0;
};

export const years = range(getYear(new Date()) - 1, getYear(new Date()) + 6);

//Преобразование в формат: YYYY-MM-DD
export const formatDate = (date: Date) => {
  return date.toISOString().slice(0, 10);
};
