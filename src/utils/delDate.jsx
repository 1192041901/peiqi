/*
  计算距离当今已过去的天数（yyyy-mm-dd）
  返回负数表示已过去的天数，正数表示未来的天数
*/
export const delDate = (date) => {
  // 创建目标日期，设置为当天的开始时间（00:00:00）
  const targetDate = new Date(date + "T00:00:00");
  // 创建当前日期，也设置为当天的开始时间（00:00:00）
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  // 计算时间差（毫秒）
  const diffTime = -(targetDate - currentDate);
  // 转换为天数，使用 Math.round 而不是 Math.ceil
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
/*
  计算目标日期距离当今的天数（yyyy-mm-dd）
  用于每年重复的纪念日，自动计算今年或明年的日期
*/
export const delDate2 = (date) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  // 从 yyyy-mm-dd 格式中提取月日部分
  const dateParts = date.split("-");
  const month = dateParts[1];
  const day = dateParts[2];
  const monthDay = month + "-" + day;

  // 构造今年的目标日期
  const thisYearDate = new Date(currentYear + "-" + monthDay);

  // 判断今年的日期是否已经过了
  const isThisYearPassed = thisYearDate < currentDate;

  // 如果今年已经过了，就用明年的日期；否则用今年的日期
  const targetDate = isThisYearPassed
    ? new Date(currentYear + 1 + "-" + monthDay)
    : thisYearDate;

  const diffTime = Math.abs(targetDate - currentDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
