import React from 'react';
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

const MissionVal = ({ displayPdf, data }) => {

  const loader = useLoaderData();
  // const docId = loader.searchParams.get('id');
  
  // const { 
  //   ef: { isMissionFormDisabled }
  // } = useSelector((state) => state);
  
  // Defining default values -----------------------------------------------------
  let defaultValues = null;
  // let modificationsFilenames = '';

  
  defaultValues = data;
  defaultValues = addAllAddressesFields(defaultValues);
  
  // const {
  //   register, formState: { errors }
  // } = useForm({
  //   defaultValues: {
  //     ...defaultValues,
  //     visa: defaultValues.visa ? 'visa-yes' : 'visa-no',
  //   },
  // });
  // const { register, formState: { errors } } = useForm();

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
  console.log(data);
  return (
    <>
      <div className="form__section">
        <FormSectionTitle>Raison de la mission</FormSectionTitle>

        <InputValueDisplayer
          label="Motif de la mission"
          value={data.mission_purpose}
        />
        {/* <TextField
          id="motif"
          formField="missionPurpose"
          label="Motif de la mission"
          register={() => {}}
          value={data.mission_purpose}
        /> */}
        {data.mission_purpose_file.map((file) => (
          <FileHandler
            key={data.mission_purpose_file.indexOf(file)}
            label="Pièce.s justificative.s de la mission"
            data={file}
            field='mission.mission_purpose_file'
            displayPdf={displayPdf}
          />
        ))}
      </div>
        <FormSectionTitle>Départ et retour</FormSectionTitle>
        <div className="form__section form__section--split">
          <div className="form__section-half">
            
            <InputValueDisplayer
              label="Date et heure du début de mission"
              value={getDDMMYYDate(new Date(data.departure)) + ' à ' + getHHMMTime(new Date(data.departure))}
            />
            <InputValueDisplayer
              label="Lieu de départ"
              value={data.departure_place.includes('home') ? 'Résidence familiale' : 'Résidence administrative'}
            />
            {/* <TextField
              id="motif"
              formField="departure"
              register={() => {}}
            /> */}
            
            {/* <TextField
              id="motif"
              formField="departurePlace"
              label="Lieu de départ"
              register={() => {}}
              value={data.departure_place}
            /> */}
          </div>
          <div className="form__section-half form__section-half--separator" />
          <div className="form__section-half">
            
            <InputValueDisplayer
              label="Date et heure de la fin de mission"
              value={getDDMMYYDate(new Date(data.comeback)) + ' à ' + getHHMMTime(new Date(data.comeback))}
            />
            <InputValueDisplayer
              label="Lieu de retour"
              value={data.comeback_place.includes('home') ? 'Résidence familiale' : 'Résidence administrative'}

            />
          {/* <TextField
              id="motif"
              formField="comback"
              label="Date et heure de la fin de mission"
              register={() => {}}
              value={getDDMMYYDate(new Date(data.comeback)) + ' à ' + getHHMMTime(new Date(data.comeback))}
            />
            <TextField
              id="motif"
              formField="comebackPlace"
              label="Lieu de retour"
              register={() => {}}
              value={data.comeback_place}
              // required={errorMessages.missionPurpose}
            /> */}
          </div>
        </div>
        <FormSectionTitle>Lieu de la mission</FormSectionTitle>
        {addresses.map((address) => (
          
          <InputValueDisplayer
            label="Adresse de la mission"
            value={address.value}
          />
          // <TextField
          //   key={address.id}
          //   id={"mission-address-" + address.id}
          //   formField="-"
          //   label="Adresse de la mission"
          //   register={() => {}}
          //   value={address.value}
          // />
        ))}
        
        <InputValueDisplayer
          label="Région de la mission"
          value={data.region}
        />
        {data.planning && (
          <InputValueDisplayer
            label="Planning de la mission"
            value={data.planning}
          />
        )}
        {/* <TextField
          id="region"
          formField="region"
          label="Région de la mission"
          register={() => {}}
          value={data.region}
        />
        <TextareaField
          id="planning"
          formField="planning"
          label="Planning de la mission"
          register={() => {}}
          value={data.planning}
        /> */}
        <FormSectionTitle>Mission hors de la métropole</FormSectionTitle>
        
        <InputValueDisplayer
          label="Forfait de remboursement choisi"
          value={data.abroad_costs === 'per-diem' ? 'Per diem' : 'Frais réels'}
        />
        {/* <TextField
          id="region"
          formField="abroadCosts"
          label="Forfait de remboursement"
          register={() => {}}
          value={data.abroadCosts}
        /> */}
        <div className="form__section form__section--documents">
          <div className="form__section-half">
            {/* <TextField
              id="motif"
              formField="visa"
              label="Visa"
              register={() => {}}
              value={data.visa}
            /> */}
            
            <InputValueDisplayer
              label="Visa"
              value={data.visa ? 'Oui' : 'Non'}
            />
          </div>
          {/* <div className="form__section-half form__section-half--separator" /> */}
          <div className="form__section-half">
            <InputValueDisplayer
              label="Règlement du visa"
              value={data.visa_payment === "user" ? "Avancé par l'agent" : "Payé par Unîmes"}
            />
          {/* <TextField
              id="motif"
              formField="visaPayment"
              label="Règlement du visa"
              register={() => {}}
              value={data.visaPayment}
            /> */}
          </div>
        </div>
        {data.region === 'étranger' && (
          <div>
              {data.maps.map((file) => (
                <FileHandler
                  key={data.maps.indexOf(file)}
                  label="Carte du pays de la mission"
                  data={file}
                  field='mission.maps'
                  displayPdf={displayPdf}
                />
              ))}
          </div>
        )}
    </>
    
  );
};

MissionVal.propTypes = {

};

export default MissionVal;
