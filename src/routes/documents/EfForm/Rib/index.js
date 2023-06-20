import React from 'react';
import { useForm } from "react-hook-form";
import { useLoaderData } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import '../style.scss';
import Buttons from 'src/components/Fields/Buttons';
import FileField from 'src/components/Fields/FileField';
import StatusChecker from 'src/components/StatusChecker';
import HiddenField from 'src/components/Fields/HiddenField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import CheckboxInput from 'src/components/Fields/CheckboxInput';

import { uploadFile } from 'src/reducer/omForm';
import { updateEfSignature } from 'src/reducer/ef';
import { getSavedFileName } from 'src/selectors/formDataGetters';

const Rib = ({ step }) => {
  const dispatch = useDispatch();
  const loader = useLoaderData();
  const efId = loader.searchParams.get('id');

  const { app: { agentDocuments },
    agent: { userSignature },
    ef: { currentEf }
  } = useSelector((state) => state);
  
  const { register, clearErrors, handleSubmit, watch, setError, setValue, formState: { errors } } = useForm({
    defaultValues: {
      savedSignature: userSignature && userSignature.length > 1 ? true : false,
      savedRib: agentDocuments.hasOwnProperty('rib') && agentDocuments.rib.length > 1 ? true : false,
    }
  });

  const ribFilename = currentEf.signature.agent_rib ? getSavedFileName(currentEf.signature.agent_rib) : '';
  const signatureFilemane = currentEf.signature.agent_signature ? getSavedFileName(currentEf.signature.agent_signature) : '';


  const onSubmit = (data) => {
    
    let errorCount = 0;
    
    if (data.savedRib) {
      if (agentDocuments.rib === undefined) {
        setError('agentRib', {type: 'custom', message:"Vous n'avez pas de RIB enregistré dans votre profil."})
        setValue('savedRib', false);
        errorCount++;
      }
      else {
        data.agentRib = agentDocuments.rib;
      }
    }
    else if (data.agentRib.length === 0) {
      setError('agentRib', {type: 'custom', message:"Veuillez fournir un RIB pour pouvoir être remboursé."})
      errorCount++;
    }
    
    if (data.savedSignature) {
      data.agentSignature = userSignature;
    }
    else if (data.agentSignature.length === 0) {
      setError('agentSignature', {type: 'custom', message:"Veuillez signer la demande de remboursement."});
      errorCount++;
    }

    if (errorCount > 0) {
      return;
    }
    
    data.status = 1;
    delete data.savedRib;
    delete data.savedSignature;

    if (data.agentSignature instanceof File || data.agentRib instanceof File) {
      dispatch(uploadFile({data: data, step: 'signature', docType: 'ef'}));
    }
    else {
      dispatch(updateEfSignature(data))
    }
  };

  const [savedSignature, savedRib] = watch(['savedSignature', 'savedRib']);

  const handleRibCheckbox = () => {
    clearErrors('agentRib');
  }
  
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <StatusChecker status={currentEf.signature.status} />
      {/* <div className="form__section">
        <FormSectionTitle>Signature</FormSectionTitle>
        <div className="form__section-field">
          <CheckboxInput
            register={register}
            formField="savedSignature"
            id="saved-signature-field"
            label="Utiliser la signature enregistrée dans mon profil"
          />
        </div>
        {!savedSignature && (
          <FileField 
            register={register}
            formField="agentSignature"
            id="agentSignature"
            accept="image/*"
            label="Signature de l'agent (au format .jpg, .jpeg ou .png)"
            error={errors.agentSignature}
            setValue={setValue}
            fileName={signatureFilemane}
          />
        )}
      </div> */}
      <div className="form__section">
        <FormSectionTitle>RIB</FormSectionTitle>
        <div className="form__section-field">
          <CheckboxInput
            register={register}
            formField="savedRib"
            handler={handleRibCheckbox}
            id="saved-rib-field"
            label="Utiliser le RIB enregistré dans mon profil"
          />
        </div>
        {!savedRib && (
          <FileField 
            register={register}
            formField="agentRib"
            id="rib-field"
            error={errors.agentRib}
            setValue={setValue}
            fileName={ribFilename}
          />
        )}
      </div>
      <HiddenField id="docId" value={efId} register={register} />
      <Buttons
        step={step}
        id={efId}
        url={loader}
        watch={watch}
        type="ef"
        update={updateEfSignature}
      />
    </form>
    
  );
};

Rib.propTypes = {

};

export default Rib;
