import React from 'react';
import { useSelector } from 'react-redux';

import '../style.scss';

// Components
import FileHandler from '../FileHandler';
import InputValueDisplayer from '../InputValueDisplayer';
import FormSectionTitle from 'src/components/FormSectionTitle';

// Reducer


const TransportsVal = ({ displayPdf, data, entity }) => {
  
  const { ef: { transportsFieldsBis }} = useSelector((state) => state);

  return (
    <>
      {transportsFieldsBis.map((category) => (
        <React.Fragment key={category.id}>
          <FormSectionTitle>{category.label}</FormSectionTitle>
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

            if (data[checkedField] === null) {
              return;
            }
            return (
              <div className="form__section form__section--split">
                <div className="form__section-half">
                    <InputValueDisplayer
                      key={field.id}
                      label={field.label}
                      value={data[checkedField]}
                    />
                </div>
                <div className="form__section-half form__section-half--separator" />
                <div className="form__section-half">
                  {data[fileField] && (
                      <>
                        {data[fileField].map((file) => (
                          <FileHandler
                            key={data[fileField].indexOf(file)}
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
