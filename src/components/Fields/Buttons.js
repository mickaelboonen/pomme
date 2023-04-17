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
  turnSignatureDataToDbFormat,
  efAccomodationsToDbFormat
} from 'src/selectors/dataToDbFormat';
import { turnFieldsToAddressEntity } from '../../selectors/formDataGetters';
import { addSteps, handleSteps } from 'src/reducer/app';

const Buttons = ({ step, url, id, watch, update, userSignature, type}) => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { agent: { user },
    app : { agentDocuments },
    ef: { currentEf }
  } = useSelector((state) => state);

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
    
    if (step === 1) { // --------------------------------------------------------------------------------

      if (type === 'ef') {
        
        if (data.modificationSwitch) {

          const dataToBeSubmitted = turnFieldsToAddressEntity(data);
          
          let fileObject = null;
  
          if (dataToBeSubmitted.missionPurposeFile) {
            fileObject = dataToBeSubmitted.missionPurposeFile.find((file) => file instanceof File);
          }
          
          if (fileObject) {
            dispatch(uploadFile({data: dataToBeSubmitted, step: 'mission', docType: 'ef'}));
          }
          else {
            dispatch(update(dataToBeSubmitted));
          }
        }
        else {
          dispatch(update({ docId: data.docId, status: data.status, isModified: false}));
        }
      }
      else {

        const dataToBeSubmitted = turnFieldsToAddressEntity(data);        

        let fileObject = null;

        if (dataToBeSubmitted.missionPurposeFile) {
          fileObject = dataToBeSubmitted.missionPurposeFile.find((file) => file instanceof File);
        }
        
        if (fileObject) {
          dispatch(uploadFile({data: dataToBeSubmitted, step: 'mission', docType: 'om'}));
        }
        else {
          dispatch(update(dataToBeSubmitted));
        }
      }
      // console.log(url);
      navigate(url.pathname + url.search)
    }
    else if (step === 2) { // --------------------------------------------------------------------------------
      
      if (type === 'ef') {
        delete data.fields;
        delete data.otherSwitch;

        const filesArray = Object.entries(data).filter((entry) => entry[0].includes('Files'));

        const firstFoundFile = filesArray.find((property) => property[1].find((value) => value instanceof File));
        console.log(data);
        // return;
        if (firstFoundFile === undefined) {
          dispatch(update(data));
        }
        else {
          dispatch(uploadFile({data: data, step: 'transports', docType: 'ef'}))
        }
      }
      else {
        const databaseData = turnTransportsDataToDbFormat(data);

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

    }
    else if (step === 3) { // --------------------------------------------------------------------------------

      if (type === "ef") {
        // const dataToBeSubmitted = efAccomodationsToDbFormat(data);
        if ( data.eventFiles.length > 0 || data.hotelFiles.length > 0 ) {
          dispatch(uploadFile({data: data, step: 'accomodations', docType: 'ef'}));
        }
        else {
          dispatch(update(data));
        }
      }
      else {
        data.omId = id;
        const dataToBeSubmitted = turnAccomodationDataToDbFormat(data);
        dispatch(update(dataToBeSubmitted));
      }
    }
    else if (step === 4) { // --------------------------------------------------------------------------------

      if (type !== "ef") {

        if (data.savedRib) {
          data.rib = agentDocuments.rib;
        }
        const dataToBeSubmitted = turnAdvanceDataToDbFormat(data);

        if ( dataToBeSubmitted.agentRib instanceof File || dataToBeSubmitted.hotelQuotation instanceof File ) {
          dispatch(uploadFile({data: dataToBeSubmitted, step: 'advance'}))
        }
        else {
          dispatch(update(dataToBeSubmitted));
        }
      }
      else {

        const stepsArray = [];
        for (let i = 1; i <= data.numberDays; i++) {
          stepsArray.push(i);
        }
        

        const entities = stepsArray.map((stepIndex) => {
          const step = {};
          step.id = data['id' + stepIndex]
          step.amCourseBeginning = data['amCourseBeginning' + stepIndex];
          step.amCourseEnding = data['amCourseEnding' + stepIndex];
          step.pmCourseBeginning = data['pmCourseBeginning' + stepIndex];
          step.pmCourseEnding = data['pmCourseEnding' + stepIndex];
          step.departurePlace = data['departurePlace' + stepIndex];
          step.arrivalPlace = data['arrivalPlace' + stepIndex];
          step.departure = data['departure' + stepIndex];
          step.arrival = data['arrival' + stepIndex];
          step.departureHour = data['departureHour' + stepIndex];
          step.arrivalHour = data['arrivalHour' + stepIndex];
          step.workDepartureHour = data['workDepartureHour' + stepIndex];
          step.homeArrivalHour = data['homeArrivalHour' + stepIndex];
          
          return step;
        })
    
        if (currentEf.stages.length === 0) {
          dispatch(addSteps({data: entities, type: 'ef', docId: id}))
        }
        else {
          
          dispatch(handleSteps({data: entities, type: 'ef', docId: id}))
        }
      }
    }
    else if (step === 5) { // --------------------------------------------------------------------------------

      if (type === 'ef') {
        delete data.savedRib;
        delete data.savedSignature;
        if (data.agentSignature instanceof File || data.agentRib instanceof File) {
          dispatch(uploadFile({data: data, step: 'signature', docType: 'ef'}));
        }
        else {
          dispatch(update(data))
        }
      }
      else {
        const infosFile = data.files.find((file) => file instanceof File);
        if (data.agentSignature instanceof File || infosFile instanceof File) {
          dispatch(uploadFile({ data: data, step: 'more-and-signature'}));
        } 
        else {
          dispatch(update(data));
        }

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
