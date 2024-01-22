import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


// import './style.scss';

import '../style.scss';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
// import { Link, useLoaderData } from 'react-router-dom';
// import { FaEye, FaDownload, FaEyeSlash } from 'react-icons/fa';
import { BlobProvider, Document, PDFViewer } from '@react-pdf/renderer';
// import '../style.scss';

// Components
import OmPdf from 'src/components/PDF/OmPdf';


// Actions
import CarAuthorizationPdf from 'src/components/PDF/CarAuthorizationPdf';
import DispensationPdf from 'src/components/PDF/DispensationPdf';

const PDFsSupervisor = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate()

  const {
    register,
    setValue,
    watch,
    setError,
    handleSubmit,
    formState:
      { errors }
  } = useForm();

  // const [dispensations, member] = watch(['dispensations', 'member']);

  const {
    docs: { isModalOpen },
    app: { countries },
    vehicle: { vehicleTypes },
    tmp: { tmpAgent, agentProfessionalAddress, agentPersonalAddress, signature },
    presidency: { loader, pdfsToCreate, currentOm, presidencyVehicles, proceedToPdf}
  } = useSelector((state) => state);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const onSubmit = (data) => {

    console.log(data);

  }

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

  const om = currentOm ? currentOm : JSON.parse(localStorage.getItem('permanentOm'));
  const pdfsToGenerate = pdfsToCreate.length > 0 ? pdfsToCreate : JSON.parse(localStorage.getItem('pdfsToCreate'));

  // console.log(pdfsToGenerate, JSON.parse(localStorage.getItem('pdfsToCreate')));
  const selectedCar = presidencyVehicles.find((v) => v.id == om.transports.vehicle);
  // console.log(selectedCar);
  let authorizationData = null;
  // console.log(pdfsToGenerate);
  if (pdfsToGenerate.indexOf('car') >= 0) {
    authorizationData = {
      carType: 'personal-car',
      reasons: ['time', 'no-public-transports', 'materials-transporting', 'carpooling'],
      ...selectedCar
    }
  }

  let dispensationsData = [];
  pdfsToGenerate.forEach((disp) => {
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
        reasons: om.mission.mission_purpose,
        rule: rule,
        status: true,
        file: null
      }
      dispensationsData.push(dispData);
    }
  })



  useEffect(() => {
    const button = document.getElementById('doc-downloader');
    button.click();
  }, [pdfsToCreate])



  const lastname = 'ROIG';

  const [isPdfVisible, setIsPdfVisible] = useState(false)

  const toggleViewer = (event) => {
    
    if (event.target.id.includes('closer')) {
      setIsPdfVisible(false);
    }
    else {
      setIsPdfVisible(true);
    }
  }

  const selectDocumentToRender = (docType) => {
    if (docType === 'train' || docType === 'avion' || docType === 'taxi') {
      return (
        <DispensationPdf
          data={dispensationsData.find((disp) => disp.type.includes(docType))}
          signature={'null'}
          gest={{}}
        />
      )
    }
    else if (docType === 'car') {
      return (
        <CarAuthorizationPdf
          data={authorizationData}
          agent={{firstname: "Benoît", lastname: 'Roig'}}
          vehicleTypes={vehicleTypes}
          reasons={staticReasons}
          signature={'null'}
          gest={{}}
        
        />
      )
    }
    return (
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
    )
  }
// console.log();
const setDocumentName = (docType) => {

  const splitOmName = om.name.split("-");

  let docName = splitOmName[0] + '-' + splitOmName[2];
  if (docType === 'train' || docType === 'taxi') {
    return docName + "-Demande-de-derogation-pour-le-" + docType
  }
  if (docType === 'avion') {
    return docName + "-Demande-de-derogation-pour-l-" + docType
  }
  else if (docType === 'car') {
    return docName + "-Demande-d-autorisation-de-vehicule"
  }
  return om.name
}
// console.log();
return (
    <>
      <div className='form'>
        <div className='form__section'>
          <div className="form__section-field-buttons" style={{textAlign: 'center'}}>
            <BlobProvider document={
              <Document>
                {selectDocumentToRender(pdfsToGenerate[0])}
              </Document>
            }>
              {({ blob }) => (
                <div>
                  <button type="button" id='doc-downloader' onClick={() => { const data = watch(); data.file = new File([blob], setDocumentName(pdfsToGenerate[0]), {type: 'pdf'}); onSubmit(data);}}>
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
      </div>
      {isPdfVisible && (
          <div className="pdf-viewer">
            <div className="pdf-viewer__nav">
              <p className="pdf-viewer__nav-close" id="viewer-closer" onClick={toggleViewer}>Fermer la fenêtre</p>
            </div>
            <PDFViewer>
              <Document>
                {selectDocumentToRender(pdfsToGenerate[0])}
              </Document>
            </PDFViewer>
          </div>
        )}
    </>
  );
}
PDFsSupervisor.propTypes = {

};

export default PDFsSupervisor;
