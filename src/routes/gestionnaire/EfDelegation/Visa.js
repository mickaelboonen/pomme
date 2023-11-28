import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { BlobProvider, Document, PDFViewer } from '@react-pdf/renderer';
import { floatAddition, floatMultiplication, OTHER_MEALS_AMOUNT, ADMIN_MEALS_AMOUNT} from 'src/selectors/mathFunctions';

import '../style.scss';

// Components
import Amounts from './Amounts';
import EfPdf from 'src/components/PDF/EfPdf';
import Magnifier from 'src/components/Visas/Magnifier';
import FileField from 'src/components/Fields/FileField';
import VisaComponent from 'src/components/VisaComponent';
import RadioInput from 'src/components/Fields/RadioInput';
import HiddenField from 'src/components/Fields/HiddenField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import CheckboxInput from 'src/components/Fields/CheckboxInput';
import TextareaField from 'src/components/Fields/TextareaField';
import ButtonElement from 'src/components/Fields/ButtonElement';

// Actions
import {  addEfMonitoringPdf,addOmMonitoringPdf } from 'src/reducer/omManager';


const Visa = ({ data, user, gest, isOm, ef}) => {

  const dispatch = useDispatch();
  const { app: { countries },
    vehicle: { vehicleTypes },
    tmp: { tmpAgent, agentProfessionalAddress, agentPersonalAddress, loader, signature, acSignature}
  } = useSelector((state) => state);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    clearErrors,
    setError,
    formState:
    { errors },
  } = useForm({
    defaultValues: {
      savedSignature: (signature && signature.hasOwnProperty('link')) ? true : false
    }
  });

const currentActor = ef.management.workflow.find((actor) => actor.agent === user);
const needsSignature = ef.management.workflow.indexOf(currentActor) === ef.management.workflow.length - 2;
//---------------------------------------------------------------------------

  // console.log("needs signatuer = ", needsSignature);
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

  // console.log(data);
  let dataForThePdf = { ...data };


  // console.log(agentFullData);
  //---------------------------------------------------------------------------
  const submitFunction = (data) => {

    if (data.savedSignature) {
      if (signature === "") {
        setError('signature', { type: 'custom', message: 'Aucune signature enregistrée dans le profil.'})
        setValue('savedSignature', false)
        return;
      }
      delete data.savedSignature;
      data.signature = signature;
    }

    if (isOm) {
      dispatch(addOmMonitoringPdf({data: data, task: 'replace', nextAction: data.action === 'validate' ? 'stampOm' : 'rejectVisaOm'}));
    }
    else {
      dispatch(addEfMonitoringPdf({data: data, task: 'replace', nextAction: data.action === 'validate' ? 'stampEf' : 'rejectVisaEf'}));
    }

    
  };
  let signatureFilename = signature !== null ? signature.name : '';

  const [viewer, setViewer] = useState('');
  const isFileTooLong = data.file.length > 2000000 ? true : false;

  const handleClick = () => {
    viewer === '' ? setViewer(data.file) : setViewer('');
  }
  const savedSignature = watch('savedSignature');
  
  
  const [isPdfVisible, setIsPdfVisible] = useState(false)

  const toggleViewer = (event) => {
    
    if (event.target.id.includes('closer')) {
      setIsPdfVisible(false);
    }
    else {
      setIsPdfVisible(true);
    }
  }
  
  const handleSignatureCheckbox = () => {
    clearErrors('signature');
  }

  if (!dataForThePdf.mission.modifications) {
    dataForThePdf.mission = dataForThePdf.om.mission;
  }
  const { accomodations, transports, mission } = dataForThePdf;
  // let { mission } = dataForThePdf;
  const missionCountry = countries.find((country) => country.code === Number(mission.country));

  let transportsFields = Object.entries(transports).filter((transport) => !transport[0].includes('_files') && transport[1]);
  transportsFields = transportsFields.filter((transport) => transport[0] !== 'id' && transport[0] !== 'status');

  const adminMealsAmount = floatMultiplication(accomodations.meals_in_admin_restaurants, ADMIN_MEALS_AMOUNT);
  const frenchMeals = floatMultiplication(accomodations.meals_paid_by_agent_in_france, OTHER_MEALS_AMOUNT);
  
  const mealsExpenses = {
    admin : adminMealsAmount,
    french: frenchMeals,
  };
  console.log(gest);
  const [isFormMagnified, setIsFormMagnified] = useState(false);
  const handleClickOnGlass = () =>  {
    setIsFormMagnified(!isFormMagnified);
  }


  return (
    <form className={classNames('form', {'form--magnified': isFormMagnified})}>
      <Magnifier isFormMagnified={isFormMagnified} handleClickOnGlass={handleClickOnGlass} />
      <FormSectionTitle>Viser le document</FormSectionTitle>
      <div className="form__section">
        <VisaComponent
          data={data}
          user={user}
          watch={watch}
          gest={gest}
          isOm={isOm}
        />

        <TextareaField 
          id="comments-field"
          label="Commentaires"
          formField="comments"
          register={register}
        />
        <HiddenField id="docId" value={data.id} register={register} />
        <HiddenField id="actor" value={user} register={register} />
      </div>
      {needsSignature && (
        <div className="form__section">
        <FormSectionTitle>SIGNATURE</FormSectionTitle>
        <div className="form__section-field">
          <CheckboxInput
            register={register}
            formField="savedSignature"
            handler={handleSignatureCheckbox}
            id="saved-signature-field"
            label="Utiliser la signature enregistrée dans mon profil"
          />
        </div>

        {!savedSignature && (
          <FileField 
            register={register}
            formField="signature"
            id="signature-field"
            label="Signature"
            error={errors.signature}
            setValue={setValue}
            fileName={signatureFilename}
          />
        )}
        </div>
      )}
      {gest.position === 'DGS' && <Amounts ef={ef} />}
      
      <div className="form__section">
        <FormSectionTitle>DÉCISION FINALE</FormSectionTitle>
        <div className="form__section-field">
          <label className="form__section-field-label" htmlFor="action">Valider de l'état de frais</label>
          <RadioInput
            id="validate"
            formField="action"
            label="Oui"
            register={register}
            required="Veuillez valider ou non l'état de frais."
          />
          <RadioInput
            id="reject"
            formField="action"
            label="Non"
            register={register}
            required="Veuillez valider ou non l'état de frais."
          />
          {errors.action && <p className="form__section-field-error form__section-field-error--open">{errors.action.message}</p>}
        </div>

      </div>

      <div className='form__section'>
        <div className="form__section-field-buttons" style={{textAlign: 'center'}}>
          {!loader &&(
            <BlobProvider document={
              <Document>
                <EfPdf
                  om={dataForThePdf.om}
                  data={dataForThePdf}
                  agent={agentFullData}
                  meals={mealsExpenses}
                  country={missionCountry}
                  gest={gest}
                  signature={needsSignature ? signature.link : ''}
                />
              </Document>
            }>
              {({ blob }) => (
                <>
                  <button type="button" onClick={() => { const data = watch(); data.file = new File([blob], data.name, {type: 'pdf'}); submitFunction(data);}}>
                    Valider le document
                  </button>
                  {/* {gest.roles.indexOf('MANAGER') && (
                    <button type="button" id="viewer-opener" onClick={toggleViewer} style={{marginLeft: '1rem'}}>
                      VOIR
                    </button>
                  )} */}
                </>
              )}
            </BlobProvider>
          )}
        </div>
      </div>
      <div className="form__section">
        <div className='form__section-field-buttons form__section-field-buttons--solo'>
          <ButtonElement
            // type="button"
            isLink
            link={"/gestionnaire/" + encodeURIComponent(isOm ? 'ordres-de-mission-à-signer' : 'états-de-frais-à-signer')}
            label="Retour"
          />
        </div>
      </div>
      {isPdfVisible && (
        <div className="pdf-viewer">
          <div className="pdf-viewer__nav">
            <p className="pdf-viewer__nav-close" id="viewer-closer" onClick={toggleViewer}>Fermer la fenêtre</p>
          </div>
          <PDFViewer>
            <Document>
              <EfPdf
                om={dataForThePdf.om}
                data={dataForThePdf}
                agent={agentFullData}
                meals={mealsExpenses}
                country={missionCountry}
                gest={gest}
                signature={needsSignature ? signature.link : ''}
              />
            </Document>
          </PDFViewer>
        </div>
      )}
    </form>    
  );
};

Visa.propTypes = {
};

export default Visa;
