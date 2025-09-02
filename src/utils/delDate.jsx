export const delDate = (date) => {
  const targetDate = new Date(date);
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate - targetDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
