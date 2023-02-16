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

const Buttons = ({ trigger, step, url, id, watch, update, secondUpdate, userSignature}) => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      delete data.missionAdress;

      const fileObject = data.missionPurposeFile.find((file) => file instanceof File);
      console.log(fileObject);
      if (fileObject) {
        dispatch(uploadFile({data: data, step: 'mission'}));
        navigate(url.pathname + '?' + url.searchParams);
      }
      else {
        dispatch(update(data));
        navigate(url.pathname + '?' + url.searchParams);
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
      console.log(data);
      const dataToBeSubmitted = turnAdvanceDataToDbFormat(data);   
      console.log(dataToBeSubmitted);   

      console.log(typeof dataToBeSubmitted.hotelQuotation, dataToBeSubmitted.hotelQuotation);
      
      // return;
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
