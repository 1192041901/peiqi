/*
  计算距离当今已过去的天数（yyyy-mm-dd）
*/
export const delDate = (date) => {
  const targetDate = new Date(date);
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate - targetDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
/*
  计算目标日期距离当今的天数（mm-dd）
*/
export const delDate2 = (date) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  // 构造今年的目标日期
  const thisYearDate = new Date(currentYear + "-" + date);

  // 判断今年的日期是否已经过了
  const isThisYearPassed = thisYearDate < currentDate;

  // 如果今年已经过了，就用明年的日期；否则用今年的日期
  const targetDate = isThisYearPassed
    ? new Date(currentYear + 1 + "-" + date)
    : thisYearDate;

  const diffTime = Math.abs(targetDate - currentDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
