export const dateToAry = (rawDate) => {
  const newDate = new Date(rawDate);
  const [month, date, year] = newDate.toLocaleDateString('en-US').split('/');
  return [+year, +month, +date];
};

export const dateToObj = (rawDate) => {
  const [year, month, date] = dateToAry(rawDate);
  return { year, month, date };
};
