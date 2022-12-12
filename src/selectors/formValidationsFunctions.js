
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
    register("listWorkAddresses", {
      required:"Merci de sélectionner une adresse administrative."
    });
  }
  else {
    unregister("listWorkAddresses");
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
  element.textContent = content;

  const classToManipulate = "form__section-field-error--open";
  if (toAdd) {
    element.classList.add(classToManipulate);
  }
  else {
    element.classList.remove(classToManipulate);
  }
  
}
