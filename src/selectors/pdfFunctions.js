/**
 * 
 * @returns string
 */
export const setValidationDate = () =>  {
  const nowTimestamp = Date.now();
  const now = new Date(nowTimestamp);
  const date = getDDMMYYDate(now, '-');
  const splitDate = now.toString().split(' ');
    
  return date + ' ' + splitDate[4];
}

/**
 * 
 * @param {string} date 
 * @returns string
 */
export const setValidationDateForPdf = (date) =>  {
 return date.split(' ')[0] + ' à ' + date.split(' ')[1]; 
}
