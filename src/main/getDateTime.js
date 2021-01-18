module.exports = async function atomRun() {
  const format = this.data.format || 'YYYY-MM-DD';
  const inputDate = this.data.inputDate;
  const yearShift = this.data.yearShift;
  const monthShift = this.data.monthShift;
  const dateShift = this.data.dateShift;
  const hoursShift = this.data.hoursShift;
  const minutesShift = this.data.minutesShift;
  const secondsShift = this.data.secondsShift;

  const now = inputDate || new Date();
  if (yearShift) {
    now.setFullYear(now.getYear() + yearShift);
  }
  if (monthShift) {
    now.setMonth(now.getMonth() + monthShift);
  }
  if (dateShift) {
    now.setDate(now.getDate() + dateShift);
  }
  if (hoursShift) {
    now.setHours(now.getHours() + hoursShift);
  }
  if (minutesShift) {
    now.setMinutes(now.getMinutes() + minutesShift);
  }
  if (secondsShift) {
    now.setSeconds(now.getSeconds() + secondsShift);
  }

  const resolveData = {
    YYYY: String(now.getFullYear()),
    YY: String(now.getFullYear()).slice(2, 4),
    MM: `${now.getMonth() + 1}`.padStart(2, '0'),
    DD: `${now.getDate()}`.padStart(2, '0'),
    HH: `${now.getHours()}`.padStart(2, '0'),
    mm: `${now.getMinutes()}`.padStart(2, '0'),
    SS: `${now.getSeconds()}`.padStart(2, '0'),
  };

  let datetime = format;

  Object.keys(resolveData).forEach((v) => {
    datetime = datetime.replace(v, resolveData[v]);
  });

  await this.log({ text: `Date with format ${format}: ${datetime}` });

  return { datetime };
};
