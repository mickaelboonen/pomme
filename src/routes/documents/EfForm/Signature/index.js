import React from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';

import '../style.scss';
import Buttons from 'src/components/Fields/Buttons';
import FileField from 'src/components/Fields/FileField';
import HiddenField from 'src/components/Fields/HiddenField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import ApiResponse from 'src/components/ApiResponse';
import CheckboxInput from 'src/components/Fields/CheckboxInput';

import { uploadFile } from 'src/reducer/omForm';
import { updateEfSignature } from 'src/reducer/ef';
import { getSavedFileName } from 'src/selectors/formDataGetters';

const Signature = ({ step }) => {
  const dispatch = useDispatch();
  const loader = useLoaderData();
  const efId = loader.searchParams.get('id');

  const { app: {agentDocuments, apiMessage},
    agent: {userSignature},
    ef: { currentEf }
  } = useSelector((state) => state);
  
  const { register, handleSubmit, watch, setError, setValue, formState: { errors } } = useForm({
    defaultValues: {
      savedSignature: userSignature.length > 1 ? true : false,
      savedRib: agentDocuments.rib.length > 1 ? true : false,
    }
  });

  const ribFilename = currentEf.signature.agent_rib ? getSavedFileName(currentEf.signature.agent_rib) : '';
  const signatureFilemane = currentEf.signature.agent_signature ? getSavedFileName(currentEf.signature.agent_signature) : '';


  const onSubmit = (data) => {
    let errorCount = 0;

    if (data.savedRib) {
      data.agentRib = agentDocuments.rib;
    }
    else if (data.agentRib.length === 0) {
      setError('rib', {type: 'custom', message:"Veuillez fournir un RIB pour pouvoir être remboursé."})
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

  const savedSignature = watch('savedSignature');
  const savedRib = watch('savedRib');

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__section">
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
            error={errors.agentSignature}
            setValue={setValue}
            fileName={signatureFilemane}
            // required="Veuillez signer la demande de remboursement."
          />
        )}
      </div>
      <div className="form__section">
        <FormSectionTitle>RIB</FormSectionTitle>
        <div className="form__section-field">
          <CheckboxInput
            register={register}
            formField="savedRib"
            id="saved-rib-field"
            label="Utiliser le RIB enregistré dans mon profil"
          />
        </div>
        {!savedRib && (
          <FileField 
            register={register}
            formField="agentRib"
            id="rib-field"
            error={errors.rib}
            setValue={setValue}
            fileName={ribFilename}
            // required="Veuillez fournir un RIB pour pouvoir être remboursé."
          />
        )}
      </div>
      <HiddenField id="docId" value={efId} register={register} />
      {/* {apiMessage.response && <ApiResponse apiResponse={apiMessage} updateForm={true} />} */}
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

Signature.propTypes = {

};

export default Signature;
