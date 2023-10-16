export const OTHER_MEALS_AMOUNT = 20.00;
export const ADMIN_MEALS_AMOUNT = OTHER_MEALS_AMOUNT / 2;

export const floatAddition = (floatArray) => {
  let floatTotal = 0;
  
  floatArray.forEach((float) => {
    floatTotal += float;
  })

  return floatTotal;
}

export const floatMultiplication = (int, float) => {

  if (!int) {
    int = 0;
  }

  return int * float;
}
