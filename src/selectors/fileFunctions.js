export const handleEfTransportsFilesUploadPayload = (data) => {

  const propertiesArray = Object.entries(data);
  const files = [];
  
  propertiesArray.forEach((property) => {
    const name = property[0];
    const value = property[1];
    if (name.includes('Files')) {
      value.forEach((currentFile) => {
        const file = {
          efId: data.efId,
          type: 'transports',
          file: currentFile,
          name: name,
        }
        files.push(file);
      })
      
    }
  })

  return files;
}

export const handleFilesUploadResponse = () => {

}
