import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
// import { Link, useLoaderData } from 'react-router-dom';
// import { FaEye, FaDownload, FaEyeSlash } from 'react-icons/fa';
import { BlobProvider, Document, PDFViewer } from '@react-pdf/renderer';
import '../style.scss';

// Components
import { useDispatch, useSelector } from 'react-redux';
import OmPdf from 'src/components/PDF/OmPdf';

import ReturnLink from 'src/components/Visas/ReturnLink';

import OneFileForm from 'src/components/OneFileForm';


// Actions
import {  addEfMonitoringPdf,addOmMonitoringPdf } from 'src/reducer/omManager';
import CarAuthorizationPdf from 'src/components/PDF/CarAuthorizationPdf';
import DispensationPdf from 'src/components/PDF/DispensationPdf';
import classNames from 'classnames';

const DocsGenerator = ({ data }) => {

  // console.log(data);

  const {
    watch,
  } = useForm();


  const dispatch = useDispatch();
  const {
    docs: { isModalOpen },
    app: { countries },
    vehicle: { vehicleTypes },
    tmp: { tmpAgent, agentProfessionalAddress, agentPersonalAddress, loader, signature },
    presidency: { presidencyUsers, presidencyVehicles}
  } = useSelector((state) => state);


 

//---------------------------------------------------------------------------

  // console.log("errors = ", errors);
  const agentFullData = {
    ...tmpAgent,
    ...agentProfessionalAddress,
    ...agentPersonalAddress
  };
  const staticReasons = [
    {
      id: "time",
      label: "Gain de temps",
    },
    {
      id: "no-public-transports",
      label: "Absence de transport en commun",
    },
    {
      id: "materials-transporting",
      label: "Obligation de transport de matériel lourd, encombrant, fragile",
    },
    {
      id: "handicap",
      label: "Handicap",
    },
    {
      id: "carpooling",
      label: "Transport d'autres missionnaires",
    },
  ];


  //---------------------------------------------------------------------------
  const submitFunction = (data) => {
 // console.log("I AM HERE");
    let errorCount = 0;

    
    if (errorCount > 0) {
   // console.log("here ? ");
      return;
    }

    return;

    if (isOm) {
      dispatch(addOmMonitoringPdf({data: data, task: 'replace', nextAction: data.action === 'validate' ? 'stampOm' : 'rejectVisaOm'}));
    }
    else {
      dispatch(addEfMonitoringPdf({data: data, task: 'replace', nextAction: data.action === 'validate' ? 'stampEf' : 'rejectVisaEf'}));
    }

    

}
  
  const [isPdfVisible, setIsPdfVisible] = useState(false)

  const toggleViewer = (event) => {
    
    if (event.target.id.includes('closer')) {
      setIsPdfVisible(false);
    }
    else {
      setIsPdfVisible(true);
    }
  }
  // console.log(presidencyVehicles);
  const selectedCar = presidencyVehicles.find((v) => v.id == data.car);
  // console.log(selectedCar);
  let authorizationData = null;
  if (data.dispensations.indexOf('car') >= 0) {
    authorizationData = {
      carType: 'personal-car',
      reasons: ['time', 'no-public-transports', 'materials-transporting', 'carpooling'],
      ...selectedCar
    }
  }

  let dispensationsData = [];
  data.dispensations.forEach((disp) => {
    if (disp !== 'car') {

      let dispensationTitle = 'Demande de dérogation pour '
      // let reasons = '';
      let rule = '';

      if (disp === 'train') {
        dispensationTitle += "le train";
        rule = `La règle générale est la 2nde classe pro ou la classe économique pour les transports
        en commun, sauf mention explicite sur l’ordre de mission, justifiée par :
        - la nature du déplacement et les conditions du voyage,
        - la durée du voyage (supérieure à 6h pour le train)
        - une offre commerciale avantageuse,
        - une dérogation exceptionnelle du chef d’établissement
        - la possession d’une carte d’abonnement ou de réduction permettant d’obtenir
        un tarif moins onéreux. `
      }
      else if (disp === 'avion') {
        dispensationTitle += "l'avion";
        rule = `La règle générale est la 2nde classe pro ou la classe économique pour les transports
        en commun, sauf mention explicite sur l’ordre de mission, justifiée par :
        - la nature du déplacement et les conditions du voyage,
        - la durée du voyage (supérieure à 6h pour le train)
        - une offre commerciale avantageuse,
        - une dérogation exceptionnelle du chef d’établissement
        - la possession d’une carte d’abonnement ou de réduction permettant d’obtenir
        un tarif moins onéreux. `

      }
      else if (disp === 'taxi') {
        dispensationTitle += "le taxi";
        rule = `L’utilisation du taxi doit rester exceptionnelle. Elle peut être autorisée sur décision de l’ordonnateur :
        - Lorsqu’il y a une obligation de transporter du matériel fragile, lourd ou
        encombrant.
        - En cas d’absence permanente ou occasionnelle de moyen de transport en
        commun
        - En raison d’horaires nocturnes (avant 7h ou après 22h)
        - En cas de circonstances exceptionnelles (grèves, retard ou panne des
        transports en commun, etc.)
        - Lorsque le missionnaire est en situation de handicap.`
      }

      
      const dispData = {
        type: dispensationTitle,
        reasons: data.purpose,
        rule: rule,
        status: true,
        file: null
      }
      dispensationsData.push(dispData);
    }
  })




  const om = {
    // "id": 13,
    "name": "B.ROIG-OM-PERMANENT-2024",
    "status": 13,
    "url": "path",
    "missioner": "broig",
    "comments": "",
    "created_at": "2023-06-27T11:40:12+01:00",
    "expenses": true,
    "is_ponctual": false,
    "mission": {
        // "id": 12,
        "departure": "2024-01-01T00:00:00+00:00",
        "region": "métropole",
        "comeback": "2024-12-31T23:59:59+01:00",
        "science": null,
        "status": true,
        "visa": null,
        "addresses": [
            {
                // "id": 1,
                "streetNumber": null,
                "bis": "",
                "streetType": "",
                "postCode": " ",
                "city": "France Métropolitaine",
                "countryCode": 100,
                "streetName": "",
                "address": null,
                "address2": null
            }
        ],
        "planning": null,
        "maps": [],
        "abroad_costs": null,
        "departure_place": "departure-home",
        "mission_purpose": data.purpose,
        "mission_purpose_file": [],
        "comeback_place": "comeback-home",
        "visa_payment": null
    },
    "transports": {
        // "id": 12,
        "taxi": data.dispensations.indexOf('taxi'),
        "parking": true,
        "vehicle": data.car,
        "dispensations": dispensationsData,
        "authorizations": [
            {
                "id": 1,
                "vehicle": { ...selectedCar},
                "registration_document": "",
                "signatures": [],
                "insurance": "",
                "reasons": ['time', 'no-public-transports', 'materials-transporting', 'carpooling'],
                "type": "personal-car",
                "file": null,
                "other_reasons": null,
                "status": false
            }
        ],
        "status": true,
        "ferry": false,
        "toll": true,
        "vehicle_authorization": null,
        "transport_dispensation": null,
        "public_transports": true,
        "transport_type": [
            "train",
            "plane"
        ],
        "transport_payment": [
          "no-train-payment",
          "no-plane-payment"
        ],
        "transport_class": [
          data.dispensations.indexOf('train') ? "first-class" : "second-class",
          data.dispensations.indexOf('avion') ? "business-class" : "eco-class"
        ],
        "taxi_dispensation": null
    },
    "accomodations": {
        // "id": 12,
        "hotel": true,
        "status": true,
        "nights_number": null,
        "hotel_payment": null,
        "meals_paid_by_agent": null,
        "meals_in_admin_restaurants": null
    },
    "advance": {
        // "id": 12,
        "status": true,
        "advance": true,
        "advance_amount": null,
        "total_amount": null,
        "hotel_quotations": [],
        "nights_number": null,
        "meals_number": null,
        "other_expenses_amount": null,
        "other_expenses_justification": null,
        "agent_rib": null,
        "agent_signature": null,
        "unknown_amount": true
    },
    "more": {
        // "id": 12,
        "informations": null,
        "files": [],
        "status": true
    },
    "management": {
        // "id": 12,
        "percent": "",
        "ub": "",
        "cr": "",
        "nacres": "",
        "lolf": "",
        "analytique": "",
        "workflow": [],
        "validation_channel": [],
        "management_files": null
    },
    "type": "presidence",
    "file": null
};


// console.log("authorizationData : ", authorizationData);
  return (
    <>
        <div className='form__section'>
          <div className="form__section-field-buttons" style={{textAlign: 'center'}}>
              <BlobProvider document={
                <Document>
                  <OmPdf
                    countries={countries}
                    data={om}
                    agent={
                      {
                        firstname: "Benoît",
                        lastname: 'Roig',
                        unimesStatus: 'Président',
                        unimesCategory: 'PR1',
                        unimesDepartment: 'Présidence',
                        address: '6 chemin de la Sarriette',
                        postCode: 30820,
                        city: 'CAVEIRAC',
                        addressPro: 'Université de Nîmes',
                        address2Pro: 'rue du Dr Georges Salan',
                        postCodePro: 30000,
                        cityPro: 'NÎMES',

                      }
                    }
                    vehicleTypes={vehicleTypes}
                    manager={om.management}
                    signature={signature ? signature.link : ''}
                  />
                  <CarAuthorizationPdf
                    data={authorizationData}
                    agent={{firstname: "Benoît", lastname: 'Roig'}}
                    vehicleTypes={vehicleTypes}
                    reasons={staticReasons}
                    signature={'null'}
                    gest={{}}
                
                  />
                  {dispensationsData.length > 0 && dispensationsData.map((disp) => (
                    <DispensationPdf
                      key={'d-' + dispensationsData.indexOf(disp)}
                      data={disp}
                      signature={'null'}
                      gest={{}}
                    />
                  ))}
                </Document>
              }>
                {({ blob }) => (
                  <div>
                    <button type="button" onClick={() => { const data = watch(); data.file = new File([blob], data.name, {type: 'pdf'}); submitFunction(data);}}>
                      Valider le document
                    </button>
                    <button type="button" id="viewer-opener" onClick={toggleViewer} style={{marginLeft: '1rem'}}>
                      VOIR
                    </button>
                  </div>
                )}
              </BlobProvider>
          </div>
        </div>
        <ReturnLink
          link={"/présidence"}
        />
        {isPdfVisible && (
          <div className="pdf-viewer">
            <div className="pdf-viewer__nav">
              <p className="pdf-viewer__nav-close" id="viewer-closer" onClick={toggleViewer}>Fermer la fenêtre</p>
            </div>
            <PDFViewer>
              <Document>
                <OmPdf
                  countries={countries}
                  data={om}
                  agent={
                    {
                      firstname: "Benoît",
                      lastname: 'Roig',
                      unimesStatus: 'Président',
                      unimesCategory: 'PR1',
                      unimesDepartment: 'Présidence',
                      address: '6 chemin de la Sarriette',
                      postCode: 30820,
                      city: 'CAVEIRAC',
                      addressPro: 'Université de Nîmes',
                      address2Pro: 'rue du Dr Georges Salan',
                      postCodePro: 30000,
                      cityPro: 'NÎMES',

                    }
                  }
                vehicleTypes={vehicleTypes}
                  manager={om.management}
                  signature={signature ? signature.link : ''}
                />
                  <CarAuthorizationPdf
                    data={authorizationData}
                    agent={{firstname: "Benoît", lastname: 'Roig'}}
                    vehicleTypes={vehicleTypes}
                    reasons={staticReasons}
                    signature={''}

                  />
                  {dispensationsData.length > 0 && dispensationsData.map((disp) => (
                    <DispensationPdf
                      key={'d-' + dispensationsData.indexOf(disp)}
                      data={disp}
                      signature={'null'}
                      gest={{name: 'Benoît Roig', role: 'Président'}}
                    />
                  ))}
              </Document>
            </PDFViewer>
          </div>
        )}
      {/* <div className={classNames("modal__background", {"modal__background--open": isModalOpen})} /> */}
      {/* {isModalOpen && <OneFileForm onUserPage={false} />} */}
    </>
  );
};

DocsGenerator.propTypes = {
};

export default DocsGenerator;
