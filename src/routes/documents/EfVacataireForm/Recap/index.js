import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useLoaderData, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BlobProvider, Document, PDFViewer } from '@react-pdf/renderer';

import '../../EfForm/style.scss';

import EfPDF from 'src/components/PDF/EfPdf';
import FormSectionTitle from 'src/components/FormSectionTitle';

import { uploadFile } from 'src/reducer/omForm'
import { getDDMMYYDate, getHHMMTime } from 'src/selectors/dateFunctions';
import { floatAddition, floatMultiplication, OTHER_MEALS_AMOUNT, ADMIN_MEALS_AMOUNT} from 'src/selectors/mathFunctions';
import EfVacatairePdf from '../../../../components/PDF/EfVacatairePdf';

const Recap = () => {

  
  const dispatch = useDispatch();
  const loaderData = useLoaderData();
  const id = Number(loaderData.searchParams.get('id'));
  const omId = Number(loaderData.searchParams.get('om'));

  const { ef: { currentEf },
    app: { countries },
    omForm: { currentOM, omForm },
    docs: { agentSignature },
    agent: { agent, user, oms, agentProfessionalAddress, agentPersonalAddress},
  } = useSelector((state) => state);
  // console.log(currentEf);
  const {  transports, accomodations } = currentEf;
  
  const { setValue, getValues } = useForm({ defaultValues: agent });

  let transportsFields = Object.entries(transports).filter((transport) => (!transport[0].includes('_files') && transport[0] !== 'km' && transport[0] !== 'horsepower' ) && transport[1]);
  transportsFields = transportsFields.filter((transport) => transport[0] !== 'id' && transport[0] !== 'status');

  const transportsAmountsArray = transportsFields.map((t) => t[1]);

  const totalTransportsExpenses = floatAddition(transportsAmountsArray);

  //------------------------------------------------------------------------------------------------
  const adminMealsAmount = floatMultiplication(accomodations.meals_in_admin_restaurants, ADMIN_MEALS_AMOUNT);
  const frenchMeals = floatMultiplication(accomodations.meals_paid_by_agent_in_france, ADMIN_MEALS_AMOUNT);

  const totalMeals = floatAddition([adminMealsAmount, frenchMeals]);
  
  const totalMission = floatAddition([totalMeals, accomodations.event, totalTransportsExpenses, accomodations.hotel])

  const mealsExpenses = {
    admin : adminMealsAmount,
    french: frenchMeals,
  };
  
  
  const generatePDF = () => {
    const file = getValues('ef');
    
    dispatch(uploadFile({ data: {docId: id , file: file}, step: 'ef', docType: 'ef'}))
  }

  // const missionCountry = countries.find((country) => country.code === Number(mission.country));

  const fullAgentData = {
    ...agent,
    ...agentProfessionalAddress,
    ...agentPersonalAddress,
  }


  let dataForThePdf = { ...currentEf };

  // if (!currentEf.mission.modifications) {
    // dataForThePdf = {
      // ...currentEf,
      // mission: currentOM.mission
    // }
  // }
  
  const [isPdfVisible, setIsPdfVisible] = useState(false)

  const toggleViewer = (event) => {

    if (event.target.id.includes('closer')) {
      setIsPdfVisible(false);
    }
    else {
      setIsPdfVisible(true);
    }
  }

  return (
    <>
      <div className="form" style={{width: '75%', maxWidth: '100%'}}>  
        <div className="form__section" style={{marginBottom: '1rem'}}>
          <FormSectionTitle>Transports</FormSectionTitle>
          <p className='form__section-recap'>Total des frais de transports déclarés pour la mission : <span>{totalTransportsExpenses}€</span>.</p>
          <p className='form__section-recap form__section-recap--lister'>Rappel des frais déclarés : </p>
          <div className='form__section-field' style={{margin: '0.5rem'}}>
            {transports.ferry && <p className='form__section-recap'>Montant des frais de ferry : <span>{transports.ferry}€</span>.</p>}
            {transports.fuel && <p className='form__section-recap'>Montant des frais d'essence (seulement pour les véhicules administratifs ou de location) : <span>{transports.fuel}€</span>.</p>}
            {transports.plane && <p className='form__section-recap'>Montant des frais d'avion : <span>{transports.plane}€</span>.</p>}
            {transports.train && <p className='form__section-recap'>Montant des frais de train : <span>{transports.train}€</span>.</p>}
            {transports.toll && <p className='form__section-recap'>Montant des frais de péage : <span>{transports.toll}€</span>.</p>}
            {transports.parking && <p className='form__section-recap'>Montant des frais de parking : <span>{transports.parking}€</span>.</p>}
            {transports.taxi && <p className='form__section-recap'>Montant des frais de taxi : <span>{transports.taxi}€</span>.</p>}
            {transports.public_transports && <p className='form__section-recap'>Montant des frais de transports en commun : <span>{transports.public_transports}€</span>.</p>}
            {transports.rent_car && <p className='form__section-recap'>Montant de la facture du véhicule de location : <span>{transports.rent_car}€</span>.</p>}

            {transports.km && <p className='form__section-recap'>Utilisation d'un véhicule personnel ( <span>{transports.horsepower}</span> chevaux ) : <span>{transports.km}</span> km.</p>}

          </div>
        </div>
        <div className="form__section" style={{marginBottom: '1rem'}}>
          <FormSectionTitle>Hébergement</FormSectionTitle>
          {accomodations.hotel > 0 && <p className='form__section-recap'>Total des frais d'hébergement déclarés pour la mission : <span>{accomodations.hotel}€</span>.</p>}
          {(accomodations.hotel === 0 || !accomodations.hotel) && <p className='form__section-recap'>Pas de frais d'hébergement à rembourser.</p>}
        </div>
        <div className="form__section" style={{marginBottom: '1rem'}}>
          <FormSectionTitle>Repas</FormSectionTitle>
          {totalMeals !== 0 && <p className='form__section-recap'>Total des frais de repas déclarés pour la mission : <span>{totalMeals}€</span>.</p>}
          {totalMeals === 0 && <p className='form__section-recap'>Pas de frais d'hébergement à rembourser.</p>}
          <p className='form__section-recap form__section-recap--lister'>Rappel des frais déclarés : </p>
          <div className='form__section-field' style={{margin: '0.5rem'}}>
            <p className='form__section-recap'>Montant des repas pris dans un restaurant administratif ou assimilé : <span>{adminMealsAmount}€</span> pour <span>{accomodations.meals_in_admin_restaurants} repas</span>.</p>
            <p className='form__section-recap'>Montant des repas à titre onéreux en France : <span>{frenchMeals}€</span> pour <span>{accomodations.meals_paid_by_agent_in_france} repas</span>.</p>
          </div>
        </div>
        {((transports.visa !== null && transports.visa !== 0) || (accomodations.event !== null && accomodations.event !== 0) ) && (
          <div className="form__section" style={{marginBottom: '1rem'}}>
            <FormSectionTitle>Autres frais de Mission</FormSectionTitle>
            {(transports.visa !== null && transports.visa !== 0)  && <p className='form__section-recap'>Montant du visa : <span>{transports.visa}€</span>.</p>}
            {(accomodations.event !== null && accomodations.event !== 0)  && <p className='form__section-recap'>Montant des frais d'inscription à un colloque, réunion, séminaire scientifique : <span>{accomodations.event}€</span>.</p>}
            {(accomodations.event !== null && accomodations.event !== 0)  && <p className='form__section-recap form__section-recap--infos'>Compte rendu à adresser obligatoirement au service de la recherche.</p>}
          </div>
        )}
        {/* {stages.length > 0 && (
          <div className="form__section" style={{marginBottom: '1rem'}}>
            <FormSectionTitle>Étapes de la Mission</FormSectionTitle>
              <div className="steps__tables">
              <table className='steps__recap steps__recap--vacataires' style={{ width: '59%'}}>
                <thead className='steps__recap-head'>
                    <tr className='steps__recap-head-row'>
                      <td className='steps__recap-head-row-column'>ÉTAPES</td>
                      <td className='steps__recap-head-row-column'>DATE</td>
                      <td className='steps__recap-head-row-column'>HEURE DE DÉPART</td>
                      <td className='steps__recap-head-row-column'>HEURE D'ARRIVÉE</td>
                      <td className='steps__recap-head-row-column'>COMMUNE</td>
                    </tr>
                </thead>
                <tbody className='steps__recap-body'>
                  {stages.map((step) => (
                    <React.Fragment key={step.id}>
                      <tr className='steps__recap-body-row'>
                        <td className='steps__recap-body-row-column steps__recap-body-row-column--label'>Départ</td>
                        <td className='steps__recap-body-row-column'>{getDDMMYYDate(new Date(step.departure ))}</td>
                        <td className='steps__recap-body-row-column'>{getHHMMTime(new Date(step.departureHour))}</td>
                        <td className='steps__recap-body-row-column'>{getHHMMTime(new Date(step.arrivalHour))}</td>
                        <td className='steps__recap-body-row-column steps__recap-body-row-column--city'>{step.departurePlace}</td>
                      </tr>
                      <tr className='steps__recap-body-row'>
                        <td className='steps__recap-body-row-column steps__recap-body-row-column--label'>Retour</td>
                        <td className='steps__recap-body-row-column'>{step.arrival ? getDDMMYYDate(new Date(step.arrival)): step.arrival}</td>
                        <td className='steps__recap-body-row-column'>{getHHMMTime(new Date(step.workDepartureHour))}</td>
                        <td className='steps__recap-body-row-column'>{getHHMMTime(new Date(step.homeArrivalHour))}</td>
                        <td className='steps__recap-body-row-column steps__recap-body-row-column--city'>{step.arrivalPlace}</td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              <table className='steps__recap steps__recap--vacataires' style={{ width: '39%'}}>
                <thead className='steps__recap-head'>
                  <tr className='steps__recap-head-row'>
                      <td className='steps__recap-head-row-column steps__recap-head-row-column--quarter'>DATE DU COURS</td>
                      <td className='steps__recap-head-row-column steps__recap-head-row-column--quarter'>PÉRIODE</td>
                      <td className='steps__recap-head-row-column steps__recap-head-row-column--quarter'>HEURES DE DÉBUT DE COURS</td>
                      <td className='steps__recap-head-row-column steps__recap-head-row-column--quarter'>HEURES DE FIN DE COURS</td>
                    </tr>
                </thead>
                <tbody className='steps__recap-body'>
                  {stages.map((step) => (
                    <React.Fragment key={step.id}>
                      <tr className='steps__recap-body-row'>
                        <td className='steps__recap-body-row-column steps__recap-body-row-column--quarter'>{getDDMMYYDate(new Date(step.departure))}</td>
                        <td className='steps__recap-body-row-column steps__recap-body-row-column--quarter steps__recap-body-row-column--label'>MATIN</td>
                        <td className='steps__recap-body-row-column steps__recap-body-row-column--quarter'>{step.amCourseBeginning}</td>
                        <td className='steps__recap-body-row-column steps__recap-body-row-column--quarter'>{step.amCourseEnding}</td>
                      </tr>
                      <tr className='steps__recap-body-row'>
                        <td className='steps__recap-body-row-column steps__recap-body-row-column--quarter'></td>
                        <td className='steps__recap-body-row-column steps__recap-body-row-column--quarter steps__recap-body-row-column--label'>APRES-MIDI</td>
                        <td className='steps__recap-body-row-column steps__recap-body-row-column--quarter'>{step.pmCourseBeginning}</td>
                        <td className='steps__recap-body-row-column steps__recap-body-row-column--quarter'>{step.pmCourseEnding}</td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              </div>

              <div className='steps__recap-mobile'>
                <p className='form__section-recap form__section-recap--infos'>Le tableau des étapes ne peut être affiché sur mobile. Veuillez passer en version ordinateur (menu de votre navigateur &gt; version pour ordinateur) pour pouvoir contrôler le détail des étapes. Merci de votre compréhension.</p>
              </div>
          </div>
        )} */}
      
          <div className="form__section" style={{marginBottom: '1rem'}}>
            <FormSectionTitle>Total</FormSectionTitle>
            <p className='form__section-recap'>Total des frais déclarés pour la mission : <span>{totalMission}€</span>.</p>
            <p className='form__section-recap form__section-recap--infos'><span>Attention :</span> le montant remboursé peut être différent selon les plafonds de remboursement.</p>
          </div>
        {/* {apiMessage.response && <ApiResponse apiResponse={apiMessage} updateForm={true} />} */}
          <div className="form__section">
            <div className="form__section-field-buttons" style={{display: 'flex', justifyContent: 'center'}}>
              <BlobProvider document={
                <Document>
                  <EfVacatairePdf
                    agentSignature={agentSignature}
                    om={oms.find((om) => om.id == omId)}
                    data={dataForThePdf}
                    agent={fullAgentData}
                    meals={mealsExpenses}
                    country={{name: 'ALLEMAGNE'}}
                  />
                </Document>
                }>
                {({ blob }) => {

                  const file = new File([blob], currentEf.name, {type: 'pdf'});
                  const fileUrl = URL.createObjectURL(file);
                  
                  setValue('ef', file);
                  return (
                    <>
                      <a href={fileUrl} download={currentEf.name + '.pdf'} style={{textAlign: 'center'}}>
                        <button type='button' files={file} onClick={generatePDF}>Valider les données <br /> et télécharger <br /> l'État de Frais</button>
                      </a>
                      <button type="button" id="viewer-opener" onClick={toggleViewer} style={{marginLeft: '1rem'}}>
                        Visualiser <br /> le document
                      </button>
                    </>
                  );
                }}
              </BlobProvider>
            </div>
            <Link to={"/utilisateur/mes-ordres-de-mission"} style={{display: 'block', marginBottom: '2rem', textAlign: 'center'}}>Retour au menu des États de Frais</Link>
          </div>
      </div>
      {isPdfVisible && (
        <div className="pdf-viewer">
          <div className="pdf-viewer__nav">
            <p className="pdf-viewer__nav-close" id="viewer-closer" onClick={toggleViewer}>Fermer la fenêtre</p>
          </div>
          <PDFViewer className='form__section-recap'>
            <Document>
              <EfVacatairePdf
                agentSignature={agentSignature}
                om={oms.find((om) => om.id == omId)}
                data={dataForThePdf}
                agent={fullAgentData}
                meals={mealsExpenses}
                country={{name: 'ALLEMAGNE'}}
              />
            </Document>
          </PDFViewer>
        </div>
      )}
    </>
  );
};

Recap.propTypes = {

};

export default Recap;
