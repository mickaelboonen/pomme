/**
 * From the data we collected in the OM transports form, we adapt it to match the correct format for the database
 *  
 * @param {object} data form data
 * @returns object that is to be sent to the API
 */
export const turnTransportsDataToDbFormat = (data) => {
  
  const {
    docId,
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
    docId: docId,
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
      dataToBeSubmitted[option] = true;
      // if (option === 'taxi') {
      //   dataToBeSubmitted.taxi = true;
      // }
      // else if (option === 'parking') {
      //   dataToBeSubmitted.parking = true;
      // }
      // else if (option === 'ferry') {
      //   dataToBeSubmitted.ferry = true;
      // }
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

    if (vehicleAuthorizationFile instanceof File) {
      dataToBeSubmitted.vehicleAuthorization = vehicleAuthorizationFile;
    } 
    else {
      dataToBeSubmitted.vehicleAuthorization = "pending";
    }
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
    toll: null,
    vehicleAuthorizationFile: null,
    vehicleAuthorizationFileForValidation: false,
    dispensation: null,
    dispensationForValidation: false,
    taxiDispensation: null,
    taxiDispensationForValidation: false,
  }

  if (data.dispensations.length > 0) {

    data.dispensations.forEach((dispensation) => {

      if (dispensation.type.includes('train')) {
        
        dataForTheComponent.trainClass = 'first-class';
        dataForTheComponent.dispensation = dispensation.file;
      }
      else if (dispensation.type.includes('avion')) {
        
        dataForTheComponent.planeClass = 'business-class';
        dataForTheComponent.dispensation = dispensation.file;
      }
      else if (dispensation.type.includes('taxi')) {
        if (dataForTheComponent.others.indexOf('taxi') === -1) {
          
          dataForTheComponent.others.push('taxi');
          dataForTheComponent.taxiDispensation = dispensation.file;
        }
      }
    });
  }
  
  if (data.authorizations.length > 0) {
    const { type, file } = data.authorizations[0];
    
    if (file === 'pending') {
      dataForTheComponent.vehicleAuthorizationFileForValidation = true;
    }
    else if (file.length > 0) {
      dataForTheComponent.vehicleAuthorizationFile = file;
    }

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
  if (data.toll) {
    dataForTheComponent.others.push('toll');
  }
  
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

  if (data.transportDispensation !== null) {
    dataForTheComponent.dispensation = data.transportDispensation;
  }

  if (data.taxiDispensation !== null) {
    dataForTheComponent.taxiDispensation = data.taxiDispensation;
    dataForTheComponent.others.push('taxi');
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
    docId, status, advance,
    mealsNumber, nightsNumber,
    hotelQuotations, rib,
    totalAmount, advanceAmount, unknownAmount,
    otherExpensesAmount, otherExpensesJustification,
  } = data;

  console.log(advance);
  const dataToBeSubmitted = {
    docId: docId,
    advance: advance,
    advanceAmount: advanceAmount === "" ? null : advanceAmount,
    totalAmount: totalAmount === "" ? null : totalAmount,
    hotelQuotations: hotelQuotations,
    nightsNumber: nightsNumber,
    mealsNumber: mealsNumber,
    otherExpensesAmount: otherExpensesAmount === "" ? 0 : otherExpensesAmount,
    otherExpensesJustification :otherExpensesJustification === "" ? 0 : otherExpensesJustification,
    agentRib: null,
    unknownAmount: typeof unknownAmount === 'string' ? true : false,
    status: status,

  };


  if (data.rib instanceof File || typeof data.rib === 'string') {
    dataToBeSubmitted.agentRib = rib
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
    docId,
    savedSignature,
    otherInfos,
    otherFiles,
    signature,
    status,
  } = data;

  const dataToBeSubmitted = {
    docId: docId,
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



export const extractUserData = (data) => {
  
  let { agent, position } = data;
  let { categorie, title, llGrade } = agent;
  
  if (categorie === 'Z' && llGrade.includes('DOCTORANT')) {
    categorie = 'A';
    title = llGrade;
  }
  
  return {
    employer:'unimes',
    firstname:agent.prenom,
    position: position,
    gender:agent.cCivilite === 'Mlle' ? 'Mme' : agent.cCivilite,
    lastname:agent.nomAffichage,
    unimesCategory: categorie,
    unimesStatus: title,
    unimesDepartment: agent.llStructure,
    roles: data.roles ?? [],
    channel: data.channel ?? '',
  }
}

export const extractAgentPersonalAddress = (data) => {
  if (data === null) {
    return {
      bis: '',
      city: '',
      postCode: '',
      streetName: '',
      streetNumber: '',
      streetType: '',
    };
  }
  return { 
    address: data.adrAdresse1,
    address2: '',
    city:data.ville,
    postCode:data.codePostal,
  }
  return {
    bis:data.bisTer,
    city:data.ville,
    postCode:data.codePostal,
    streetName:data.nomVoie,
    streetNumber:data.noVoie,
    streetType:data.cVoie,
  }
}

export const extractAgentProfessionalAddress = (data) => {
  return {
    addressPro: data.adrAdresse2,
    address2Pro: data.adrAdresse1,
    cityPro: data.ville,
    postCodePro: data.codePostal,

  }
  return {
    bisPro:data.bisTer,
    cityPro:data.ville,
    postCodePro:data.codePostal,
    streetNamePro:data.nomVoie,
    streetNumberPro:data.noVoie,
    streetTypePro:data.cVoie,
  }
}

export const efAccomodationsToDbFormat = (data) => {
  const formattedValues = {
    docId: data.docId,
    status: data.status,
    hotel: isNaN(Number(data.hotel)) ? 0 : Number(data.hotel),
    hotelFiles: data.hotelFiles,
    mealsPaidByAgentInFrance: isNaN(Number(data.mealsPaidByAgentInFrance)) ? 0 : Number(data.mealsPaidByAgentInFrance),
    mealsPaidByAgentOverseas: isNaN(Number(data.mealsPaidByAgentOverseas)) ? 0 : Number(data.mealsPaidByAgentOverseas),
    freeMeals: isNaN(Number(data.freeMeals)) ? 0 : Number(data.freeMeals),
    mealsInAdminRestaurants: isNaN(Number(data.mealsInAdminRestaurants)) ? 0 : Number(data.mealsInAdminRestaurants),
    event: isNaN(Number(data.event)) ? 0 : Number(data.event),
    eventFiles: data.eventFiles,
  }

  return formattedValues;
}
