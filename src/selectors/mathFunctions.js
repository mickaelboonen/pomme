export const ADMIN_MEALS_AMOUNT = '7,63';
export const OTHER_MEALS_AMOUNT = '15,25';

export const floatAddition = (floatArray) => {
  let floatTotal = 0;
  
  floatArray.forEach((float) => {
    if (typeof float === 'number') {
      float = float.toString() + ',00';
    }
    floatTotal += Number(float.replace(',', ''));
  })

  const floatResult =  floatTotal.toString();
  
  if (floatResult === '0') {
    return '0,00';
  }
  else {
    return floatResult.slice(0, floatResult.length - 2) + ',' + floatResult.slice(floatResult.length - 2);
  }
}

export const floatMultiplication = (int, float) => {
  const floatX100 = Number(float.replace(',', ''));
  const totalX100 = floatX100 * int;

  const floatResult =  totalX100.toString();
  
  if (floatResult === '0') {
    return '0,00';
  }
  else {
    return floatResult.slice(0, floatResult.length - 2) + ',' + floatResult.slice(floatResult.length - 2);
  }
}
