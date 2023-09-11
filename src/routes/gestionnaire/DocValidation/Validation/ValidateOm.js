import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Components
import FileField from 'src/components/Fields/FileField';
import TextField from 'src/components/Fields/TextField';
import SelectField from 'src/components/Fields/SelectField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import CheckboxInput from 'src/components/Fields/CheckboxInput';
import ButtonElement from 'src/components/Fields/ButtonElement';



import { BlobProvider, PDFViewer } from '@react-pdf/renderer';
import ValidationMonitoringPdf from 'src/components/PDF/ValidationMonitoringPdf';

// import './style.scss';

// Actions
import { displayValidationActors } from 'src/reducer/omManager';

const ValidateOm = ({
  uprOrDep,
  register,
  errors,
  setValue,
  watch,
  omType,
  circuits,
  om,
  submitFunction,
  agent,
  validationActorsToDisplay
}) => {
  const dispatch = useDispatch();

  const handleChannelChange = (event) => {    
    const selectedChannel = circuits.find((cir) => cir.id === Number(event.target.value));
    
    if (selectedChannel !== undefined) {
      dispatch(displayValidationActors(selectedChannel));
    }
  }
  
  const selectedActors = watch('workflow');
  const [showUprOrDep, setShowUprOrDep] = useState(false);

  useEffect(() => {
    if (selectedActors && (selectedActors.indexOf('directeur.rice upr') >= 0 || selectedActors.indexOf('directeur.rice dep') >= 0)) {
      setShowUprOrDep(true);
    }
    else {
      setShowUprOrDep(false);
    }
  }, [selectedActors]);
  
  let firstPartActors = [];
  let secondPartActors = [];

  

  if (uprOrDep.length > 0) {
    if (uprOrDep[0].role.includes('Directeur.rice UPR')) {
      firstPartActors = validationActorsToDisplay.slice(0,2);
      secondPartActors = validationActorsToDisplay.slice(2);
    }
    else {
      firstPartActors = validationActorsToDisplay.slice(0,1);
      secondPartActors = validationActorsToDisplay.slice(1);
    }
  }
  else {
    firstPartActors = validationActorsToDisplay;
  }
  
  useEffect(() => {
    const selectedChannel = circuits.find((cir) => cir.shortName === omType[0]);

    if (selectedChannel !== undefined) {
      dispatch(displayValidationActors(selectedChannel));
    }
  }, [])
  
  // const [isPdfVisible, setIsPdfVisible] = useState(false)

  // const toggleViewer = (event) => {

  //   if (event.target.id.includes('closer')) {
  //     setIsPdfVisible(false);
  //   }
  //   else {
  //     setIsPdfVisible(true);
  //   }
  // }
  return (
  <>
    <div className="form__section">
      <FormSectionTitle>Imputations budgétaires</FormSectionTitle>
      <div className='form__section form__section--documents'>
        <div className='form__section-half'>
          <TextField
              id="percent-field"
              formField="percent"
              label="%"
              register={register}
            /> 
          </div>
          <div className='form__section-half'>
            <TextField
              id="ub-field"
              formField="ub"
              label="UB"
              register={register}
            />
          </div>
      </div>
      <div className='form__section form__section--documents'>
        <div className='form__section-half'>
          <TextField
            id="rc-field"
            formField="cr"
            label="CR"
            register={register}
          /> 
        </div>
        <div className='form__section-half'>
          <TextField
            id="nacres-field"
            formField="codeNacres"
            label="Code Nacres"
            register={register}
          />
        </div>
        
      </div>
      <div className='form__section form__section--documents'>
        <div className='form__section-half'>
          <TextField
            id="lolf-field"
            formField="codeLolf"
            label="Code LOLF"
            register={register}
          /> 
        </div>
        <div className='form__section-half'>
          <TextField
            id="analytic-field"
            formField="codeAnalytique"
            label="Code analytique"
            register={register}
          />
        </div>
        
      </div>
    </div>
    <div className="form__section">
      <FormSectionTitle>Rajouter des documents</FormSectionTitle>
      <FileField
        setValue={setValue}
        multiple
        id="files-field"
        formField="files"
        register={register}
        error={errors.files}
      
      />
    </div>
    <div className="form__section">
      <FormSectionTitle>Circuit de validation</FormSectionTitle>
      <SelectField
        register={register}
        blankValue="Veuillez sélectionner un circuit de validation"
        data={circuits}
        id="channel-field"
        formField="channel"
        handler={handleChannelChange}
        label="Circuit"
        error={errors.channel}
        required="Veuillez sélectionner un circuit de validation."
      />
      <div className="form__section-field">
        <p className="form__section-field-label">Acteurs de la validation</p>
        {firstPartActors.map((actor) => (
          <CheckboxInput key={actor.id} id={actor.cptLogin} formField="workflow" label={actor.role} register={register} />
        ))}
        {showUprOrDep && (
          <div style={{margin: '0.5rem 1rem'}}>
            {uprOrDep.map((actor) => (
              <CheckboxInput key={actor.id} id={actor.cptLogin} formField="workflow" label={actor.role} register={register} />
            ))}
          </div>
        )}
        {secondPartActors.map((actor) => (
          <CheckboxInput key={actor.id} id={actor.cptLogin} formField="workflow" label={actor.role} register={register} />
        ))}
        {errors.workflow && <p className="form__section-field-error form__section-field-error--open">{errors.workflow.message}</p>}

      </div>
    </div>
    <div className="form__section-field">
      <BlobProvider document={<ValidationMonitoringPdf om={om} agent={agent} isGest={true} gestData={watch()} />}>
        {({ blob }) => {          
          const file = new File([blob], "blol", {type: 'pdf'});
          
          return (
            <>
              <button style={{margin: 'auto'}}type="button" onClick={() => { const data = watch(); data.file = file; submitFunction(data)}}>
                Valider la demande
              </button>
              {/* <button type="button" id="viewer-opener" onClick={toggleViewer} style={{marginLeft: '1rem'}}>
                Visualiser <br /> le document
              </button> */}
            </>
          );
        }}
      </BlobProvider>
    </div>
    {/* {isPdfVisible && (
      <div className="pdf-viewer">
        <div className="pdf-viewer__nav">
          <p className="pdf-viewer__nav-close" id="viewer-closer" onClick={toggleViewer}>Fermer la fenêtre</p>
        </div>
        <PDFViewer className='form__section-recap'>
          <ValidationMonitoringPdf om={om} agent={agent} isGest={true} gestData={watch('comments')}/>
        </PDFViewer>
      </div>
    )} */}
  </>
)};

ValidateOm.propTypes = {

};

export default ValidateOm;
