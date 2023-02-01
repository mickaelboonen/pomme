
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
        