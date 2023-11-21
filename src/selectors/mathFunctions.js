export const OTHER_MEALS_AMOUNT = 20.00;
export const ADMIN_MEALS_AMOUNT = OTHER_MEALS_AMOUNT / 2;

export const floatAddition = (floatArray) => {
  let floatTotal = 0;
  
  floatArray.forEach((float) => {
    floatTotal += float;
  })

  const splitTotal = floatTotal.toString().split('.');
  if (splitTotal.length === 2 && splitTotal[1].length >= 3) {

    if (splitTotal[1][2] >= 5) {
      const floatTotalWithoutCents = splitTotal[0]+splitTotal[1].slice(0, 2);
      const roundedUpFloatTotal = Number(floatTotalWithoutCents) + 1;
      floatTotal = roundedUpFloatTotal / 100;
    }
    else {
      floatTotal = Number(splitTotal[0] + splitTotal[1].slice(0, 2)) / 100;
    }
  }
  return floatTotal;
}
export const floatSubtraction = (floatArray) => {
  let floatTotal = floatArray[0];
  floatArray.shift();
  floatArray.forEach((float) => {
    floatTotal -= float;
  })


  const splitTotal = floatTotal.toString().split('.');
  if (splitTotal.length === 2 && splitTotal[1].length >= 3) {

    if (splitTotal[1][2] >= 5) {
      const floatTotalWithoutCents = splitTotal[0]+splitTotal[1].slice(0, 2);
      const roundedUpFloatTotal = Number(floatTotalWithoutCents) + 1;
      floatTotal = roundedUpFloatTotal / 100;
    }
    else {
      floatTotal = Number(splitTotal[0] + splitTotal[1].slice(0, 2)) / 100;
    }
  }
  return floatTotal;
}

export const floatMultiplication = (int, float) => {

  if (!int) {
    int = 0;
  }

  return int * float;
}
