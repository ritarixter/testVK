export const isFutureDate = ({
  date,
  currentDate,
}: {
  date: Date;
  currentDate: Date;
}): boolean => {
  if (date.getFullYear() >= currentDate.getFullYear()) {
    if (date.getFullYear() === currentDate.getFullYear()) {
      if (date.getMonth() >= currentDate.getMonth()) {
        if (date.getMonth() === currentDate.getMonth()) {
          if (date.getDate() >= currentDate.getDate()) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      }
      else {
        return false
      }
    } else {
      return true;
    }
  } else {
    return false;
  }
};
