const getDay = (date) => {
  // console.log(date);
  let day = date.getUTCDate();
  if (day.toString().length === 1) {
    day = '0' + day;
  }
  // console.log(day);
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




export const getDDMMYYDate = (date, separator = '/') => {
  
  let dateToString = getDay(date) + separator;
  dateToString += getMonth(date) + separator;
  dateToString += getYear(date);

  return dateToString
}

export const getHHMMTime = (date) => {
  console.log("in getHHMMTime");
  console.log(date);
  const frDate = date.toUTCString('fr-FR', { timeZone: 'Europe/Paris' });
  console.log(frDate);

  const splitDate = frDate.split(' ');
  // console.log(splitDate);
  const timeToString = splitDate[4].slice(0, 5);

  return timeToString;
}

export const getDateForInput = (date) => {
  if (date) {
    return date.split('T')[0];
  }
  return '';
}

export const getHourForInput = (date) => {
  // TODO 
  if (date) {
    const splitDate = date.split('T')[1];
    return splitDate.split('+')[0];
  }
  return ''; 
}
