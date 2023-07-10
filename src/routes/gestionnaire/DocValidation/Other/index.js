import React from 'react';
import PropTypes from 'prop-types';

import '../style.scss';

// Components
import FormSectionTitle from 'src/components/FormSectionTitle';
import InputValueDisplayer from '../InputValueDisplayer';
import FileHandler from '../FileHandler';

const Other = ({ data, displayPdf, entity }) => {  
  return (
      <div className="form__section">
        <FormSectionTitle>Autres documents</FormSectionTitle>

        <InputValueDisplayer
          label="Autres informations"
          value={data.informations}
        />
        
        {data.files.map((file) => (
          <FileHandler
            key={data.files.indexOf(file)}
            label="Autres documents"
            dataLink={file.dataLink}
            url={file.file.url}
            displayPdf={displayPdf}
            entity={entity}
            entityId={data.id}
            status={file.file.status}
          />
        ))}

      </div>
  );
};

Other.propTypes = {
  entity: PropTypes.string.isRequired,
};

export default Other;
