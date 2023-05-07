export const getDatePadTo2Digits = (num: Date) => {
  return num?.toString().padStart(2, "0");
};

export const isDayWeekend = (date: Date) => {
  return date.getDay() === 6 || date.getDay() === 0;
};
