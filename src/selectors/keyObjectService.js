import { getSavedFileName } from 'src/selectors/formDataGetters';
/**
 * Since serialization, Symfony sends back data with snake_case keys
 * We transform them here into camelCase keys
 * 
 * @param object data 
 * @returns object
 */
export const declareCamelCaseKeys = (data) => {
  const formattedValues = {};
  for (const [key, value] of Object.entries(data)) {

    if (key.includes('_')) {
      
      const keyParts = key.split('_');
      let beginningKey = keyParts[0];
    
      keyParts.shift();
      keyParts.forEach((part) => {
        beginningKey += part.charAt(0).toUpperCase() + part.slice(1);
      })
      
      formattedValues[beginningKey] = value;
    }
    else {
      formattedValues[key] = value;
    }
  }
  return formattedValues;
}

export const setEfTranportsFilenames = (data) => {

  const allEntries = Object.entries(data);
  const filesEntries = allEntries.filter((entry) => entry[0].includes('Files') && entry[1].length > 0);

  const filenamesObject = {};

  filesEntries.forEach((file) => {

    let filenames= '';

  
    if (file[1].length === 1) {
      filenames = getSavedFileName(file[1][0]);
    }
    else if (file[1].length > 1) {
      file[1].forEach((urlFile) => {
        filenames += getSavedFileName(urlFile) + ' - ';
      })
    }

    filenamesObject[file[0]] = filenames;
  })

  return filenamesObject;
}

export const addAllAddressesFields = (data) => {
  // console.log(data);
  
  const { addresses } = data;
  
  const newAddresses = { ...data};
  for(let i = 1; i <= data.addresses.length; i++) {
    const x = Object.entries(addresses[i - 1]);

    x.forEach((property) => {
      if (property[0] === 'id') {
        newAddresses['addressId' + i] = property[1];
      }
      else {
        newAddresses[property[0] + i] = property[1]; 
      }
    })
  }
  
  return newAddresses;
}
