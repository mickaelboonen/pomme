

  export const filterEfTransportsFields = (fields, data) => {

    const {
      authorizations,
      taxi,
      ferry,
      transport_class,
      public_transports,
    } = data;

    const fieldsToBeDisplayed = [];
    
    if (authorizations.length > 0) {
      const { type } = authorizations[0];
      if (type === 'company-car') {
        fieldsToBeDisplayed.push(fields.find((field) => field.formField === 'fuel'));
      }
      else if (type === 'rent-car') {
        fieldsToBeDisplayed.push(fields.find((field) => field.formField === 'rentCar'));
      }
      
      fieldsToBeDisplayed.push(fields.find((field) => field.formField === 'toll'));
      fieldsToBeDisplayed.push(fields.find((field) => field.formField === 'parking'));
    }
    
    if (taxi) {
      fieldsToBeDisplayed.push(fields.find((field) => field.formField === 'taxi'))
    }
    
    if (ferry) {
      fieldsToBeDisplayed.push(fields.find((field) => field.formField === 'ferry'))
    }

    if (public_transports) {
      fieldsToBeDisplayed.push(fields.find((field) => field.formField === 'publicTransports'))
    }

    if (transport_class.length > 0) {
      transport_class.forEach((transport) => {
        if ((transport.includes('first') || transport.includes('second')) && fieldsToBeDisplayed.indexOf(fields[1]) === -1) {
          fieldsToBeDisplayed.push(fields.find((field) => field.formField === 'train'))
        }
        else if ((transport.includes('business') || transport.includes('eco')) && fieldsToBeDisplayed.indexOf(fields[0]) === -1)
          fieldsToBeDisplayed.push(fields.find((field) => field.formField === 'plane'))
      })
    }

    return fieldsToBeDisplayed;
  } 

/**
 * Returns an array of validation rules for the mission part for the OM or the EF 
 * @param {boolean} isEfForm 
 * @param {boolean} isFormModified 
 * @returns 
 */
export const defineValidationRulesForMission = (isEfForm, isFormModified, isScientific = false) => {

  let errorMessages = {
    missionPurpose: null,
    missionPurposeFile: null,
    departure: null,
    departurePlace: null,
    comeback: null,
    comebackPlace: null,
    region: null,
    country: null,
    abroadCosts: null,
    budget: null,
    presentation: null,
    streetNumber: null,
    streetType: null,
    streetName: null,
    postCode: null,
    city: null,
    visa: null,
    visaPayment: null,
    sciencePayment: null,
  }

  let requiredErrorMessages = {
    abroadCosts: 'Merci de renseigner votre forfait de remboursement.',
    missionPurpose: 'Merci de renseigner le motif de la mission.',
    departure: "Veuillez renseigner le jour et l'heure de départ.",
    departurePlace: "Veuillez renseigner le lieu de départ lors de votre départ en mission.",
    comeback: "Veuillez renseigner le jour et l'heure du retour.",
    comebackPlace: "Veuillez renseigner le lieu d'arrivée lors de votre retour de mission.",
    region: "Merci de sélectionner l'option qui correspond.",
    streetType: "Merci de renseigner le type de voie.",
    streetName: "Merci de renseigner le nom de la voie (sans le type).",
    postCode: "Merci de renseigner le code postal.",
    city: "Merci de renseigner la ville où a lieu la mission.",
    visa: 'Veuillez renseigner le champ.',
    visaPayment: "Veuillez renseigner le champ.",
  }

  if (isEfForm) {
    if (isFormModified) {
      errorMessages = requiredErrorMessages;
    }
  }
  else {
    errorMessages = requiredErrorMessages;
  }

  return errorMessages;
}

/**
 * 
 * @param {string} missionStep Is it departure time or return time
 * @param {integer} hour 
 * @param {integer} mealNumber 
 * @returns {integer} mealNumber
 */
export const handlePartialDayMeals = (missionStep, hour, mealNumber) => {
  
    if (missionStep === 'departure') {
      
      if (hour >= 21) {
        return mealNumber;
      }
      else if (hour >= 14) {
        mealNumber += 1;
      }
      
      else if (hour > 11) {
        mealNumber += 1;
      }
      else {
        mealNumber += 2;
      }
    }
    else {
      if (hour >= 21) {
        mealNumber += 2;
      }
      else if (hour >= 14) {
        mealNumber += 1;
      }
      // else if (hour > 11) {
      //   mealNumber += 2;
      // }

    }
    return mealNumber;
}

export const getMaxMealsAndNights = (data, forNights = false) => {

    let maxMealNumber = 0;
    
    const depart = new Date(data.departure);
    const comeback = new Date(data.comeback);
    
    const firstDay = depart.getDate();
    const lastDay = comeback.getDate();
    

    const isSameMonth = depart.getMonth() === comeback.getMonth();

    if (isSameMonth) {

      if (forNights) {
        return lastDay - firstDay;
      }
      
      const fullDays = lastDay - firstDay - 1;
      maxMealNumber += (fullDays * 2);

    }
    else {
      const diffInTime = comeback.getTime() - depart.getTime();
      let diffInDays = ( diffInTime / (1000 * 3600 * 24) );
      diffInDays = Math.floor(diffInDays);

        if (forNights) {
          return diffInDays;
        }
        
      // We do so in order to get only the full days
      diffInDays -= 1;
        
      // To calculate the no. of days between two dates
      maxMealNumber += (diffInDays * 2);

    }
    
    // const timeToDepart = depart.getHours();
    // const timeToLeave = comeback.getHours();
    const timeToDepart = String(depart.getUTCHours()).padStart(2, "0");
    const timeToLeave = String(comeback.getUTCHours()).padStart(2, "0");
    
    maxMealNumber = handlePartialDayMeals('departure', timeToDepart, maxMealNumber);
    maxMealNumber = handlePartialDayMeals('return', timeToLeave, maxMealNumber);
    
    return maxMealNumber;
}
