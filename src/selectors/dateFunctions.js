const getDay = (date) => {

  let day = date.getDate();
  if (day.toString().length === 1) {
    day = '0' + day;
  }
  return day;
}
const getMonth = (date) => {
  let month = date.getMonth() + 1;
  if (month.toString().length === 1) {
    month = '0' + month;
  }
  return month;
}
const getYear = (date) => {
  return date.getFullYear().toString().slice(2);
}
const getHours = (date) => {
  let hours = date.getHours();
  if (hours.toString().length === 1) {
    hours = '0' + hours;
  }
  return hours;
}
const getMinutes = (date) => {
  let minutes = date.getMinutes();
  if (minutes.toString().length === 1) {
    minutes = '0' + minutes;
  }
  return minutes;
}




export const getDDMMYYDate = (date) => {
  let dateToString = getDay(date) + '/';
  dateToString += getMonth(date) + '/';
  dateToString += getYear(date);

  return dateToString
}

export const getHHMMTime = (date) => {
  let timeToString = getHours(date) + ':';
  timeToString += getMinutes(date);

  return timeToString
}
