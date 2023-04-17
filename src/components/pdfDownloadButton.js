// import React, { useState } from 'react';
// import { useLoaderData, Link } from 'react-router-dom';
// import { BlobProvider, PDFViewer } from '@react-pdf/renderer';

// import './style.scss';

// // Components
// import CarAuthorization from 'src/components/PDF/O';

// // Selectors & actions
// import './style.scss';

// const PdfDownloadButton = () => (
//   <div className="form__section">
//     <div style={{width:"100%", height:"100vh"}}>
//       <PDFViewer>
//         <CarAuthorization/>
//       </PDFViewer>
//     </div> 
//     <div className="form__section-field-buttons" style={{display: 'flex', justifyContent: 'center'}}>
//       <BlobProvider document={<CarAuthorization/>}>
//         {({ blob }) => {

//           const file = new File([blob], 'currentOM.name', {type: 'pdf'});
//           const fileUrl = URL.createObjectURL(file);
          
//           // setValue('om', file);
//           return (
//             <a href={fileUrl} download={'currentOM.name' + '.pdf'} style={{textAlign: 'center'}}>
//               <button type='button' files={file} onClick={() => {}}>Valider les données et télécharger l'Ordre de Mission</button>
//             </a>
//           );
//         }}
//       </BlobProvider>
//     </div>
//     {/* <Link to={"/utilisateur/" + user + "/mes-ordres-de-mission"} style={{display: 'block', marginBottom: '2rem', textAlign: 'center'}}>Retour au menu des Ordres de Mission</Link> */}
//   </div>
// );

// PdfDownloadButton.propTypes = {

// };

// export default PdfDownloadButton;
