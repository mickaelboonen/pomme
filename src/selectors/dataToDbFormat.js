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
    trainClass,
    trainPayment,
    planeClass,
    planePayment,
    vehicleAuthorizationFile,
    dispensationForValidation,
    dispensation,
    vehicleAuthorizationFileForValidation
  } = data;

  const dataToBeSubmitted = {
    omId: omId,
    vehicleId: vehicle,
    transportType: [],
    transportClass: [],
    transportPayment: [],
    publicTransports: publicTransports,
  };
  
  if (data.others) {
    data.others.forEach((option) => {
      if (option === 'taxi') {
        dataToBeSubmitted.taxi = true;
      }
      else if (option === 'parking') {
        dataToBeSubmitted.parking = true;
      }
    })
  }
  else {
    dataToBeSubmitted.parking = false;
    dataToBeSubmitted.taxi = false;
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

  if (vehicleAuthorizationFileForValidation) {
    dataToBeSubmitted.vehicleAuthorization = "pending";
  }
  else if (vehicle !== "") {
    dataToBeSubmitted.vehicleAuthorization = vehicleAuthorizationFile;
  }
  else {
    dataToBeSubmitted.vehicleAuthorization = null;
  }

  if (dispensationForValidation) {
    dataToBeSubmitted.transportDispensation = "pending";
  }
  else if (trainClass === "first-class" || planeClass === "business-class") {
    dataToBeSubmitted.transportDispensation = dispensation;
  }
  else {
    dataToBeSubmitted.transportDispensation = null;
  }
  
  return dataToBeSubmitted;


}

/**
 * From the data we collected in the OM transports form, we adapt it to match the correct format for the database
 *  
 * @param {object} data form data
 * @returns object that is to be sent to the API
 */
export const turnAdvanceDataToDbFormat = (data) => {

  const {
    omId,
    advanceAmount,
    hotelQuotation,
    meals,
    nights,
    otherExpensesAmount,
    otherExpensesNames,
    rib,
    total
  } = data;

  const dataToBeSubmitted = {
    omId: omId,
    advanceAmount: advanceAmount,
    totalAmount: total,
    hotelQuotation: hotelQuotation,
    nightsNumber: nights,
    mealsNumber: meals,
    otherExpensesAmount: otherExpensesAmount === "" ? 0 : otherExpensesAmount,
    otherExpensesJustification :otherExpensesNames === "" ? 0 : otherExpensesNames,
    agentRib: rib

  };
  
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
    signature
  } = data;

  const dataToBeSubmitted = {
    omId: omId,
    organizerSignature: null,
    files: otherFiles,
    informations: otherInfos,
  };

  if (savedSignature) {
    dataToBeSubmitted.agentSignature = signatureUrl;
  }
  else {
    dataToBeSubmitted.agentSignature = signature;
  }
  
  return dataToBeSubmitted;
}
