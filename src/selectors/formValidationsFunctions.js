
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

export const handleTrainOrPlaneFields = (transportClass) => {

  // const parentSection = document.querySelector('#upper-class-request');
  // const currentClass = transportClass.split('-')[0];
  // console.log(currentClass, parentSection);
  // if (currentClass === 'first' && currentClass === 'business') {
  //   parentSection.classList.remove('form__section-field--hidden');
  // }
  // else if (currentClass === 'second' || currentClass === 'eco') {
  //   parentSection.classList.add('form__section-field--hidden');
  // }
}
