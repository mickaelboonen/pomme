
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

  const { trainPayment, planePayment, publicTransports, others, vehicle } = omTransports;

    if (trainPayment === "user-train" ) {
      register('train', {
        required: 'Veuillez saisir le montant payé pour ce transport.'
      })
      register('trainFiles', {
        required: 'Veuillez fournir le justificatif de paiement.'
      })
    }
    if (planePayment === "user-plane") {
      register('plane', {
        required: 'Veuillez saisir le montant payé pour ce transport.'
      })
      register('planeFiles', {
        required: 'Veuillez fournir le justificatif de paiement.'
      })
    }
    if (publicTransports) {
      register('publicTransports', {
        required: 'Veuillez saisir le montant payé pour ce transport.'
      })
      register('publicTransportsFiles', {
        required: 'Veuillez fournir le justificatif de paiement.'
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
      
      if (others.indexOf('parking') != -1) {
        register('parking', {
          required: 'Veuillez saisir le montant payé pour ce transport.'
        })
        register('parkingFiles', {
          required: 'Veuillez fournir le justificatif de paiement.'
        })
      }
    }
    if (vehicle === "Véhicule personnel, de prêt") {
      register('fuel', {
        required: 'Veuillez saisir le montant payé pour ce transport.'
      })
      register('fuelFiles', {
        required: 'Veuillez fournir le justificatif de paiement.'
      })
    }
}
  /**
   * Registers or unregisters the list of work adresses in the OM Form - mission step
   * 
   * @param {string} place 
   * @param {function} register 
   * @param {function} unregister 
   */
 export const handleWorkAddressSelect = (place, register, unregister) => {
  if (place && place.includes('work')) {
    register("workAdress", {
      required:"Merci de sélectionner une adresse administrative."
    });
  }
  else {
    unregister("workAdress");
  }
}

  /**
   * Registers or unregisters the fields related to the region radio field in the OM Forme - mission step
   * 
   * @param {string} place 
   * @param {function} register 
   * @param {function} unregister 
   */
export const handleRegionFields = (region, register, unregister) => {
  if (region === "métropole") {
    unregister("country");
    unregister("abroadCosts");

  }
  else if (region === "dom-tom") {
    register("abroadCosts", {
      required: "Merci de sélectionner l'option qui correspond."
    });
  }
  else if (region === "étranger") {
    register("country", {
      required:"Merci de sélectionner l'option qui correspond."
    });
    register("abroadCosts", {
      required:"Merci de sélectionner l'option qui correspond."
    });
  }
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

  console.log(element, content);
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
    workAdress: null,
    country: null,
    abroadCosts: null,
    budget: null,
    presentation: null,
  }

  if (isEfForm) {
    if (isFormModified) {
      errorMessages.missionPurpose = 'Merci de rensigner le motif de la mission.';
      errorMessages.departure = "Veuillez renseigner le jour et l'heure de départ.";
      errorMessages.departurePlace = "Veuillez renseigner le lieu de départ lors de votre départ en mission.";
      errorMessages.comeback = "Veuillez renseigner le jour et l'heure du retour.";
      errorMessages.comebackPlace = "Veuillez renseigner le lieu d'arrivée lors de votre retour de mission.";
      errorMessages.region = "Merci de sélectionner l'option qui correspond.";
      errorMessages.workAdress = "Merci de renseigner l'adresse de votre résidence administrative.";
      errorMessages.streetNumber = "Merci de renseigner le numéro de voie.";
      errorMessages.streetType = "Merci de renseigner le type de voie.";
      errorMessages.streetName = "Merci de renseigner le nom de la voie (sans le type).";
      errorMessages.postCode = "Merci de renseigner le code postal.";
      errorMessages.city = "Merci de renseigner la ville ù a lieu la mission.";
    }
  }
  else {
    errorMessages.missionPurpose = 'Merci de rensigner le motif de la mission.';
    errorMessages.departure = "Veuillez renseigner le jour et l'heure de départ.";
    errorMessages.departurePlace = "Veuillez renseigner le lieu de départ lors de votre départ en mission.";
    errorMessages.comeback = "Veuillez renseigner le jour et l'heure du retour.";
    errorMessages.comebackPlace = "Veuillez renseigner le lieu d'arrivée lors de votre retour de mission.";
    errorMessages.region = "Merci de sélectionner l'option qui correspond.";
    errorMessages.workAdress = "Merci de renseigner l'adresse de votre résidence administrative.";
    errorMessages.streetNumber = "Merci de renseigner le numéro de voie.";
    errorMessages.streetType = "Merci de renseigner le type de voie.";
    errorMessages.streetName = "Merci de renseigner le nom de la voie (sans le type).";
    errorMessages.postCode = "Merci de renseigner le code postal.";
    errorMessages.city = "Merci de renseigner la ville ù a lieu la mission.";
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
      
      if (hour > 21) {
        return mealNumber;
      }
      else if (hour > 14) {
        mealNumber += 1;
      }
      else {
        mealNumber += 2;
      }
    }
    else {
      if (hour > 21) {
        return mealNumber;
      }
      else if (hour > 14) {
        mealNumber += 1;
      }
      else if (hour > 11) {
        mealNumber += 2;
      }

    }
    return mealNumber;
}

export const getMaxMealsAndNights = (data, forNights = false) => {

    let maxMealNumber = 0;
    const depart = new Date(data.departure);
    const comeback = new Date(data.comeback);
    
    const firstDay = depart.getDate();
    const lastDay = comeback.getDate();

    if (forNights) {
      return lastDay - firstDay;
    }
    
    const timeToDepart = depart.getHours();
    const timeToLeave = comeback.getHours();
    const fullDays = lastDay - firstDay - 1;
    maxMealNumber += (fullDays * 2);
    
    maxMealNumber = handlePartialDayMeals('departure', timeToDepart, maxMealNumber);
    maxMealNumber = handlePartialDayMeals('return', timeToLeave, maxMealNumber);

    return maxMealNumber;
}
