import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { useLoaderData } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import '../style.scss';

// Components
import TextareaField from 'src/components/Fields/TextareaField';
import TextField from 'src/components/Fields/TextField';
import FormSectionTitle from 'src/components/FormSectionTitle';

// Selectors 
import { addAllAddressesFields } from 'src/selectors/keyObjectService';

// Reducer
import { getDDMMYYDate, getHHMMTime } from 'src/selectors/dateFunctions';
import FileHandler from '../FileHandler';
import InputValueDisplayer from '../InputValueDisplayer';

const Advance = ({ displayPdf, data, entity }) => {
  console.log(data);
  
  return (
    <>
    <div className="form__section">
      <FormSectionTitle>Montants</FormSectionTitle>
      {data.unknown_amount && (
        <InputValueDisplayer
          label="Règlement de l'hôtel"
          value="Demande transmise au service financier pour qu'ils calculent l'avance."
        />
      )}
      {!data.unknown_amount && (
        <>
          <InputValueDisplayer
            label="Montant de l'avance demandée"
            value={data.advance_amount + '€'}
          />
          <InputValueDisplayer
            label="Montant total estimé de la mission"
            value={data.total_amount + '€'}
          />
        </>
      )}
      

    </div>
      <div className="form__section">
        <FormSectionTitle>Hébergement</FormSectionTitle>
        <InputValueDisplayer
          label="Nombre de nuits d'hôtel"
          value={data.nights_number}
        />
        <InputValueDisplayer
          label="Nombre de repas"
          value={data.meals_number}
        />
        
        {data.hotel_quotations.map((file) => (
          <FileHandler
            key={data.hotel_quotations.indexOf(file)}
            label="Devis de l'hôtel"
            dataLink={file.dataLink}
            url={file.file.url}
            displayPdf={displayPdf}
            entity={entity}
            entityId={data.id}
            status={file.file.status}
          />
        ))}

      </div>
        <FormSectionTitle>RIB</FormSectionTitle>
        
          {data.agent_rib.file === null && (
            <InputValueDisplayer
              label="RIB"
              value="Aucun RIB trouvé"
            />
          )}
              
          {data.agent_rib.file && (
            <FileHandler
              label="RIB"
              dataLink={data.agent_rib.dataLink}
              url={data.agent_rib.file.url}
              displayPdf={displayPdf}
              entity={entity}
              entityId={data.id}
              status={data.agent_rib.file.status}
            />
          )}
    </>
    
  );
};

Advance.propTypes = {
  entity: PropTypes.string.isRequired,
};

export default Advance;
