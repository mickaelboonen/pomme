import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { useLoaderData } from 'react-router-dom';
import { streetType as streetArray} from 'src/data/addressData';
import { useDispatch, useSelector } from 'react-redux';


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
import InputHtmlDisplayer from '../../../../components/InputHtmlDisplayer';

const ScientificEvent = ({ entity, displayPdf, data, event}) => {
  return (
    <React.Fragment>
      <p style={{marginTop: '0.5rem', textDecoration: 'underline'}}>Événement scientifique N°{data.scientificEvents.indexOf(event) + 1}</p>
      <div className="form__section form__section--split">
        <div className="form__section-half">
          <InputValueDisplayer
            label="Date de l'événement"
            value={getDDMMYYDate(new Date(event.date))}
          />
          {event.cost && (
            <InputValueDisplayer
              label="Coût de l'événement"
              value={event.cost + "€"}
            />
          )}
          <InputValueDisplayer
            label="Budget ou contrat concerné"
            value={event.budget}
          />

        </div>
        <div className="form__section-half form__section-half--separator" />
        <div className="form__section-half">
          <InputValueDisplayer
            label="Type de présentation"
            value={event.presentation.map((type) => type + ' - ')}
          />
          {event.cost && (
            <InputValueDisplayer
              label="Date limite de paiement"
              value={getDDMMYYDate(new Date(event.deadline))}
            />
          )}
          <InputValueDisplayer
            label="Règlement de l'événement"
            value={event.payment === "unimes" ? "Payé par Unîmes" : event.payment === "free" ? "Payé par un autre organisme" : "Avancé par l'agent"}
          />
        </div>
      </div>
      <InputValueDisplayer
        label="Éventuels commentaires"
        value={event.comment ?? ''}
      />
      {event.pdf.map((file) => (
        <FileHandler
          key={event.pdf.indexOf(file)}
          label="PDF de la demande"
          dataLink={file.dataLink}
          url={file.file.url}
          displayPdf={displayPdf}
          entity={entity}
          entityId={data.id}
          status={file.file.status}
        />
      ))}
      {event.files.map((file) => (
        <FileHandler
          key={event.files.indexOf(file)}
          label="Pièce.s justificative.s de la mission"
          dataLink={file.dataLink}
          url={file.file.url}
          displayPdf={displayPdf}
          entity={entity}
          entityId={data.id}
          status={file.file.status}
        />
      ))}
    </React.Fragment>

  );
}

ScientificEvent.propTypes = {

};

export default ScientificEvent;
