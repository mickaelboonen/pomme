import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useLoaderData, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import '../style.scss';

// Components
import EfMission from 'src/routes/documents/EfForm/Mission';
import Address2 from 'src/components/Fields/Address2';
import Buttons from 'src/components/Fields/Buttons';
import Rules from 'src/components/Rules';
import SwitchButton from 'src/components/SwitchButton';
import TextareaField from 'src/components/Fields/TextareaField';
import FileField from 'src/components/Fields/FileField';
import TextField from 'src/components/Fields/TextField';
import RadioInput from 'src/components/Fields/RadioInput';
import HiddenField from 'src/components/Fields/HiddenField';
import FormSectionTitle from 'src/components/FormSectionTitle';

// Selectors 
import { defineValidationRulesForMission } from 'src/selectors/formValidationsFunctions';
import { declareCamelCaseKeys, addAllAddressesFields } from 'src/selectors/keyObjectService';
import { getSavedFileName, getAllFilenamesForProperty, turnFieldsToAddressEntity } from 'src/selectors/formDataGetters';

// Reducer
import { enableMissionFormFields, updateEfMission } from 'src/reducer/ef';
import { uploadFile, updateOmName, updateMission } from 'src/reducer/omForm';
import { getDDMMYYDate } from 'src/selectors/dateFunctions';
import StatusChecker from 'src/components/StatusChecker';
import FileHandler from '../FileHandler';

const MissionVal = ({ step, isEfForm, data }) => {
  console.log(data);
  const dispatch = useDispatch();
  const loader = useLoaderData();
  
  const docId = loader.searchParams.get('id');
  
  const { app: { apiMessage, countries},
    agent: { user, agent },
    omForm: { currentOM, omForm },
    ef: { isMissionFormDisabled, currentEf }
  } = useSelector((state) => state);
  
  // Defining default values -----------------------------------------------------
  let defaultValues = null;
  let modificationsFilenames = '';

  
  defaultValues = data;
  
  
  const fileName = getAllFilenamesForProperty(defaultValues.missionPurposeFile);
  const mapsFileName = getAllFilenamesForProperty(defaultValues.maps);
  
  defaultValues = addAllAddressesFields(defaultValues);
  
  const {
    register, handleSubmit, watch, clearErrors,
    setError, setValue, formState: { errors }
  } = useForm({
    defaultValues: {
      ...defaultValues,
      visa: defaultValues.visa ? 'visa-yes' : 'visa-no',
    },
  });
  
  const onSubmit = (data) => {
    
    data = turnFieldsToAddressEntity(data);
    
    if (data.science) {
      if (data.scientificEvents.length === 0) {
        setError('scientificEvents', { type: 'custom', message: 'Merci de remplir le formulaire de participation à un événement scientifique.'});
        return;
      }
    }
    else if (!data.missionPurposeFile || data.missionPurposeFile.length === 0) {
      setError('missionPurposeFile', { type: 'custom', message: 'Merci de fournir le justificatif de la mission.'})
      return;
    }

    if (isEfForm) {
      if (!data.modificationSwitch) {
        
        // TODO : Update ef_mission to validated, doesn't rewrite all the data, we'll get it from the OM - so the user can't cheat
        dispatch(updateEfMission({ docId: docId, status: 2, isModified: false}))
      }
      else {
        
        if (!data.modificationFiles || data.modificationFiles.length === 0) {
          setError('modificationFiles', { type: 'custom', message: 'Merci de fournir la ou les pièces justifiant la modification.'})
          return;
        }
        data.status = 1;

        if (data.modificationFiles.length > 0) {
          dispatch(uploadFile({data: data, step: 'mission', docType: 'ef'}));
        }
        else {
          dispatch(updateEfMission(data))
        }
      }
    }
    else {
      
      const departure = new Date(data.departure);
      const comeback = new Date(data.comeback);

      const diffDays = Number(comeback.getDate()) - Number(departure.getDate());
      const timestampDiff = Date.parse(comeback) - Date.parse(departure);
            
      let errorCount = 0;

      if (timestampDiff < 0) {
        setError('comeback', {type: 'custom', message: 'La date de retour ne peut précéder la date de départ.'});
        errorCount++;
      }
      else if (diffDays === 0) {

        const diffHours = Number(comeback.getHours()) - Number(departure.getHours());

        if (diffHours < 0) {
          setError('comeback', {type: 'custom', message: "L'heure de retour ne peut précéder l'heure de départ."})
          errorCount++;
        }
        else if (diffHours === 0) {
          setError('comeback', {type: 'custom', message: 'Merci de renseigner une heure de retour valide.'})
          errorCount++;
        }
      }
      
      if (errorCount === 0) {
        data.status = 1;
        
        const fileToAdd = data.missionPurposeFile.find((file) => file instanceof File);
        let mapsToAdd = undefined;
        if (data.maps) {
          mapsToAdd = data.maps.find((file) => file instanceof File);
        }

        if (fileToAdd === undefined && mapsToAdd === undefined ) {
          delete data.om;
          dispatch(updateMission(data));
        }
        else {
           dispatch(uploadFile({data: data, step: 'mission'}));
        }
        
        const newOmName = createOmName(data);
        
        if (currentOM.name !== newOmName) {
          dispatch(updateOmName({docId: data.docId, name: newOmName}));
        }
      }
    }
  };

  const setAddressPart = (value) => {
    if (value !== '' && value !== 0) {
      return value + ' ';
    }
    else if (value === 0) {
      return '';
    }
    return value;
  }
  const addresses = data.addresses.map((address) => {

    const { streetName, streetNumber, streetType, bis, postCode, city, countryCode } = address;
    let combinedAddress = '';
    combinedAddress += setAddressPart(streetNumber);
    combinedAddress += setAddressPart(bis);
    combinedAddress += setAddressPart(streetType);
    combinedAddress += setAddressPart(streetName);
    combinedAddress += setAddressPart(postCode);
    combinedAddress += setAddressPart(city);
    combinedAddress += setAddressPart(countryCode);
    
    const joinedAddress = {
      id: address.id,
      value: combinedAddress
    }
    return joinedAddress;
  })
  // console.log("ADRESSES = ", addresses);
  return (
    <>
      <div className="form__section">
        <FormSectionTitle>Raison de la mission</FormSectionTitle>

        <TextField
          id="motif"
          disabled={isEfForm && isMissionFormDisabled}
          formField="missionPurpose"
          label="Motif de la mission"
          register={register}
          error={errors.missionPurpose}
          value={data.mission_purpose}
        />
        {data.mission_purpose_file.map((file) => (
          <FileHandler
            label="Pièce.s justificative.s de la mission"
            data={file}
          />
        ))}
      </div>
        <FormSectionTitle>Départ et retour</FormSectionTitle>
        <div className="form__section form__section--split">
          <div className="form__section-half">
            <TextField
              id="motif"
              disabled={isEfForm && isMissionFormDisabled}
              formField="departure"
              label="Date et heure du début de mission"
              register={register}
              value={data.departure}
            />
            <TextField
              id="motif"
              disabled={isEfForm && isMissionFormDisabled}
              formField="departurePlace"
              label="Lieu de départ"
              register={register}
              value={data.departure_place}
            />
          </div>
          <div className="form__section-half form__section-half--separator" />
          <div className="form__section-half">
          <TextField
              id="motif"
              disabled={isEfForm && isMissionFormDisabled}
              formField="departure"
              label="Date et heure de la fin de mission"
              register={register}
              value={data.comeback}
            />
            <TextField
              id="motif"
              disabled={isEfForm && isMissionFormDisabled}
              formField="departurePlace"
              label="Lieu de retour"
              register={register}
              value={data.comeback_place}
              // required={errorMessages.missionPurpose}
            />
          </div>
        </div>
        <FormSectionTitle>Lieu de la mission</FormSectionTitle>
        {addresses.map((address) => (
          
          <TextField
            key={address.id}
            id={"mission-address-" + address.id}
            disabled={isEfForm && isMissionFormDisabled}
            formField="-"
            label="Adresse de la mission"
            register={register}
            value={address.value}
          />
        ))}
        <TextField
          id="region"
          disabled={isEfForm && isMissionFormDisabled}
          formField="region"
          label="Région de la mission"
          register={register}
          value={data.region}
        />
        <TextareaField
          id="planning"
          disabled={isEfForm && isMissionFormDisabled}
          formField="planning"
          label="Planning de la mission"
          register={register}
          value={data.planning}
        />
        <FormSectionTitle>Mission hors de la métropole</FormSectionTitle>
        
        <TextField
          id="region"
          disabled={isEfForm && isMissionFormDisabled}
          formField="abroadCosts"
          label="Forfait de remboursement"
          register={register}
          value={data.abroadCosts}
        />
        <div className="form__section form__section--documents">
          <div className="form__section-half">
            <TextField
              id="motif"
              disabled={isEfForm && isMissionFormDisabled}
              formField="visa"
              label="Visa"
              register={register}
              value={data.visa}
            />
          </div>
          {/* <div className="form__section-half form__section-half--separator" /> */}
          <div className="form__section-half">
          <TextField
              id="motif"
              disabled={isEfForm && isMissionFormDisabled}
              formField="visaPayment"
              label="Règlement du visa"
              register={register}
              value={data.visaPayment}
            />
          </div>
        </div>
        {data.region === 'étranger' && (
          <div>
              {data.maps.map((file) => (
                <FileHandler
                  label="Carte du pays de la mission"
                  data={file}
                />
              ))}
          </div>
        )}
      <Buttons
        step={step}
        id={docId}
        url={loader}
        watch={watch}
        update={isEfForm ? updateEfMission : updateMission}
        type={isEfForm ? "ef" : "om"}
      />
    {/* </form> */}
    </>
    
  );
};

MissionVal.propTypes = {

};

export default MissionVal;
