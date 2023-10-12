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

const MissionVal = ({ displayPdf, data, entity }) => {
  
  const loader = useLoaderData();
  
  let defaultValues = null;
  
  
  defaultValues = data;
  defaultValues = addAllAddressesFields(defaultValues);
  

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
  console.log(data.science);
  console.log(data.scientificEvents);
  return (
    <>
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
      {data.science && (
        <div className="form__section">
          <FormSectionTitle>Événement.s scientifique.s</FormSectionTitle>
          {data.scientificEvents.map((event) => (
            <React.Fragment key={event.id}>
              <p style={{marginTop: '0.5rem', textDecoration: 'underline'}}>Événement scientifique N°{data.scientificEvents.indexOf(event) + 1}</p>
              <div className="form__section form__section--split">
                <div className="form__section-half">

                  <InputValueDisplayer
                    label="Type de présentation"
                    value={event.presentation.map((type) => type + ' - ')}
                  />
                  <InputValueDisplayer
                    label="Date limite de paiement"
                    value={getDDMMYYDate(new Date(event.deadline))}
                  />
                  <InputValueDisplayer
                    label="Date limite de paiement"
                    value={getDDMMYYDate(new Date(event.deadline))}
                  />
                </div>
                <div className="form__section-half form__section-half--separator" />
                <div className="form__section-half">

                  <InputValueDisplayer
                    label="Coût de l'événement"
                    value={event.cost}
                  />
                  <InputValueDisplayer
                    label="Budget ou contrat concerné"
                    value={event.budget}
                  />
                  <InputValueDisplayer
                    label="Règlement de l'événement"
                    value={event.payment === "unimes" ? "Payé par Unîmes" : "Avancé par l'agent"}
                  />
                </div>
              </div>
              <InputValueDisplayer
                label="Éventuels commentaires"
                value={data.comment}
              />
              {event.pdf.map((file) => (
                <FileHandler
                  key={event.pdf.indexOf(file)}
                  label="Pièce.s justificative.s de la mission"
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
          ))}
        </div>
      )}
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
            <InputValueDisplayer
              label="Lieu de retour"
              value={data.comeback_place.includes('home') ? 'Résidence familiale' : 'Résidence administrative'}

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
