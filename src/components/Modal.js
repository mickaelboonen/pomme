import React from 'react';
import PropTypes from 'prop-types';
import FormSectionTitle from 'src/components/FormSectionTitle';
import SwitchButton from 'src/components/SwitchButton';
import { useForm } from "react-hook-form";


import './modalStyle.scss';

const Modal = (props) => {

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState:
    { errors },
  } = useForm({ 
    defaultValues: {
      duration: true,
      withExpenses: true,
    }
  });

  const close = () => {
  console.log("close");
}

  const onSubmit = (data) => {
    // If the user is requesting an advance
    console.log(data);
  }

  return (
    <div className='modal'>
        <h1>Adding a new Person</h1>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form__section">
            <FormSectionTitle>Avance</FormSectionTitle>
            <div className="form__section-field">
              <SwitchButton
                register={register}
                isInForm
                formField='duration'
                label="Ponctuel :"
              />
              <SwitchButton
                register={register}
                isInForm
                formField='withExpenses'
                label="Avec Frais :"
              />
            </div>
          </div>
          <div id="buttons">
              <button type="submit">OK</button>
              <button type="button" onClick={close}>Cancel</button>
          </div>
        </form>
    </div>
);}

Modal.propTypes = {

};

export default Modal;
