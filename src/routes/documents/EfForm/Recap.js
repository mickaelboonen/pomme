import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useLoaderData, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BlobProvider, PDFViewer } from '@react-pdf/renderer';

import './style.scss';

import FormSectionTitle from 'src/components/FormSectionTitle';
import ApiResponse from 'src/components/ApiResponse';
import EfPDF from 'src/components/PDF/EfPDF';
import { floatAddition, floatMultiplication } from 'src/selectors/mathFunctions';

import { getDDMMYYDate, getHHMMTime } from 'src/selectors/dateFunctions';
const Recap = () => {

  
  const dispatch = useDispatch();

  const { ef: { currentEf },
    app: { apiMessage, userSignature, countries },
    omForm: { currentOM },
      agent: { agent, user },
  } = useSelector((state) => state);
  
  const { mission, transports, accomodations, stages } = currentEf;
  console.log("STAGES IN STEPS = ", stages);
  
  const { register, setValue, getValues, watch, formState: { errors } } = useForm({ defaultValues: agent });

    let transportsFields = Object.entries(transports).filter((transport) => !transport[0].includes('_files') && transport[1]);
  transportsFields = transportsFields.filter((transport) => transport[0] !== 'id' && transport[0] !== 'status');

  const transportsAmountsArray = transportsFields.map((t) => t[1]);
  const totalTransportsExpenses = floatAddition(transportsAmountsArray);

  //------------------------------------------------------------------------------------------------
  const adminMealsAmount = floatMultiplication(accomodations.meals_in_admin_restaurants, '7,63');
  const frenchMeals = floatMultiplication(accomodations.meals_paid_by_agent_in_france, '15.25');
  const totalMeals = floatAddition([adminMealsAmount, frenchMeals]);
  
  const totalMission = floatAddition([totalMeals, accomodations.event, totalTransportsExpenses, accomodations.hotel])

  const mealsExpenses = {
    admin : adminMealsAmount,
    french: frenchMeals,
  };
  
  
  const generatePDF = () => {
    const file = getValues('om');
    dispatch(uploadFile({ data: {docId: omId , file: file}, step: 'om'}))
  }

  const missionCountry = countries.find((country) => country.code === Number(mission.country))

  return (
  <div className="form">  
        {/* <div style={{height: "80vh"}}>
          <PDFViewer className='form__section-recap'>
            <EfPDF
              agentSignature={userSignature}
              data={currentEf}
              agent={agent}
              meals={mealsExpenses}
              country={missionCountry}
            />
          </PDFViewer>
        </div>  */}
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

        {transports.personal_car && <p className='form__section-recap'>Utilisation d'un véhicule personnel : <span>{km}</span>.</p>}

      </div>
    </div>
    <div className="form__section" style={{marginBottom: '1rem'}}>
      <FormSectionTitle>Hébergement</FormSectionTitle>
      {accomodations.hotel > 0 && <p className='form__section-recap'>Total des frais d'hébergement déclarés pour la mission : <span>{accomodations.hotel}€</span>.</p>}
      {accomodations.hotel === 0 && <p className='form__section-recap'>Pas de frais d'hébergement à rembourser.</p>}
    </div>
    <div className="form__section" style={{marginBottom: '1rem'}}>
      <FormSectionTitle>Repas</FormSectionTitle>
      {totalMeals !== '0,00' && <p className='form__section-recap'>Total des frais de repas déclarés pour la mission : <span>{totalMeals}€</span>.</p>}
      {totalMeals === '0,00' && <p className='form__section-recap'>Pas de frais d'hébergement à rembourser.</p>}
      <p className='form__section-recap form__section-recap--lister'>Rappel des frais déclarés : </p>
      <div className='form__section-field' style={{margin: '0.5rem'}}>
        <p className='form__section-recap'>Montant des repas pris dans un restaurant administratif ou assimilé : <span>{adminMealsAmount}€</span> pour <span>{accomodations.meals_in_admin_restaurants} repas</span>.</p>
        {mission.region === "métropole" && <p className='form__section-recap'>Montant des repas à titre onéreux en France : <span>{frenchMeals}€</span> pour <span>{accomodations.meals_paid_by_agent_in_france} repas</span>.</p>}
        {mission.region !== "métropole" && <p className='form__section-recap'>Nombre des repas à titre onéreux à l'étranger : <span>{accomodations.meals_paid_by_agent_overseas} repas</span>.</p>}
        
        {mission.region !== "métropole" && <p className='form__section-recap form__section-recap--infos'>Pour avoir une idée du montant remboursé pour votre mission à l'étranger, veuillez vous rendre sur <Link to="https://www.economie.gouv.fr/dgfip/mission_taux_chancellerie/frais"> le site de la DGFIP</Link>. La valeur du <span>Groupe 1</span> vous indiquera le montant du forfait per diem comprenant l'hébergement et deux repas.</p>}
      </div>
    </div>
    {(transports.visa || accomodations.event) && (<div className="form__section" style={{marginBottom: '1rem'}}>
      <FormSectionTitle>Autres frais de Mission</FormSectionTitle>

      {transports.visa && <p className='form__section-recap'>Montant du visa : <span>{transports.visa}€</span>.</p>}
      {accomodations.event && <p className='form__section-recap'>Montant des frais d'inscription à un colloque, réunion, séminaire scientifique : <span>{accomodations.event}€</span>.</p>}
      {accomodations.event && <p className='form__section-recap form__section-recap--infos'>Compte rendu à adresser obligatoirement au service de la recherche.</p>}
    </div>)}
    {stages.length > 0 && (
      <div className="form__section" style={{marginBottom: '1rem'}}>
        <FormSectionTitle>Étapes de la Mission</FormSectionTitle>

          <table className='steps__recap'>
            <thead>
                <tr>
                  <td>ÉTAPES</td>
                  <td>DATE</td>
                  <td>HEURE</td>
                  <td>COMMUNE</td>
                  <td>MATIN : HEURES DE DÉBUT ET FIN DE COURS</td>
                  <td>APRES-MIDI : HEURES DE DÉBUT ET FIN DE COURS</td>
                </tr>
            </thead>
            <tbody>
              {stages.map((step) => (
                <React.Fragment key={step.id}>
                  <tr>
                    <td>Départ</td>
                    <td>{getDDMMYYDate(new Date(step.departure ))}</td>
                    <td>{getHHMMTime(new Date(step.departureHour))}</td>
                    <td>{step.departurePlace}</td>
                    <td>{step.amCourseBeginning}</td>
                    <td>{step.amCourseEnding}</td>
                  </tr>
                  <tr>
                    <td>Arrivée</td>
                    <td>{step.arrival ? getDDMMYYDate(new Date(step.arrival)): step.arrival}</td>
                    <td>{getHHMMTime(new Date(step.arrivalHour))}</td>
                    <td>{step.arrivalPlace}</td>
                    <td>{step.pmCourseBeginning}</td>
                    <td>{step.pmCourseEnding}</td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>


      </div>
    )}
      <div className="form__section" style={{marginBottom: '1rem'}}>
        <FormSectionTitle>Total</FormSectionTitle>
        {mission.region === "métropole" && (
          <>
            <p className='form__section-recap'>Total des frais déclarés pour la mission : <span>{totalMission}€</span>.</p>
            {currentOM.advance.advance_amount && <p className='form__section-recap form__section-recap--infos'><span>Pour rappel :</span> vous avez bénéficié d'une avance de <span>{currentOM.advance.advance_amount}€</span> qui sera déduite lors du calcul du remboursement définitif effectué par le service financier d'Université.</p>}
            <p className='form__section-recap form__section-recap--infos'><span>Attention :</span> le montant remboursé peut être différent selon les plafonds de remboursement.</p>
          </>
        )}
        {mission.region !== "métropole" && (
          <>
            <p className='form__section-recap'>Dû aux différents taux de remboursement du forfait per diem, nous ne pouvons vous fournir une estimation du total des frais engagés par votre mission.</p>
            {currentOM.advance.advance_amount && <p className='form__section-recap form__section-recap--infos'><span>Pour rappel :</span> vous avez bénéficié d'une avance de <span>{currentOM.advance.advance_amount}€</span> qui sera déduite lors du calcul du remboursement définitif effectué par le service financier d'Université.</p>}
          </>
        )}
      </div>
    {apiMessage.response && <ApiResponse apiResponse={apiMessage} updateForm={true} />}
      <div className="form__section">
        <div className="form__section-field-buttons" style={{display: 'flex', justifyContent: 'center'}}>
          <BlobProvider document={<EfPDF
              agentSignature={userSignature}
              data={currentEf}
              agent={agent}
              meals={mealsExpenses}
              country={missionCountry}
            />}>
            {({ blob }) => {

              const file = new File([blob], currentEf.name, {type: 'pdf'});
              const fileUrl = URL.createObjectURL(file);
              
              setValue('om', file);
              return (
                <a href={fileUrl} download={currentEf.name + '.pdf'} style={{textAlign: 'center'}}>
                  <button type='button' files={file} onClick={generatePDF}>Valider les données et télécharger l'Ordre de Mission</button>
                </a>
              );
            }}
          </BlobProvider>
        </div>
        <Link to={"/utilisateur/" + user + "/mes-ordres-de-mission"} style={{display: 'block', marginBottom: '2rem', textAlign: 'center'}}>Retour au menu des États de Frais</Link>
      </div>
  </div>
);}

Recap.propTypes = {

};

export default Recap;
