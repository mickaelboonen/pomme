import React from 'react';

import '../style.scss';

// Components
import FileHandler from '../FileHandler';
import InputValueDisplayer from '../InputValueDisplayer';
import FormSectionTitle from 'src/components/FormSectionTitle';
import { useSelector } from 'react-redux';

// Reducer


const TransportsVal = ({ displayPdf, data, entity }) => {
  
  const { ef: { transportsFieldsBis }} = useSelector((state) => state);
  console.log(data, transportsFieldsBis);
  let otherTransports = '';
  if (data.ferry) {
    otherTransports += 'Ferry. '
  }
  if (data.taxi) {
    otherTransports += 'Taxi. '
  }
  

  // const getTransportsData = (data, type) => {

  //   const { transport_type, transport_class, transport_payment, dispensations } = data;
  //   const transport = {
  //     file: []
  //   };

  //   if (type === 'train' && transport_type.indexOf(type) >= 0) {
      
  //     transport.category = transport_class.find((payment) => payment.includes('first') || payment.includes('second')).includes('first') ? 'Première classe' : 'Deuxième classe';
  //     transport.payment = transport_payment.find((payment) => payment.includes(type)).includes('agent') ? "Avancé par l'agent" : "Payé par Unîmes";

  //     dispensations.forEach((dis) => {
  //       if (dis.type.includes(type)) {
  //         transport.file.push(dis);
  //       }
  //     });
  //   }
  //   else if (type === 'plane' && transport_type.indexOf(type) >= 0) {      
  //     transport.category  = data.transport_class.find((payment) => payment.includes('eco') || payment.includes('business')).includes('business') ? 'Classe affaire' : 'Classe économique';
  //     transport.payment = data.transport_payment.find((payment) => payment.includes(type)).includes('agent') ? "Avancé par l'agent" : "Payé par Unîmes";

  //     dispensations.forEach((dis) => {
  //       if (dis.type.includes('avion')) {
  //         transport.file.push(dis);
  //       }
  //     });
  //   }
  //   else if (type === 'taxi') {
  //     dispensations.forEach((dis) => {
  //       if (dis.type.includes(type)) {
  //         transport.file.push(dis);
  //       }
  //     })
  //   }
  //   return transport;
  // }

  // const planeData = getTransportsData(data, 'plane');
  // const trainData = getTransportsData(data, 'train');
  // const taxiData = getTransportsData(data, 'taxi');
  
  return (
    <>
        {transportsFieldsBis.map((category) => (
          <React.Fragment key={category.id}>
            <FormSectionTitle>{category.id}</FormSectionTitle>
            {category.fields.map((field) => {
            
              let checkedField = '';
              if (field.formField === 'rentCar' ) {
                checkedField = 'rent_car';
              }
              else if (field.formField === 'publicTransports') {
                checkedField = 'public_transports';
              }
              else {
                checkedField = field.formField;
              }
              
              const fileField = checkedField + '_files';
              console.log( field.formField , fileField);
              // const fileHandler = 

              return (
                <div className="form__section form__section--split">
                  <div className="form__section-half">
                      <InputValueDisplayer
                        key={field.id}
                        label={field.label}
                        value={data[field.formField]}
                        // plop={true}
                      />
                  </div>
                  <div className="form__section-half form__section-half--separator" />
                  <div className="form__section-half">

                      {data[fileField] && (
                          <>
                            {data[field.formField + '_files'].map((file) => (
                              <FileHandler
                                key={data[field.formField + '_files'].indexOf(file)}
                                label={field.filelabel}
                                dataLink={file.dataLink}
                                url={file.file.url}
                                displayPdf={displayPdf}
                                entity={entity}
                                entityId={data.id}
                                status={file.file.status}
                              />
                            ))}
                          </>
                        )}
                  </div>
                </div>
            )})}
          </React.Fragment>
        ))}

    </>
    
  );
};

TransportsVal.propTypes = {

};

export default TransportsVal;
