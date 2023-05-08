export function modifyDate(date) {
  const creationDate = Date.parse(new Date(date));
  const todayDate = Date.parse(new Date());
  const changeInDate = todayDate - creationDate;
  const days = Math.floor(changeInDate / 1000 / 60 / 60 / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  if (days < 1) {
    return 'сегодня';
  } if (days === 1 || days === 21 || days === 31) {
    return `${(days)} день назад`;
  } if ((days > 1 && days < 5) || (days > 21 && days < 25)) {
    return `${(days)} дня назад`;
  } if ((days >= 5 && days < 21) || (days >= 25 && days <= 31)) {
    return `${(days)} дней назад`;
  } if (days > 30 && days < 60) {
    return `${(months)} месяц назад`;
  } if (days >= 60 && days < 120) {
    return `${(months)} месяца назад`;
  } if (days >= 120 && days < 365) {
    return `${(months)} месяцев назад`;
  } if (days >= 365 && days < 730) {
    return `${(years)} год назад`;
  } if (days >= 730 && days < 1825) {
    return `${(years)} года назад`;
  } if (days >= 1825) {
    return `${(years)} лет назад`;
  }
  return '-';
}
