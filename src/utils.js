export const dateToAry = (date) => {
  const convertedDate = new Date(date);
  const [m, d, y] = convertedDate.toLocaleDateString('en-US').split('/');
  return [+y, +m, +d, +convertedDate.getDay()];
};

export const dateToObj = (rawDate) => {
  const [year, month, date] = dateToAry(rawDate);
  return { year, month, date };
};
