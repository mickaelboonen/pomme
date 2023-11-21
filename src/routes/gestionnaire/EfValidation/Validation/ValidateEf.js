import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import FileField from 'src/components/Fields/FileField';
import TextField from 'src/components/Fields/TextField';
import SelectField from 'src/components/Fields/SelectField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import CheckboxInput from 'src/components/Fields/CheckboxInput';
import ButtonElement from 'src/components/Fields/ButtonElement';


import { floatAddition, floatMultiplication, OTHER_MEALS_AMOUNT, ADMIN_MEALS_AMOUNT} from 'src/selectors/mathFunctions';

import { BlobProvider, PDFViewer, Document } from '@react-pdf/renderer';
import EfPdf from 'src/components/PDF/EfPdf';

// import './style.scss';

// Actions
import { displayValidationActors } from 'src/reducer/omManager';
import { selectActorsToDisplay, divideActors } from 'src/selectors/gestFunctions';

const ValidateEf = ({
  register,
  errors,
  watch,
  efType,
  circuits,
  ef,
  submitFunction,
  omId
}) => {
  const dispatch = useDispatch();
  const {
    omManager: { uprOrDep, pendingDocs, validationActorsToDisplay },
    agent: { agent, oms },
    app: { countries },
    tmp: { tmpAgent, agentProfessionalAddress, agentPersonalAddress }
  } = useSelector((state) => state)

  const agentFullData = {
    ...tmpAgent,
    ...agentProfessionalAddress,
    ...agentPersonalAddress
  };


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
  

  const actorsToDisplay = selectActorsToDisplay(validationActorsToDisplay, ef.type);
  const [firstPartActors, secondPartActors] = divideActors(actorsToDisplay, uprOrDep, false);

  useEffect(() => {
    const selectedChannel = circuits.find((cir) => cir.shortName === efType[0]);

    if (selectedChannel !== undefined) {
      dispatch(displayValidationActors(selectedChannel));
    }
  }, [])


  
  const [isPdfVisible, setIsPdfVisible] = useState(false)
// 
  const toggleViewer = (event) => {
// 
    if (event.target.id.includes('closer')) {
      setIsPdfVisible(false);
    }
    else {
      setIsPdfVisible(true);
    }
  }
  const { mission, transports, accomodations, stages } = ef;

  let transportsFields = Object.entries(transports).filter((transport) => (!transport[0].includes('_files') && transport[0] !== 'km' && transport[0] !== 'horsepower' ) && transport[1]);
  transportsFields = transportsFields.filter((transport) => transport[0] !== 'id' && transport[0] !== 'status');

  const transportsAmountsArray = transportsFields.map((t) => t[1]);
  const totalTransportsExpenses = floatAddition(transportsAmountsArray);




  const missionCountry = countries.find((country) => country.code === Number(mission.country));
  const adminMealsAmount = floatMultiplication(accomodations.meals_in_admin_restaurants, ADMIN_MEALS_AMOUNT);
  const frenchMeals = floatMultiplication(accomodations.meals_paid_by_agent_in_france, OTHER_MEALS_AMOUNT);

  const totalMeals = floatAddition([adminMealsAmount, frenchMeals]);
  
  const totalMission = floatAddition([totalMeals, accomodations.event, totalTransportsExpenses, accomodations.hotel])

  const mealsExpenses = {
    admin : adminMealsAmount,
    french: frenchMeals,
  };

  let dataForThePdf = { ...ef };

  // const fullAgentData = {
    // ...agent,
    // ...agentProfessionalAddress,
    // ...agentPersonalAddress,
  // }

  return (
  <>
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
          <CheckboxInput
            key={actor.id}
            id={actor.cptLogin}
            formField="workflow"
            label={actor.role}
            register={register}
          />
        ))}
        {showUprOrDep && (
          <div style={{margin: '0.5rem 1rem'}}>
            {uprOrDep.map((actor) => (
              <CheckboxInput key={actor.id} id={actor.cptLogin} formField="workflow" label={actor.role} register={register} />
            ))}
          </div>
        )}
        {secondPartActors.map((actor) => (
          <CheckboxInput
            key={actor.id}
            id={actor.cptLogin}
            formField="workflow"
            label={actor.role}
            register={register}
          />
        ))}
        {errors.workflow && <p className="form__section-field-error form__section-field-error--open">{errors.workflow.message}</p>}

      </div>
    </div>
    <div className="form__section-field-buttons">
      <BlobProvider document={
        <Document>
          <EfPdf
            om={oms.find((om) => om.id == omId)}
            data={dataForThePdf}
            agent={agentFullData}
            meals={mealsExpenses}
            country={missionCountry}
          />
        </Document>
      }>
        {({ blob }) => {          
          const file = new File([blob], "monitoring-ef-" + ef.id, {type: 'pdf'});
          
          return (
            <div className="form__section-field-buttons__row">
              <button style={{margin: 'auto'}}type="button" onClick={() => { const data = watch(); data.file = file; submitFunction(data)}}>
                Valider la demande
              </button>
              {/* <button type="button" id="viewer-opener" onClick={toggleViewer} style={{marginLeft: '1rem'}}> */}
                {/* Visualiser <br /> le document */}
              {/* </button> */}
            </div>
          );
        }}
      </BlobProvider>
    </div>
    {isPdfVisible && (
      <div className="pdf-viewer">
        <div className="pdf-viewer__nav">
          <p className="pdf-viewer__nav-close" id="viewer-closer" onClick={toggleViewer}>Fermer la fenêtre</p>
        </div>
        <PDFViewer className='form__section-recap'>
          <Document>
            <EfPdf
              om={oms.find((om) => om.id == omId)}
              data={dataForThePdf}
              agent={agentFullData}
              meals={mealsExpenses}
              country={missionCountry}
            />
          </Document>
        </PDFViewer>
      </div>
    )}
  </>
)};

ValidateEf.propTypes = {

};

export default ValidateEf;
