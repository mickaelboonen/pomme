import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

// Components
import OneFileForm from 'src/components/OneFileForm';
import FormSectionTitle from 'src/components/FormSectionTitle';
import Decision from 'src/components/Visas/Decision';
import Signature from 'src/components/Visas/Signature';
import VisaViewer from 'src/components/Visas/VisaViewer';
import VisaHiddenFields from 'src/components/Visas/VisaHiddenFields';
import PdfProvider from 'src/components/Visas/PdfProvider';
import PdfViewer from 'src/components/Visas/PdfViewer';
import ReturnLink from 'src/components/Visas/ReturnLink';
import InputValueDisplayer from 'src/routes/gestionnaire/DocValidation/InputValueDisplayer';

// Actions
import { addOmMonitoringPdf } from 'src/reducer/omManager';

const AdvanceVisa = ({ data, user, gest, om}) => {

  const dispatch = useDispatch();

  const { docs: { isModalOpen },
    tmp: { tmpAgent, agentProfessionalAddress, agentPersonalAddress, signature}
  } = useSelector((state) => state);

  const {
    register,
    watch,
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

  const agentFullData = {
    ...tmpAgent,
    ...agentProfessionalAddress,
    ...agentPersonalAddress
  };


  const submitFunction = (data) => {

    // if (data.savedSignature) {
      if (signature === "") {
        setError('signature', { type: 'custom', message: 'Aucune signature enregistrée dans le profil.'})
        setValue('savedSignature', false)
        return;
      }
      delete data.savedSignature;
      data.signature = signature;
    // }
    // else {
    //   if (!data.signature instanceof File) {
    //     setError('signature', { type: 'custom', message: "Veuillez fournir une signature."})
    //     return;
    //   }
    // }

    dispatch(addOmMonitoringPdf({data: data, task: 'replace', nextAction: data.action === 'validate' ? 'stampOm' : 'rejectAcAdvance'}));

    
  };



  
  
  const [isPdfVisible, setIsPdfVisible] = useState(false)

  const toggleViewer = (event) => {
    
    if (event.target.id.includes('closer')) {
      setIsPdfVisible(false);
    }
    else {
      setIsPdfVisible(true);
    }
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

  const { advance } = om;
  return (
    <>
      <form className='form'>
        <VisaViewer
          data={data}
          user={user}
          watch={watch}
          gest={gest}
          register={register}
        />        
        <FormSectionTitle>Avance à verser</FormSectionTitle>
        <div className='form__section form__section--documents'>
          <div className='form__section-half'>
            <InputValueDisplayer
              label="Montant de l'avance accordée"
              value={advance.advance_amount.toString() + ' euros.'}
            />
          </div>
          <div className='form__section-half'>
            <InputValueDisplayer
              label="Montant total estimé de la mission"
              value={advance.total_amount.toString() + ' euros.'}
            />
          </div>
        </div>
        <div className='form__section form__section--documents'>
          <div className='form__section-half'>
            <InputValueDisplayer
              label="Nombre de nuits"
              value={advance.nights_number.toString()}
            />
          </div>
          <div className='form__section-half'>
            <InputValueDisplayer
              label="Nombre de repas"
              value={advance.meals_number.toString()}
            />
          </div>
        </div>
        <div className='form__section form__section--documents'>
          <div className='form__section-half'>
            <InputValueDisplayer
              label="Montants des autres frais"
              value={advance.other_expenses_amount.toString()}
            />
          </div>
          <div className='form__section-half'>
            <InputValueDisplayer
              label="Justification des autres frais"
              value={advance.other_expenses_justification}
            />
          </div>
        </div>
        {/* Returns the two hidden fields for id and cptLogin */}
        <VisaHiddenFields id={data.id} user={user} register={register} />
        {/* Handles the signature part */}
        <Signature
          register={register}
          signature={signature}
          user={user}
          clearErrors={clearErrors}
          watch={watch}
        />
        {/* Returns the validation fields */}
        <Decision
          register={register}
          errors={errors}
        />
        {/* Returns the buttons to see and validate the document */}
        <PdfProvider
          data={data}
          submitFunction={submitFunction}
          watch={watch}
          om={om}
          toggleViewer={toggleViewer}
          agentFullData={agentFullData}
        />
        <ReturnLink
          link="/dafc/demandes-d-avance"
        />
        {isPdfVisible && (
          <PdfViewer
            data={data}
            watch={watch}
            om={om}
            toggleViewer={toggleViewer}
            agentFullData={agentFullData}
          />
        )}
      </form>
      <div className={classNames("modal__background", {"modal__background--open": isModalOpen})} />
      {isModalOpen && <OneFileForm onUserPage={false} />}
    </>
  );
};

AdvanceVisa.propTypes = {
};

export default AdvanceVisa;
