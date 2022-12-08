
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
