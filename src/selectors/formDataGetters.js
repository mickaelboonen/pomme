
export const getSavedFileName = (urlFile) => {

  const spliter = process.env.NODE_ENV === 'development' ? '\\' : '/';
  
  // In case arrays are registered instead of file urls
  if (typeof urlFile !== 'string') {
    return 'Aucun fichier trouvé';
  }
  const file = urlFile.split(spliter);
  const  filename = file[file.length - 1];

  
  const destructuredFilename = filename.split('-');
  destructuredFilename.pop();

  let  finalName = destructuredFilename.join('-');
  const filenameParts = filename.split('.');
  finalName += '.' + filenameParts[filenameParts.length -1];
  
  return finalName;
}

export const getAllFilenamesForProperty = (files) => {
  let filename = '';

  if (files) {
    files.forEach((file) => {

      filename += getSavedFileName(file);

      if (files.length > 1) {
        filename += ' - ';
      }
    })
  }

  return filename;
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
      // streetNumber: data['streetNumber' + i],
      // bis: data['bis' + i],
      // streetType: data['streetType' + i],
      // streetName: data['streetName' + i],
      address: data['address' + i],
      address2: data['address2' + i],
      postCode: data['postCode' + i],
      city: data['city' + i],
      countryCode: data['countryCode' + i] === 0 && isMissionInFrance ? 100 : data['countryCode' + i]
    }
    
    if (data['postCode' + i] !== 0 && data['city' + i] !== '') {
      addresses.push(missionAddress);
    }

    delete data['addressId' + i];
    delete data['streetNumber' + i];
    delete data['bis' + i];
    delete data['streetType' + i];
    delete data['streetName' + i];
    delete data['address' + i];
    delete data['address2' + i];
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
 // console.log(currentDoc);
    const efStepsWithStatus = [
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
        name: 'étapes',
        step: 4,
        status: (currentDoc.hasOwnProperty('steps') && currentDoc.steps.status) ? currentDoc.steps.status : false
      },
      {
        name: 'rib',
        step: 5,
        status: (currentDoc.hasOwnProperty('rib') && currentDoc.rib.status) ? currentDoc.rib.status : false
      },
    ];
    
    const unfinishedStep = efStepsWithStatus.filter((step) => !step.status);

    if (!unfinishedStep) {
      docState.isFinished = true
    }
    else {
      docState = unfinishedStep;
    }
  }

  return docState;
}

export const checkVacationStepsStatus = (step, currentDoc) => {

  let docState = {};

  if (step === 5) {

    const efStepsWithStatus = [
      {
        name: 'peche',
        step: 1,
        status: (currentDoc.hasOwnProperty('peche') && currentDoc.peche.status) ? currentDoc.peche.status : false
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
        name: 'rib',
        step: 3,
        status: (currentDoc.hasOwnProperty('rib') && currentDoc.rib.status) ? currentDoc.rib.status : false
      },
      {
        name: 'étapes',
        step: 3,
        status: (currentDoc.hasOwnProperty('steps') && currentDoc.steps.status) ?? false
      },
    ];
    
    const unfinishedStep = efStepsWithStatus.filter((step) => !step.status);

    if (!unfinishedStep) {
      docState.isFinished = true
    }
    else {
      docState = unfinishedStep;
    }
  }

  return docState;
}
