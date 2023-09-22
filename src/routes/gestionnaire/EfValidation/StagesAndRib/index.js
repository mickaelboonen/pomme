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

const StagesAndRib = ({ stages, displayPdf, entity, rib}) => {
  return (
    <>
      <div className="form__section">
        <FormSectionTitle>Raison de la mission</FormSectionTitle>
        {rib.agent_rib.map((file) => (
          <FileHandler
            key={rib.agent_rib.indexOf(file)}
            label="RIB de l'agent"
            dataLink={file.dataLink}
            url={file.file.url}
            displayPdf={displayPdf}
            entity={entity}
            entityId={rib.id}
            status={file.file.status}
          />
        ))}
      </div>
      {stages.length > 0 && (
          <div className="form__section">
            <FormSectionTitle>Étapes de la Mission</FormSectionTitle>

              <table className='steps__recap'>
                <thead>
                    <tr>
                      <td>ÉTAPES</td>
                      <td>DATE</td>
                      <td>HEURE</td>
                      <td>COMMUNE</td>
                      <td>MATIN : HEURES DE DÉBUT ET FIN DE COURS</td>
                      <td>APRES-MIDI : HEURES DE DÉBUT ET FIN DE COURS</td>
                    </tr>
                </thead>
                <tbody>
                  {stages.map((step) => (
                    <React.Fragment key={step.id}>
                      <tr>
                        <td>Départ</td>
                        <td>{getDDMMYYDate(new Date(step.departure ))}</td>
                        <td>{getHHMMTime(new Date(step.departure_hour))}</td>
                        {/* <td>{step.departureHour}</td> */}
                        <td>{step.departure_place}</td>
                        <td>{step.am_course_beginning}</td>
                        <td>{step.am_course_ending}</td>
                      </tr>
                      <tr>
                        <td>Arrivée</td>
                        <td>{step.arrival ? getDDMMYYDate(new Date(step.arrival)): step.arrival}</td>
                        <td>{getHHMMTime(new Date(step.arrival_hour))}</td>
                        {/* <td>{step.arrivalHour}</td> */}
                        <td>{step.arrival_place}</td>
                        <td>{step.pm_course_beginning}</td>
                        <td>{step.pm_course_ending}</td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>

              <div className='steps__recap-mobile'>
                <p className='form__section-recap form__section-recap--infos'>Le tableau des étapes ne peut être affiché sur mobile. Veuillez passer en version ordinateur (menu de votre navigateur &gt; version pour ordinateur) pour pouvoir contrôler le détail des étapes. Merci de votre compréhension.</p>
              </div>
          </div>
      )}
      {stages.length === 0 && (
        <div className="form__section">
          <FormSectionTitle>Étapes</FormSectionTitle>
            <InputValueDisplayer
              label="Étapes"
              value="Aucune étape de mission n'a été renseignée."
            />
        </div>
      )}
    </>
  );
};

StagesAndRib.propTypes = {
  // entity: PropTypes.string.isRequired,
};

export default StagesAndRib;
