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

export const selectActorsToDisplay = (actors, type, isAdvanceRequested = false) => {
  // Setting the array for actors to be displayed in the list
  return actors.map((actor) => {

    // Removing the DAF gest and the accountant when there is no advance requested
    if (!isAdvanceRequested && (actor.cptLogin === 'gest_daf' || actor.role === 'Agent Comptable')) {
      return null;
    }

    // Removing the VP and the PAPSA director if it's not an OM for the SUAPS
    if (type !== 'admin-suaps' && (actor.role === 'Directrice Département (PAPSA)' || actor.role === 'Vice-Président Formation')) {
      return null;
    }
    return actor;
  }).filter((actor) => actor !== null);

}
export const divideActors = (actors, directors, isOm = true) => {
  let firstPartActors = [];
  let secondPartActors = [];

  if (directors.length > 0) {
    let middle;

    if (directors[0].role.includes('UPR')) {
      // middle = 4;
      isOm ? middle = 4 : middle = 2;
    }
    else if ( directors[0].role.includes('Département')) {
      isOm ? middle = 3 : middle = 1;
    }
    else {
      middle = 1;
    }

    firstPartActors = actors.slice(0, middle);
    secondPartActors = actors.slice(middle);
  }
  else {
    firstPartActors = actors;
  }

  return [firstPartActors, secondPartActors];
}
