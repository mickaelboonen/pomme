import React  from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from 'src/reducer/omForm';
import {
  turnTransportsDataToDbFormat,
  turnAccomodationDataToDbFormat,
  turnAdvanceDataToDbFormat,
  turnSignatureDataToDbFormat
} from 'src/selectors/dataToDbFormat';

const Buttons = ({ trigger, step, url, id, watch, update, userSignature}) => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.agent);

  const nextStep = step + 1;
  const backStep = step - 1;
  
  const handleClick = () => {
    const data = watch();

    // Since we're are not validating fields here, we set the status to false so the user will know it has been verified
    data.status = 0;
    
    
    for (const [key, value] of Object.entries(data)) {
      if (key.includes('_')) {
        delete data[key];
      }
    }

    // trigger();
    
    if (step === 1) { // --------------------------------------------------------------------------------

      data.missionAddress = {
        id: data.addressId,
        streetNumber: data.streetNumber,
        bis: data.bis,
        streetType: data.streetType,
        streetName: data.streetName,
        postCode: data.postCode,
        city: data.city,
      }
  
      delete data.addressId;
      delete data.streetNumber;
      delete data.bis;
      delete data.streetType;
      delete data.streetName;
      delete data.postCode;
      delete data.city;
      

      let fileObject = null;

      if (data.missionPurposeFile) {
        fileObject = data.missionPurposeFile.find((file) => file instanceof File);
      }
      
      if (fileObject) {
        dispatch(uploadFile({data: data, step: 'mission'}));
      }
      else {
        dispatch(update(data));
      }
    }
    else if (step === 2) { // --------------------------------------------------------------------------------
      
      const databaseData = turnTransportsDataToDbFormat(data);

      // return;

      !databaseData.vehicleId ? databaseData.vehicleId = "" : databaseData.vehicleId;

      if (databaseData.transportDispensation && typeof databaseData.transportDispensation !== 'string') {
        dispatch(uploadFile({data: databaseData, step: 'transports'}));
      } 
      else if (databaseData.vehicleAuthorization && typeof databaseData.vehicleAuthorization !== 'string') {
        dispatch(uploadFile({data: databaseData, step: 'transports'}));
      } 
      else {
        
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
      
      if ( dataToBeSubmitted.agentRib instanceof File || dataToBeSubmitted.hotelQuotation instanceof File ) {
        dispatch(uploadFile({data: dataToBeSubmitted, step: 'advance'}))
      }
      else {
        dispatch(update(dataToBeSubmitted));
      }
    }
    else if (step === 5) { // --------------------------------------------------------------------------------
      const formattedData = turnSignatureDataToDbFormat(data, userSignature);

      const infosFile = formattedData.files.find((file) => file instanceof File);
      if (formattedData.agentSignature instanceof File || infosFile instanceof File) {
        dispatch(uploadFile({ data: formattedData, step: 'more-and-signature'}));
      } 
      else {
        dispatch(update(formattedData));
      }
      
    }
  }

  const setNewSearch = (url, step) => {
    return '?etape=' + step + url.search.slice(8);
  }
  
  return (
    <div className="form__section">
      <div className="form__section-field-buttons">
        <div className="form__section-field-buttons__row">
          <button type="button" id="previous-button" onClick={handleClick}>Enregistrer la saisie en cours</button>
          <button type="submit">Valider la saisie définitive</button>
        </div>
        <div className="form__section-field-buttons__row">
          <Link to={step === 1 ? `/utilisateur/${user}/mes-ordres-de-mission` : url.pathname + setNewSearch(url, backStep)}>{'<<'}</Link>
          <Link to={url.pathname + setNewSearch(url, nextStep)}>{'>>'}</Link>
        </div>
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
  om: null,
};

export default Buttons;
