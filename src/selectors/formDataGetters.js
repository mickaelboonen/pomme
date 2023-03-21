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
  data.missionAddress = {
    id: data.addressId,
    streetNumber: data.streetNumber,
    bis: data.bis,
    streetType: data.streetType,
    streetName: data.streetName,
    postCode: data.postCode,
    city: data.city,
  }

  delete data.addressId;
  delete data.streetNumber;
  delete data.bis;
  delete data.streetType;
  delete data.streetName;
  delete data.postCode;
  delete data.city;

  return data;
}
