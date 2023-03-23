export const getAccomodationsDefault = (path) => {

  let data = {

  };
  if (loader.pathname.includes('modifier')) {
    const accomodationsData = omForm.find((omStep) => omStep.step === 'accomodations');

    defaultValues = accomodationsData.data; 
  }
  return data;
}

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

export const turnAddressToFields = (data) => {
  data.addressId = data.address.id;
  data.streetNumber = data.address.streetNumber;
  data.bis = data.address.bis;
  data.streetType = data.address.streetType;
  data.streetName = data.address.streetName;
  data.postCode = data.address.postCode;
  data.city = data.address.city;

  delete data.address;

  return data;
}

export const turnFieldsToAddressEntity = (data) => {

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
