
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
