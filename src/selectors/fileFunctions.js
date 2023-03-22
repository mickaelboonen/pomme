export const handleEfFilesUploadPayload = (data, type) => {

  const propertiesArray = Object.entries(data);
  const files = [];
  
  propertiesArray.forEach((property) => {
    const name = property[0];
    const value = property[1];
    
    if (name.includes('Files')) {
      Array.from(value).forEach((currentFile) => {
        if (currentFile instanceof File) {
          const file = {
            docId: data.docId,
            type: type,
            file: currentFile,
            name: name,
          }
          files.push(file);
        }
      })
      
    }
  })

  return files;
}

export const handleFilesUploadResponse = () => {

}
