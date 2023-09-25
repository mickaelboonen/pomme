export const divideValidationActorsArray = (directorsArray, allValidators) =>  {
  let firstPartActors = [];
  let secondPartActors = [];

  if (directorsArray.length > 0) {
    let middle;

    if (directorsArray[0].role.includes('Directeur.rice UPR')) {
      middle = 2;
    }
    else {
      middle = 1;
    }

    firstPartActors = allValidators.slice(0, middle);
    secondPartActors = allValidators.slice(middle);

  }
  else {
    firstPartActors = allValidators;
  }

  return [firstPartActors, secondPartActors];
}
