import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';

import './modalStyle.scss';

// Components 
import SwitchButton from 'src/components/SwitchButton';
import FormSectionTitle from 'src/components/FormSectionTitle';
import ButtonElement from 'src/components/Fields/ButtonElement';

// Actions
import { toggleModal } from '../reducer/app';
import { addNewOM } from 'src/reducer/omForm';

const Modal = ({ target, user }) => {

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
  } = useForm({ 
    defaultValues: {
      duration: true,
      withExpenses: true,
    }
  });

  const close = () => {
    dispatch(toggleModal());
  }

  const onSubmit = (data) => {
    // If the user is requesting an advance
    console.log(data, '-----------------------', target);

    if (target === 'ordre de mission') {
      const newOM = {
        name: `OM_${user}_`,
        status: 1,
        url: 'path',
        missioner: user,
        comments: '',
        expenses: data.withExpenses,
        isPonctual: data.duration,
      }
      
      dispatch(addNewOM(newOM)); 
    }
    else if (target === 'état de frais') {
      const newEF = {
        name: `EF_${user}_`,
        status: 1,
        url: 'path',
        missioner: user,
        comments: '',
      }
      
      // dispatch(addNewEF(newEF)); 
    }
  }

  return (
    <div className='modal'>
        <form className="modal__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form__section">
            <FormSectionTitle>Créer un nouvel {target} ?</FormSectionTitle>
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
          <div className="form__section-field-buttons" id="modal-button">
            <ButtonElement
              type="submit"
              label="Valider"
              />
            <ButtonElement
              type="button"
              label="Annuler"
              handler={close}
            />
          </div>
        </form>
    </div>
);}

Modal.propTypes = {

};

export default Modal;
