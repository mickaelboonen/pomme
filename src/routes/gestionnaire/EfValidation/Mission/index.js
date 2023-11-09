import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { streetType as streetArray} from 'src/data/addressData';

import '../style.scss';

// Components
import FileHandler from '../FileHandler';
import InputValueDisplayer from '../InputValueDisplayer';
import FormSectionTitle from 'src/components/FormSectionTitle';

// Selectors 
import { getDDMMYYDate, getHHMMTime } from 'src/selectors/dateFunctions';

const MissionVal = ({ displayPdf, entity, ef }) => {
  
  const data = ef.mission;
  const omData = ef.om.mission;
  const isOmModified = data.modifications;

  const { app : { countries }} = useSelector((state) => state);

  const dataToShow = isOmModified ? data : omData;
    
  function findDifferencesBetweenOmAndEf(objet1, objet2) {
    const differences = {};
 // console.log(objet1, objet2), "-----------------------------------------------------------------------------------------";
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
   // console.log(differences.mission_purpose_file);
     if (differences.mission_purpose_file[0][0].file.name === differences.mission_purpose_file[1][0].file.name) {
      delete differences.mission_purpose_file;
     }
    }
  
    return differences;
  }

  let differences = {};

  if (isOmModified) {
    differences = findDifferencesBetweenOmAndEf(data, omData);
  }
  
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
    combinedAddress += setAddressPart(streetArray.find((type) => type.id === streetType).name.toLowerCase());
    combinedAddress += setAddressPart(streetName);
    combinedAddress += setAddressPart(postCode);
    combinedAddress += setAddressPart(city);
    combinedAddress += setAddressPart(countries.find((country) => country.code === Number(countryCode)).name);
    
    const joinedAddress = {
      id: address.id,
      value: combinedAddress
    }
    return joinedAddress;
  })

  const differencesArray = Object.entries(differences);
  let differencesData = {};

  if (isOmModified) {
    differencesData = {
      "departure": {
        label: "Date et heure du début de mission",
        oldValue: differences.departure ? getDDMMYYDate(new Date(differences.departure[1])) + ' à ' + getHHMMTime(new Date(differences.departure[1])) : '',
        newValue: getDDMMYYDate(new Date(data.departure)) + ' à ' + getHHMMTime(new Date(data.departure)),
      },
      "region": {
        label: "Région de la mission",
        oldValue: differences.region ? differences.region[1] : '',
        newValue: data.region,
      },
      "comeback": {
        label: "Date et heure de la fin de mission",
        oldValue: differences.comeback ? getDDMMYYDate(new Date(differences.comeback[1])) + ' à ' + getHHMMTime(new Date(differences.comeback[1])) : '',
        newValue: getDDMMYYDate(new Date(data.comeback)) + ' à ' + getHHMMTime(new Date(data.comeback)),
      },
      // "science": null,
      "visa": {
        label: "Visa",
        oldValue: differences.visa !== null ? (differences.visa[1] ? 'Visa demandé' : 'Visa non demandé') : '',
        newValue: data.visa ? 'Oui' : 'Non',
      },
      "visa_payment": {
        label: "Règlement du visa",
        // oldValue: differences.visa_payment !== null ? (differences.visa_payment[1] ? 'Oui' : 'Non') : '',
        oldValue: differences.visa_payment[1] === null ? 'Pas de visa demandé ' : (differences.visa_payment[1] === 'user' ? "Avancé par l'agent" : "Payé par Unîmes" ),
        newValue: data.visa_payment === null ? 'Pas de visa demandé ' : (data.visa_payment === 'user' ? "Avancé par l'agent" : "Payé par Unîmes" ),
      },
      "planning": {
        label: "Planning de la mission",
        oldValue: differences.planning ? differences.planning[1] : '',
        newValue: data.planning,
      },
      "departure_place": {
        label: "Lieu de départ",
        oldValue: differences.departure_place && differences.departure_place[1].includes('home') ? 'Résidence familiale' : 'Résidence administrative' ,
        newValue: data.departure_place.includes('home') ? 'Résidence familiale' : 'Résidence administrative',
      },
      "comeback_place": {
        label: "Lieu de départ",
        oldValue: differences.comeback_place && differences.comeback_place[1].includes('home') ? 'Résidence familiale' : 'Résidence administrative' ,
        newValue: data.comeback_place.includes('home') ? 'Résidence familiale' : 'Résidence administrative',
      },
      "abroad_costs": {
        label: "Forfait de remboursement choisi",
        oldValue: differences.abroad_costs && differences.abroad_costs[1] === 'per-diem' ? 'Per diem' : 'Frais réels' ,
        newValue: data.abroad_costs === 'per-diem' ? 'Per diem' : 'Frais réels',
      },
      // "maps": [],
      // // "mission_purpose": "Formation Java",
      // "mission_purpose_file": [
  
      // ],
    }
  }

  return (
    <>
      {isOmModified && (
        <div className="form__section">
          <FormSectionTitle>Modification de la mission</FormSectionTitle>
          <div className='rules' id="mission-modification">
            <p className="rules__body-text" style={{marginTop: '0'}}>
              Cet encart apparaît car la mission a été modifiée par l'agent. Vous trouverez ci-dessous les champs modifiés ainsi que les justificatifs fournis par l'agent.
            </p>
          </div>
          {data.modification_files.map((file) => (
            <FileHandler
              key={data.modification_files.indexOf(file)}
              label="Pièce.s justificative.s de la modification"
              dataLink={file.dataLink}
              url={file.file.url}
              displayPdf={displayPdf}
              entity={entity}
              entityId={data.id}
              status={file.file.status}
            />
          ))}
          <InputValueDisplayer
            label="Modifications renseignées"
            value={data.modifications}
            alert={true}
          />
          <div className="form__section form__section--split">
            <div className="form__section-half">
              {differencesArray.map((diff) => (
                <InputValueDisplayer
                  key={"old-" + diff[0]}
                  label={"Ancien.ne " + differencesData[diff[0]].label}
                  value={differencesData[diff[0]].oldValue}
                />
              ))}
            </div>
            <div className="form__section-half form__section-half--separator" />
            <div className="form__section-half">
              {differencesArray.map((diff) => (
                <InputValueDisplayer
                key={"new-" + diff[0]}
                label={differencesData[diff[0]].label + " modifé.e"}
                value={differencesData[diff[0]].newValue}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="form__section">
        <FormSectionTitle>Raison de la mission</FormSectionTitle>
        <InputValueDisplayer
          label="Motif de la mission"
          value={dataToShow.mission_purpose}
        />
        {dataToShow.mission_purpose_file.map((file) => (
          <FileHandler
            key={dataToShow.mission_purpose_file.indexOf(file)}
            label="Pièce.s justificative.s de la mission"
            dataLink={file.dataLink}
            url={file.file.url}
            displayPdf={displayPdf}
            entity={entity}
            entityId={dataToShow.id}
            status={file.file.status}
          />
        ))}
      </div>
        <FormSectionTitle>Départ et retour</FormSectionTitle>
        <div className="form__section form__section--split">
          <div className="form__section-half">
            
            <InputValueDisplayer
              label="Date et heure du début de mission"
              value={getDDMMYYDate(new Date(dataToShow.departure)) + ' à ' + getHHMMTime(new Date(dataToShow.departure))}
            />
            <InputValueDisplayer
              label="Lieu de départ"
              value={dataToShow.departure_place ? (dataToShow.departure_place.includes('home') ? 'Résidence familiale' : 'Résidence administrative') : ''}
            />
          </div>
          <div className="form__section-half form__section-half--separator" />
          <div className="form__section-half">
            
            <InputValueDisplayer
              label="Date et heure de la fin de mission"
              value={getDDMMYYDate(new Date(dataToShow.comeback)) + ' à ' + getHHMMTime(new Date(dataToShow.comeback))}
            />
            <InputValueDisplayer
              label="Lieu de retour"
              value={dataToShow.comeback_place ? (dataToShow.comeback_place.includes('home') ? 'Résidence familiale' : 'Résidence administrative') : ''}
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
          value={dataToShow.region}
        />
        {data.planning && (
          <InputValueDisplayer
            label="Planning de la mission"
            value={dataToShow.planning}
          />
        )}
        {dataToShow.region !== "métropole" && (
          <>
            <FormSectionTitle>Mission hors de la métropole</FormSectionTitle>
            
            <InputValueDisplayer
              label="Forfait de remboursement choisi"
              value={dataToShow.abroad_costs === 'per-diem' ? 'Per diem' : 'Frais réels'}
            />
            <div className="form__section form__section--documents">
              <div className="form__section-half">
                <InputValueDisplayer
                  label="Visa"
                  value={dataToShow.visa ? 'Oui' : 'Non'}
                />
              </div>
              <div className="form__section-half">
                <InputValueDisplayer
                  label="Règlement du visa"
                  value={dataToShow.visa_payment === "user" ? "Avancé par l'agent" : "Payé par Unîmes"}
                />
              </div>
            </div>
            {dataToShow.region === 'étranger' && (
              <div>
                  {dataToShow.maps.map((file) => (
                    <FileHandler
                      key={dataToShow.maps.indexOf(file)}
                      label="Carte du pays de la mission"
                      dataLink={file.dataLink}
                      url={file.file.url}
                      displayPdf={displayPdf}
                      entity={entity}
                      entityId={dataToShow.id}
                      status={file.file.status}
                    />
                  ))}
              </div>
            )}
          </>
        )}
    </>
    
  );
};

MissionVal.propTypes = {
  entity: PropTypes.string.isRequired,
};

export default MissionVal;
