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
    publicTransports: publicTransports
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

  if (dispensationForValidation) {
    dataToBeSubmitted.transportDispensation = "pending";
  }
  else if (trainClass === "first-class" || planeClass === "business-class") {
    dataToBeSubmitted.transportDispensation = dispensation;
  }
  
  return dataToBeSubmitted;


}
