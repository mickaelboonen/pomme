import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import AddButton from '../../../assets/images/add.svg';

import './style.scss';
import FormSectionTitle from 'src/components/FormSectionTitle';
import RefusalMessage from 'src/components/Fields/RefusalMessage';
import Buttons from 'src/components/Fields/Buttons';
import Step from './Step';

const Steps = ({ step }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState:
    { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const nextStep = step + 1;
    // navigate('/nouveau-document/état-de-frais?etape=' + nextStep + '&id=' + omId)
  };

  let refusal = "Vous avez fait des erreurs au niveau de l'hébergement et des transports. Merci de corriger.";
  refusal = "";

  const [stepNumber, setStepNumber] = useState(1);
  const [steps, setSteps] = useState([<Step register={register} /> ]);

  const addNewStep = () => {
    const arr = steps;
    arr.push(<Step register={register} />)
    setSteps(arr);
    setStepNumber(stepNumber + 1);
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__section">
        <FormSectionTitle>Étapes</FormSectionTitle>
        {steps.map((currentStep) => <Step register={register} stepNumber={stepNumber} />)}
        {/* <Step register={register} /> */}


      </div>
      <div>
        <img src={AddButton} alt="" onClick={addNewStep}/>
      </div>
      {refusal !== '' && <RefusalMessage message={refusal} />}
      <Buttons step={step} />
    </form>
    
  );
};

Steps.propTypes = {

};

export default Steps;
