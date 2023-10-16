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
import { updateEfRib } from 'src/reducer/ef';
import { getSavedFileName } from 'src/selectors/formDataGetters';

const Rib = ({ step }) => {
  const dispatch = useDispatch();
  const loader = useLoaderData();
  const efId = loader.searchParams.get('id');

  const { app: { agentDocuments },
    ef: { currentEf }
  } = useSelector((state) => state);
  
  const { register, clearErrors, handleSubmit, watch, setError, setValue, formState: { errors } } = useForm({
    defaultValues: {
      savedRib: agentDocuments.hasOwnProperty('rib') && agentDocuments.rib.length > 1 ? true : false,
    }
  });

  const ribFilename = currentEf.rib.agent_rib ? getSavedFileName(currentEf.rib.agent_rib) : '';


  const onSubmit = (data) => {
    
    let errorCount = 0;
    console.log(data);
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

    if (errorCount > 0) {
      return;
    }
    
    data.status = 1;
    delete data.savedRib;
    delete data.savedSignature;

    if (data.agentRib instanceof File) {
      dispatch(uploadFile({data: data, step: 'signature', docType: 'ef'}));
    }
    else {
      dispatch(updateEfRib(data))
    }
  };

  const savedRib = watch('savedRib');

  const handleRibCheckbox = () => {
    clearErrors('agentRib');
  }
  
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <StatusChecker status={currentEf.rib.status} />
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
        update={updateEfRib}
      />
    </form>
    
  );
};

Rib.propTypes = {

};

export default Rib;
