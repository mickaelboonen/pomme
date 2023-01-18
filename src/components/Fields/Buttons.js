import React  from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { uploadFile } from 'src/reducer/omForm';
import {
  turnTransportsDataToDbFormat,
  turnAccomodationDataToDbFormat,
  turnAdvanceDataToDbFormat,
  turnSignatureDataToDbFormat
} from 'src/selectors/dataToDbFormat';

const Buttons = ({ step, url, id, watch, update, secondUpdate, userSignature}) => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nextStep = step + 1;
  const backStep = step - 1;
  
  const handleClick = () => {
    const data = watch();
    
    if (step === 1) { // --------------------------------------------------------------------------------
      if (data.missionPurposeFile && typeof data.missionPurposeFile !== 'string') {
        dispatch(uploadFile({data: data, step: 'mission'}));
        // navigate(url.pathname + '?' + url.searchParams);
      }
      else {
        dispatch(update(data));
        // navigate(url.pathname + '?' + url.searchParams);
      }
    }
    else if (step === 2) { // --------------------------------------------------------------------------------
      const databaseData = turnTransportsDataToDbFormat(data);

      !databaseData.vehicleId ? databaseData.vehicleId = "" : databaseData.vehicleId;

      if (databaseData.transportDispensation && typeof databaseData.transportDispensation !== 'string') {
        dispatch(uploadFile({data: databaseData, step: 'transports'}));
      } 
      else if (databaseData.vehicleAuthorization && typeof databaseData.vehicleAuthorization !== 'string') {
        dispatch(uploadFile({data: databaseData, step: 'transports'}));
      } 
      else {
        // console.log(databaseData);
        dispatch(update(databaseData));
      }
    }
    else if (step === 3) { // --------------------------------------------------------------------------------
      data.omId = id;
      const dataToBeSubmitted = turnAccomodationDataToDbFormat(data);
      dispatch(update(dataToBeSubmitted));
    }
    else if (step === 4) { // --------------------------------------------------------------------------------
      const dataToBeSubmitted = turnAdvanceDataToDbFormat(data);      
      

      if ( dataToBeSubmitted.agentRib || dataToBeSubmitted.hotelQuotation ) {
        dispatch(uploadFile({data: dataToBeSubmitted, step: 'advance'}))
      }
      else {
        dispatch(updateAdvance(dataToBeSubmitted));
      }
    }
    else if (step === 5) { // --------------------------------------------------------------------------------
      const formattedData = turnSignatureDataToDbFormat(data, userSignature);

      if (formattedData.agentSignature && typeof formattedData.agentSignature !== 'string') {
        dispatch(uploadFile({ data: formattedData, step: 'signature'}));
      } 
      else {
        dispatch(update(formattedData));
      }
      if (formattedData.files.length > 0 ) {
        dispatch(uploadFile({ data: formattedData, step: 'more'}));
      }
      else {
        dispatch(secondUpdate(formattedData));
      }
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
  userSignature: null,
};

export default Buttons;
