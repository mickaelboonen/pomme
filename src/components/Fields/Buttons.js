import React  from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { uploadFile } from 'src/reducer/omForm';
import {
  turnTransportsDataToDbFormat,
  turnAccomodationDataToDbFormat
} from 'src/selectors/dataToDbFormat';

const Buttons = ({ step, url, id, watch, update, secondUpdate}) => {
  
  const dispatch = useDispatch();

  const nextStep = step + 1;
  const backStep = step - 1;
  
  const handleClick = () => {
    const data = watch();
    console.log(data);
    if (step === 1) {
      if (typeof data.missionPurposeFile === 'string' || !data.missionPurposeFile) {
        // delete data.om;
        dispatch(update(data));
      }
      else {
         dispatch(uploadFile({data: data, step: 'mission'}));
      }
    }
    else if (step === 2) {
      const databaseData = turnTransportsDataToDbFormat(data);

      const typesToIgnore = ['string', null];
      console.log(typesToIgnore.indexOf(typeof databaseData.transportDispensation) , typesToIgnore.indexOf(typeof databaseData.vehicleAuthorization));
      
      // if (typesToIgnore.indexOf(typeof databaseData.transportDispensation) === -1 || typesToIgnore.indexOf(typeof databaseData.vehicleAuthorization) === -1) {
      // console.log('here ?');
      if ((databaseData.transportDispensation && databaseData.transportDispensation.length > 0) || (databaseData.transportDispensation && databaseData.transportDispensation.length > 0)) {
        dispatch(uploadFile({data: databaseData, step: 'transports'}));
        console.log('upload files');
      }
        
      // }
      // Else we directly update the transports entity
      else {
        console.log('update data');
        dispatch(update(databaseData));
        // TODO : last erreur
        // "The identifier id is missing for a query of App\\Entity\\Vehicle"
      }
    }

    else if (step === 3) {
      
      data.omId = id;
      const dataToBeSubmitted = turnAccomodationDataToDbFormat(data);
      // console.log(dataToBeSubmitted);
      dispatch(update(dataToBeSubmitted));
    }

    else if (step === 4) {
      
    }

    else if (step === 5) {
      
    }

  }
  return (
    <div className="form__section">
      <div className="form__section-field-buttons">
        <button type='button'><Link to={url.pathname + '?etape=' + backStep + '&id=' + id}>PRÉCÉDENT</Link></button>
        <button type="button" id="previous-button" onClick={handleClick}>Enregistrer en l'état</button>
        <button type="submit">Valider les données</button>
        <button type='button'><Link to={url.pathname + '?etape=' + nextStep + '&id=' + id}>SUIVANT</Link></button>
      </div>
    </div>
  );
};

Buttons.propTypes = {
  step: PropTypes.number.isRequired,
};

Buttons.defaultProps = {
  secondUpdate: null,
};

export default Buttons;
