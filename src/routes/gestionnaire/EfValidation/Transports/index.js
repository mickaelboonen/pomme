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

  const categoriesToDisplay = [];

  transportsFieldsBis.forEach((category) => {

    const fieldsToDisplay = [];

    category.fields.forEach((field) => {
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

      if (data[checkedField] !== null) {
        fieldsToDisplay.push({
          ...field,
          checkedField : checkedField,
          fileField: fileField
        });
      }

    })
    if (fieldsToDisplay.length > 0) {
      categoriesToDisplay.push({
        ...category,
        fields: fieldsToDisplay
      })
    }
  })

  return (
    <>
      {categoriesToDisplay.map((category) => (
        <React.Fragment key={category.id}>
          <FormSectionTitle>{category.label}</FormSectionTitle>
          {category.fields.map((field) => (
            <div key={field.id} className="form__section form__section--split">
              <div className="form__section-half">
                  <InputValueDisplayer
                    key={field.id}
                    label={field.label}
                    value={data[field.checkedField]}
                  />
              </div>
              <div className="form__section-half form__section-half--separator" />
              <div className="form__section-half">
                {data[field.fileField] && data[field.fileField].map((file) => (
                  <FileHandler
                    key={data[field.fileField].indexOf(file)}
                    label={field.filelabel}
                    dataLink={file.dataLink}
                    url={file.file.url}
                    displayPdf={displayPdf}
                    entity={entity}
                    entityId={data.id}
                    status={file.file.status}
                  />
                ))}
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
      {categoriesToDisplay.length === 0 && (
        <div className='form__section'>
          <FormSectionTitle>Frais de transports</FormSectionTitle>
          <InputValueDisplayer
            label="Frais de transports déclarés"
            value="L'agent n'a déclaré aucun frais de transport à rembourser."
          />
        </div>
      )}
    </>
  );
};

TransportsVal.propTypes = {

};

export default TransportsVal;
