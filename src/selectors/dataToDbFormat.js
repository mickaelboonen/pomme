/**
 * From the data we collected in the OM transports form, we adapt it to match the correct format for the database
 *  
 * @param {object} data form data
 * @returns object that is to be sent to the API
 */
export const turnTransportsDataToDbFormat = (data) => {
  
  const {
    omId,
    vehicle,
    publicTransports,
    trainClass, trainPayment,
    planeClass, planePayment,
    vehicleAuthorizationFile, vehicleAuthorizationFileForValidation,
    dispensation, dispensationForValidation,
    taxiDispensation, taxiDispensationForValidation,
    status
  } = data;

  /**
   * Though we can acces dispensations and authorizations through serialization,
   * we still need vehicleAuthorization, taxiDispensation and transportDispensation
   * in case the user do not need to make a new request (already has a file for it)
   * 
   */
  const dataToBeSubmitted = {
    omId: omId,
    vehicleId: vehicle,
    vehicleAuthorization: null,
    transportDispensation: null,
    taxiDispensation: null,
    publicTransports: publicTransports,
    taxi: null,
    parking: null,
    ferry: null,
    transportType: [],
    transportClass: [],
    transportPayment: [],
    status: status,
  };

  
  if (data.others) {
    data.others.forEach((option) => {
      if (option === 'taxi') {
        dataToBeSubmitted.taxi = true;
      }
      else if (option === 'parking') {
        dataToBeSubmitted.parking = true;
      }
      else if (option === 'ferry') {
        dataToBeSubmitted.ferry = true;
      }
    })
  }
  else {
    dataToBeSubmitted.parking = false;
    dataToBeSubmitted.taxi = false;
    dataToBeSubmitted.ferry = false;
  }

  if (trainClass !== null) {
    dataToBeSubmitted.transportType.push('train');
    dataToBeSubmitted.transportClass.push(trainClass);
    dataToBeSubmitted.transportPayment.push('train-paid-by-' + trainPayment);
  }
  
  if (planeClass !== null) {
    dataToBeSubmitted.transportType.push('plane');
    dataToBeSubmitted.transportClass.push(planeClass);
    dataToBeSubmitted.transportPayment.push('plane-paid-by-' + planePayment);
  }

  // VEHICLE AUTHORIZATION

  if (vehicleAuthorizationFileForValidation) {
    dataToBeSubmitted.vehicleAuthorization = "pending";
  }
  else if (vehicle !== "") {
    dataToBeSubmitted.vehicleAuthorization = vehicleAuthorizationFile;
  }
  else {
    dataToBeSubmitted.vehicleAuthorization = null;
  }
  // TRANSPORTS DISPENSATION

  if (dispensationForValidation) {
    dataToBeSubmitted.transportDispensation = "pending";
  }
  else if (trainClass === "first-class" || planeClass === "business-class") {
    dataToBeSubmitted.transportDispensation = dispensation;
  }
  else {
    dataToBeSubmitted.transportDispensation = null;
  }
  
  // TAXI DISPENSATION

  if (taxiDispensationForValidation) {
    dataToBeSubmitted.taxiDispensation = "pending";
  }

  if (taxiDispensation) {
    dataToBeSubmitted.taxiDispensation = taxiDispensation;
  }
  
  return dataToBeSubmitted;


}


export const turnTransportsDataToAppFormat = (data) => {
  
  const dataForTheComponent =  {
    trainClass: null,
    trainPayment: null,
    planeClass: null,
    planePayment: null,
    vehicle: data.vehicle ? data.vehicle.id : null,
    publicTransports: data.publicTransports,
    others:  [],
    dispensations:  data.dispensations,
    authorizations:  data.authorizations,
    omId: data.om.id,
    vehicleAuthorizationFile: null,
    vehicleAuthorizationFileForValidation: false,
    dispensation: null,
    dispensationForValidation: false,
    taxiDispensation: null,
    taxiDispensationForValidation: false,
  }

  data.dispensations.forEach((dispensation) => {

    if (dispensation && (dispensation.type.includes('train') || dispensation.type.includes('avion'))) {

      dataForTheComponent.dispensationForValidation = true;
    }
    else if (dispensation && dispensation.type.includes('taxi')) {
      if (dataForTheComponent.others.indexOf('taxi') === -1) {
        dataForTheComponent.taxiDispensationForValidation = true;
        dataForTheComponent.others.push('taxi');
      }
    }
  });
  

  if (data.authorizations.length > 0) {
    dataForTheComponent.vehicleAuthorizationFileForValidation = true;

    const { type } = data.authorizations[0];

    if (type === 'personal-car') {
      dataForTheComponent.vehicle = 0;
    }
    else if (type === 'company-car') {
      dataForTheComponent.vehicle = 2;
    }
    else if (type === 'rent-car') {
      dataForTheComponent.vehicle = 3;
    }
  }
  
  if (data.parking) {
    dataForTheComponent.others.push('parking');
  }
  if (data.ferry) {
    dataForTheComponent.others.push('ferry');
  }
  // if (data.taxi) {
  //   dataForTheComponent.others.push('taxi');
  // }
  
  data.transportClass.forEach((service) => {
    if (service === 'first-class' || service === 'second-class') {
      dataForTheComponent.trainClass = service;
    }
    else if (service === 'business-class' || service === 'eco-class') {
      dataForTheComponent.planeClass = service;
      
    }
  })
  data.transportPayment.forEach((service) => {

    if (service === 'train-paid-by-unimes-t' || service === 'train-paid-by-agent') {
      dataForTheComponent.trainPayment = service.slice(14);
    }
    else if (service === 'plane-paid-by-unimes-t' || service === 'plane-paid-by-user') {
      dataForTheComponent.planePayment = service.slice(14);
      
    }
  })

  if (data.vehicleAuthorization === 'pending') {
    dataForTheComponent.vehicleAuthorizationFileForValidation = true;
  }
  else if (data.vehicleAuthorization !== null) {
    dataForTheComponent.vehicleAuthorizationFile = data.vehicleAuthorization;
  }

  if (data.transportDispensation === 'pending') {
    dataForTheComponent.dispensationForValidation = true;
  }
  else if (data.transportDispensation !== null) {
    dataForTheComponent.dispensation = data.transportDispensation;
  }
  
  return dataForTheComponent;

}
/**
 * From the data we collected in the OM transports form, we adapt it to match the correct format for the database
 *  
 * @param {object} data form data
 * @returns object that is to be sent to the API
 */
export const turnAdvanceDataToDbFormat = (data) => {

  const {
    omId, status,
    meals, nights,
    hotelQuotation, rib,
    total, advanceAmount,
    otherExpensesAmount, otherExpensesNames,
  } = data;

  const dataToBeSubmitted = {
    omId: omId,
    advanceAmount: advanceAmount === "" ? 0 : advanceAmount,
    totalAmount: total,
    hotelQuotation: null,
    nightsNumber: nights,
    mealsNumber: meals,
    otherExpensesAmount: otherExpensesAmount === "" ? 0 : otherExpensesAmount,
    otherExpensesJustification :otherExpensesNames === "" ? 0 : otherExpensesNames,
    agentRib: null,
    status: status,

  };


  if (data.rib instanceof File || typeof data.rib === 'string') {
    dataToBeSubmitted.agentRib = rib
  }
  if (data.hotelQuotation instanceof File || typeof data.hotelQuotation === 'string') {
    dataToBeSubmitted.hotelQuotation = hotelQuotation
  }
  
  return dataToBeSubmitted;
}

/**
 * From the data we collected in the OM transports form, we adapt it to match the correct format for the database
 *  
 * @param {object} data form data
 * @returns object that is to be sent to the API
 */
export const turnSignatureDataToDbFormat = (data, signatureUrl) => {

  const {
    omId,
    savedSignature,
    otherInfos,
    otherFiles,
    signature,
    status,
  } = data;

  const dataToBeSubmitted = {
    omId: omId,
    organizerSignature: null,
    files: otherFiles,
    informations: otherInfos,
    status: status,
  };

  if (savedSignature) {
    dataToBeSubmitted.agentSignature = signatureUrl;
  }
  else {
    dataToBeSubmitted.agentSignature = signature;
  }
  
  return dataToBeSubmitted;
}

/**
 * From the data we collected in the OM transports form, we adapt it to match the correct format for the database
 *  
 * @param {object} data form data
 * @returns object that is to be sent to the API
 */
export const turnAccomodationDataToDbFormat = (data) => {
  
  return {
    omId: Number(data.omId),
    hotel: data.hotel,
    nightsNumber: data.nightsNumber === "" || !data.nightsNumber ? 0 : data.nightsNumber,
    hotelPayment: data.hotelPayment,
    mealsPaidByAgent: data.mealsPaidByAgent === "" ? 0 : Number(data.mealsPaidByAgent),
    mealsInAdminRestaurants: data.mealsInAdminRestaurants === "" ? 0 : Number(data.mealsInAdminRestaurants),
    status: data.status,
  };
}



export const agentDataToAppFormat = (data) => {

  const { agent, personalAddress, professionalAddress } = data;

  const formattedValues = {
    bis:personalAddress.bisTer,
    bisPro:professionalAddress.bisTer,
    city:personalAddress.ville,
    cityPro:professionalAddress.ville,
    employer:'unimes',
    firstname:agent.prenom,
    gender:agent.cCivilite === 'Mlle' ? 'Mme' : agent.cCivilite,
    lastname:agent.nomAffichage,
    postCode:personalAddress.codePostal,
    postCodePro:professionalAddress.codePostal,
    streetName:personalAddress.nomVoie,
    streetNamePro:professionalAddress.nomVoie,
    streetNumber:personalAddress.noVoie,
    streetNumberPro:professionalAddress.noVoie,
    streetType:personalAddress.cVoie,
    streetTypePro:professionalAddress.cVoie,
    unimesCategory:agent.categorie,
    unimesStatus:agent.title,
    unimesDepartment: agent.llStructure,
  }


  return formattedValues;
}
