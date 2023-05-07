import range from "lodash/range";
import getYear from "date-fns/getYear";

export const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export const years = range(getYear(new Date()) - 1, getYear(new Date()) + 6);
