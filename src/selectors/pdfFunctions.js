import { getDDMMYYDate, getHHMMTime } from "./dateFunctions";

/**
 * 
 * @returns string
 */
export const setValidationDate = () =>  {

  const nowTimestamp = Date.now();
  const now = new Date(nowTimestamp);
  const date = getDDMMYYDate(now , '-');
  const splitDate = now.toString().split(' ');

  return date + ' ' + splitDate[4];
}
/**
 * 
 * @returns string
 */
export const setExistingValidationDate = (givenDate) =>  {
  const splitGivenDate = givenDate.split('T');
  const splitDate = splitGivenDate[0].split('-');

  return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]} ${splitGivenDate[1].split('+')[0]}`;
}

/**
 * 
 * @param {string} date 
 * @returns string
 */
export const setValidationDateForPdf = (date) =>  {
 return date.split(' ')[0] + ' à ' + date.split(' ')[1]; 
}
