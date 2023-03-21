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
