import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useLoaderData, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BlobProvider, PDFViewer } from '@react-pdf/renderer';

import './style.scss';

import FormSectionTitle from 'src/components/FormSectionTitle';
import ApiResponse from 'src/components/ApiResponse';
import EfPDF from 'src/components/PDF/EfPDF';

const Recap = () => {

  
  const dispatch = useDispatch();

  const { ef: { currentEf },
    app: { apiMessage, userSignature },
    agent: { agent, user },
  } = useSelector((state) => state);

  const { mission, transports, accomodations } = currentEf;
  
  const { register, setValue, getValues, watch, formState: { errors } } = useForm({ defaultValues: agent });
  // const errorMessages = defineValidationRulesForMission(isEfForm, false);
  

  const floatAddition = (floatArray) => {
    let floatTotal = 0;

    floatArray.forEach((float) => {
      if (typeof float === 'number') {
        float = float.toString() + ',00';
      }
      floatTotal += Number(float.replace(',', ''));
    })

    const floatResult =  floatTotal.toString();
    
    if (floatResult === '0') {
      return '0,00';
    }
    else {
      return floatResult.slice(0, floatResult.length - 2) + ',' + floatResult.slice(floatResult.length - 2);
    }
  }

  const floatMultiplication = (int, float) => {
    const floatX100 = Number(float.replace(',', ''));
    const totalX100 = floatX100 * int;

    const floatResult =  totalX100.toString();
    
    if (floatResult === '0') {
      return '0,00';
    }
    else {
      return floatResult.slice(0, floatResult.length - 2) + ',' + floatResult.slice(floatResult.length - 2);
    }
  }

  let transportsFields = Object.entries(transports).filter((transport) => !transport[0].includes('_files') && transport[1]);
  transportsFields = transportsFields.filter((transport) => transport[0] !== 'id' && transport[0] !== 'status');

  const transportsAmountsArray = transportsFields.map((t) => t[1]);
  const totalTransportsExpenses = floatAddition(transportsAmountsArray);

  //------------------------------------------------------------------------------------------------
  const adminMealsAmount = floatMultiplication(accomodations.meals_in_admin_restaurants, '7,63');
  const frenchMeals = floatMultiplication(accomodations.meals_paid_by_agent_in_france, '15.25');
  const overseasMeals = floatMultiplication(accomodations.meals_paid_by_agent_overseas, '15.25');
  const totalMeals = floatAddition([adminMealsAmount, frenchMeals, overseasMeals]);
  
  const totalMission = floatAddition([totalMeals, accomodations.event, totalTransportsExpenses, accomodations.hotel, ])

  
  
  const generatePDF = () => {
    const file = getValues('om');
    dispatch(uploadFile({ data: {docId: omId , file: file}, step: 'om'}))
  }
  
  
  useEffect(() => {
    const aze = document.querySelector('iframe');
    
    aze.style.width = '100%';
    aze.style.height = '100%';
  }, [])

  return (
  <div className="form">  
        <div style={{height: "80vh"}}>
          <PDFViewer>
            <EfPDF agentSignature={userSignature} data={currentEf} agent={agent} mealsExpenses={{admin : adminMealsAmount, french: frenchMeals, overseas: overseasMeals}} x={'lol'}/>
          </PDFViewer>
        </div> 
    <div className="form__section" style={{marginBottom: '1rem'}}>
      <FormSectionTitle>Transports</FormSectionTitle>
      <p>Total des frais de transports déclarés pour la mission : {totalTransportsExpenses}€.</p>
      <p>Rappel des frais déclarés : </p>
      <div className='form__section-field' style={{margin: '0.5rem'}}>
        {transports.ferry && <p>Montant des frais de <span>ferry</span> : {transports.ferry}€.</p>}
        {transports.fuel && <p>Montant des frais d'<span>essence</span> (seulement pour les véhicules administratifs ou de location) : {transports.fuel}€.</p>}
        {transports.plane && <p>Montant des frais d'<span>avion</span> : {transports.plane}€.</p>}
        {transports.train && <p>Montant des frais de <span>train</span> : {transports.train}€.</p>}
        {transports.toll && <p>Montant des frais de <span>péage</span> : {transports.toll}€.</p>}
        {transports.parking && <p>Montant des frais de <span>parking</span> : {transports.parking}€.</p>}
        {transports.taxi && <p>Montant des frais de <span>taxi</span> : {transports.taxi}€.</p>}
        {transports.public_transports && <p>Montant des frais de <span>transports en commun</span> : {transports.public_transports}€.</p>}
        {transports.rent_car && <p>Montant de la facture du <span>véhicule de location</span> : {transports.rent_car}€.</p>}

        {transports.personal_car && <p>Utilisation d'un <span>véhicule personnel</span> : {km}.</p>}

      </div>
    </div>
    <div className="form__section" style={{marginBottom: '1rem'}}>
      <FormSectionTitle>Hébergement</FormSectionTitle>
      {accomodations.hotel > 0 && <p>Total des frais d'hébergement déclarés pour la mission : {accomodations.hotel}€.</p>}
      {accomodations.hotel === 0 && <p>Pas de frais d'hébergement à rembourser.</p>}
    </div>
    <div className="form__section" style={{marginBottom: '1rem'}}>
      <FormSectionTitle>Repas</FormSectionTitle>
      {totalMeals !== '0,00' && <p>Total des frais de repas déclarés pour la mission : {totalMeals}€.</p>}
      {totalMeals === '0,00' && <p>Pas de frais d'hébergement à rembourser.</p>}
      <p>Rappel des frais déclarés : </p>
      <div className='form__section-field' style={{margin: '0.5rem'}}>
        <p>Montant des repas pris dans un restaurant administratif ou assimilé : {adminMealsAmount}€ pour {accomodations.meals_in_admin_restaurants} repas.</p>
        {mission.region === "métropole" && <p>Montant des repas à titre onéreux en France : {frenchMeals}€ pour {accomodations.meals_paid_by_agent_in_france} repas.</p>}
        {mission.region !== "métropole" && <p>Montant des repas à titre onéreux à l'étranger : {overseasMeals}€ pour {accomodations.meals_paid_by_agent_overseas} repas.</p>}
      </div>
    </div>
    <div className="form__section" style={{marginBottom: '1rem'}}>
      <FormSectionTitle>Autres frais de Mission</FormSectionTitle>

      <p>Visa</p>
      {accomodations.event && <p>Montant des frais d'inscription à un colloque, réunion, séminaire scientifique : {accomodations.event}€.</p>}
      {accomodations.event && <p>Compte rendu à adresser obligatoirement au service de la recherche.</p>}
    </div>
    <div className="form__section" style={{marginBottom: '1rem'}}>
      <FormSectionTitle>Total</FormSectionTitle>
      <p>Total des frais déclarés pour la mission : {totalMission}€.</p>
      <p>Attention : le montant remboursé peut être différent selon les plafonds de remboursement.</p>
    </div>
    
    {apiMessage.response && <ApiResponse apiResponse={apiMessage} updateForm={true} />}
      <div className="form__section">
        <div className="form__section-field-buttons" style={{display: 'flex', justifyContent: 'center'}}>
          <BlobProvider document={<EfPDF agentSignature={userSignature} data={currentEf} agent={agent} />}>
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
        <Link to={"/utilisateur/" + user + "/mes-ordres-de-mission"} style={{display: 'block', marginBottom: '2rem', textAlign: 'center'}}>Retour au menu des Ordres de Mission</Link>
      </div>
  </div>
);}

Recap.propTypes = {

};

export default Recap;
