
export const getSavedFileName = (urlFile) => {

  const spliter = process.env.NODE_ENV === 'development' ? '\\' : '/';
  
  const file = urlFile.split(spliter);
  const  filename = file[file.length - 1];

  
  const destructuredFilename = filename.split('-');
  destructuredFilename.pop();

  let  finalName = destructuredFilename.join('-');
  const filenameParts = filename.split('.');
  finalName += '.' + filenameParts[filenameParts.length -1];
  
  return finalName;
}

export const turnFieldsToAddressEntity = (data) => {
  
  const isMissionInFrance = data.region === 'métropole';
  
  const dataArray = Object.entries(data);
  const addressIdsArray = dataArray.filter((property) => property[0].includes('addressId'));
  const addressesNumber = addressIdsArray.length;
  const addresses = [];

  for (let i = 1; i <= addressesNumber; i++) {
    const missionAddress = {
      id: data['addressId' + i],
      streetNumber: data['streetNumber' + i],
      bis: data['bis' + i],
      streetType: data['streetType' + i],
      streetName: data['streetName' + i],
      postCode: data['postCode' + i],
      city: data['city' + i],
      countryCode: data['countryCode' + i] === 0 && isMissionInFrance ? 100 : data['countryCode' + i]
    }
    addresses.push(missionAddress);

    delete data['addressId' + i];
    delete data['streetNumber' + i];
    delete data['bis' + i];
    delete data['streetType' + i];
    delete data['streetName' + i];
    delete data['postCode' + i];
    delete data['city' + i];
    delete data['countryCode' + i];
  }

  data.addresses = addresses;

  return data;
}

export const checkStepsStatus = (step, currentDoc) => {

  let docState = {};

  if (step ===6) {
    const omStepsWithStatus = [
      {
        name: 'mission',
        step: 1,
        status: (currentDoc.hasOwnProperty('mission') && currentDoc.mission.status) ? currentDoc.mission.status : false
      },
      {
        name: 'transports',
        step: 2,
        status: (currentDoc.hasOwnProperty('transports') && currentDoc.transports.status) ? currentDoc.transports.status : false
      },
      {
        name: 'hébergement',
        step: 3,
        status: (currentDoc.hasOwnProperty('accomodations') && currentDoc.accomodations.status) ? currentDoc.accomodations.status : false
      },
      {
        name: 'signature',
        step: 5,
        status: (currentDoc.hasOwnProperty('signature') && currentDoc.signature.status) ? currentDoc.signature.status : false
      },
    ];
    
    const unfinishedStep = omStepsWithStatus.filter((step) => !step.status);

    if (!unfinishedStep) {
      docState.isFinished = true
    }
    else {
      docState = unfinishedStep;
    }
  }

  return docState;
}
