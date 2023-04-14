
  /**
   * Registers the field that matches the data selected in the OM form
   * 
   * @param {object} omData 
   * @param {function} register 
   */
 export const applyRegisterFromHebergementData = (omData, register) => {
    if (omData.hotel) {
      register('hotel', {
        required: "Veuillez saisir le montant de vos frais d'hébergement."
      })
      register('hotelFiles', {
        required: 'Veuillez fournir le justificatif de paiement.'
      })
    }
}
  /**
   * Registers the field that matches the data selected in the OM form
   * 
   * @param {object} omTransports 
   * @param {function} register 
   */
 export const applyRegisterFromData = (omTransports, register) => {

  const { authorizations, trainPayment, planePayment, publicTransports, others, vehicle } = omTransports;

  const amountRequiredMessage = 'Veuillez saisir le montant payé pour ce transport.';
  const fileRequiredMessage = 'Veuillez fournir le justificatif de paiement.';
  
    if (trainPayment === "agent" ) {
      register('train', {
        required: amountRequiredMessage,
      })
      register('trainFiles', {
        required:fileRequiredMessage,
      })
    }
    if (planePayment === "user") {
      register('plane', {
        required: amountRequiredMessage,
      })
      register('planeFiles', {
        required: fileRequiredMessage,
      })
    }
    if (publicTransports) {
      register('publicTransports', {
        required: amountRequiredMessage,
      })
      register('publicTransportsFiles', {
        required: fileRequiredMessage,
      })
    }
    if (others !== false) {
      if (others.indexOf('taxi') != -1) {
        register('taxi', {
          required: 'Veuillez saisir le montant payé pour ce transport.'
        })
        register('taxiFiles', {
          required: 'Veuillez fournir le justificatif de paiement.'
        })
      }
      if (others.indexOf('ferry') != -1) {
        register('ferry', {
          required: 'Veuillez saisir le montant payé pour ce transport.'
        })
        register('ferryFiles', {
          required: 'Veuillez fournir le justificatif de paiement.'
        })
      }
      
      if (others.indexOf('parking') != -1) {
        register('parking', {
          required: 'Veuillez saisir le montant payé pour ce transport.'
        })
        register('parkingFiles', {
          required: 'Veuillez fournir le justificatif de paiement.'
        })
      }
    }
    if (authorizations.length > 0) {
      const { type } = authorizations[0];
      if (type === 'personal-car') {
        register('horsepower', {
          required: amountRequiredMessage,
        })
        register('km', {
          required: amountRequiredMessage,
        })
      }
      else if (type === 'company-car') {
        register('fuel', {
          required: amountRequiredMessage,
        })
        register('fuelFiles', {
          required: fileRequiredMessage,
        })
      }
      else if (type === 'rent-car') {
        register('rentCar', {
          required: amountRequiredMessage,
        })
        register('rentCarFiles', {
          required: fileRequiredMessage,
        })
        register('fuel', {
          required: amountRequiredMessage,
        })
        register('fuelFiles', {
          required: fileRequiredMessage,
        })
      }
    }
}

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
 * Some validation cannot be handled before the submit in the om transports form
 * So we handle them manually during the submit
 * 
 * @param {DOM element} element 
 * @param {string} content 
 * @param {boolean} toAdd 
 */
export const handleValidationErrorsManually = (element, content, toAdd = false) => {

  element.textContent = content;
  const classToManipulate = "form__section-field-error--open";

  if (toAdd) {
    element.classList.add(classToManipulate);
  }
  else {
    element.classList.remove(classToManipulate);
  }
  
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

        if (forNights) {
          return diffInDays;
        }
        
      // We do so in order to get only the full days
      diffInDays -= 1;
        
      // To calculate the no. of days between two dates
      maxMealNumber += (diffInDays * 2);

    }

    const timeToDepart = depart.getHours();
    const timeToLeave = comeback.getHours();
    maxMealNumber = handlePartialDayMeals('departure', timeToDepart, maxMealNumber);
    maxMealNumber = handlePartialDayMeals('return', timeToLeave, maxMealNumber);

    return maxMealNumber;
}
