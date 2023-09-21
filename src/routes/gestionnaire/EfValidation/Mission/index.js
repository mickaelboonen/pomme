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

const MissionVal = ({ displayPdf, data, entity, omData }) => {
  
  // console.log(data, omData);
  const loader = useLoaderData();
  
  // const omDataArray = Object.entries(omData);
  // const efDataArray = Object.entries(data);

  // console.log(omDataArray, efDataArray);
  // const differences = {};
  // efDataArray.forEach((entry) => {
    
  //   if (entry[0] !== 'id') {

  //     const matchingEntry = omDataArray.find((omEntry) => omEntry[1] !== entry[1]);

  //       console.log("MATCHING ENTRY =", matchingEntry);
  //     if (matchingEntry && matchingEntry !== null) {
  //       differences[matchingEntry[0]] = matchingEntry[1];
  //     }
  //   }
  // })
  
  function trouverDifferences(objet1, objet2) {
    const differences = {};
  
    for (const champ in objet1) {
      if (objet1[champ] !== objet2[champ]) {
        differences[champ] = [objet1[champ], objet2[champ]];
      }
    }

    delete differences.id;
    delete differences.modification_files;
    delete differences.modifications;

    if (differences.maps[0].length === 0 && differences.maps[1].length === 0) {
      delete differences.maps;
    }

    if (differences.mission_purpose_file) {
     if (differences.mission_purpose_file[0][0].file.name === differences.mission_purpose_file[1][0].file.name) {
      delete differences.mission_purpose_file;
     }
    }
  
    return differences;
  }
  const differences = trouverDifferences(data, omData);
  // console.log(differences);

  const differencesArray = Object.entries(differences);
  console.log(differences);
  // let defaultValues = null;

  differencesArray.forEach((diff) => {

  })
  
  
  // defaultValues = data;
  // defaultValues = addAllAddressesFields(omData);
  

  const setAddressPart = (value) => {
    if (value !== '' && value !== 0) {
      return value + ' ';
    }
    else if (value === 0) {
      return '';
    }
    return value;
  }
  const addresses = omData.addresses.map((address) => {

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


  // console.log("LOOK AT ME = ", data);
  return (
    <>
    <div className="form__section">
      <FormSectionTitle>Raison de la mission</FormSectionTitle>

      <InputValueDisplayer
        label="Motif de la mission"
        value={data.mission_purpose}
      />
      {/* {differencesArray.map((diff) => (
        <InputValueDisplayer
          key={diff[0]}
          label="Motif de la mission"
          value={data.mission_purpose}
        />
      ))} */}
    </div>
      <div className="form__section">
        <FormSectionTitle>Raison de la mission</FormSectionTitle>

        <InputValueDisplayer
          label="Motif de la mission"
          value={data.mission_purpose}
        />
        {data.mission_purpose_file.map((file) => (
          <FileHandler
            key={data.mission_purpose_file.indexOf(file)}
            label="Pièce.s justificative.s de la mission"
            dataLink={file.dataLink}
            url={file.file.url}
            displayPdf={displayPdf}
            entity={entity}
            entityId={data.id}
            status={file.file.status}
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
          </div>
          <div className="form__section-half form__section-half--separator" />
          <div className="form__section-half">
            
          <InputValueDisplayer
              label="Date et heure de la fin de mission"
              value={getDDMMYYDate(new Date(data.comeback)) + ' à ' + getHHMMTime(new Date(data.comeback))}
            />
            
            {differences.comeback && (
              <InputValueDisplayer
                label="Ancienne date prévue"
                value={getDDMMYYDate(new Date(differences.comeback[1])) + ' à ' + getHHMMTime(new Date(differences.comeback[1]))}
                plop={"truc de fou"}
              />
            )}
            <InputValueDisplayer
              label="Lieu de retour"
              value={data.comeback_place.includes('home') ? 'Résidence familiale' : 'Résidence administrative'}s
            />
          </div>
        </div>
        <FormSectionTitle>Lieu de la mission</FormSectionTitle>
        {addresses.map((address) => (
          <InputValueDisplayer
            key={address.id}
            label="Adresse de la mission"
            value={address.value}
          />
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
        <FormSectionTitle>Mission hors de la métropole</FormSectionTitle>
        
        <InputValueDisplayer
          label="Forfait de remboursement choisi"
          value={data.abroad_costs === 'per-diem' ? 'Per diem' : 'Frais réels'}
        />
        <div className="form__section form__section--documents">
          <div className="form__section-half">
            <InputValueDisplayer
              label="Visa"
              value={data.visa ? 'Oui' : 'Non'}
            />
          </div>
          <div className="form__section-half">
            <InputValueDisplayer
              label="Règlement du visa"
              value={data.visa_payment === "user" ? "Avancé par l'agent" : "Payé par Unîmes"}
            />
          </div>
        </div>
        {data.region === 'étranger' && (
          <div>
              {data.maps.map((file) => (
                <FileHandler
                  key={data.maps.indexOf(file)}
                  label="Carte du pays de la mission"
                  dataLink={file.dataLink}
                  url={file.file.url}
                  displayPdf={displayPdf}
                  entity={entity}
                  entityId={data.id}
                  status={file.file.status}
                />
              ))}
          </div>
        )}
    </>
    
  );
};

MissionVal.propTypes = {
  entity: PropTypes.string.isRequired,
};

export default MissionVal;
