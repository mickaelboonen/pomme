import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';

import './modalStyle.scss';

// Components 
import SwitchButton from 'src/components/SwitchButton';
import SelectField from 'src/components/Fields/SelectField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import ButtonElement from 'src/components/Fields/ButtonElement';

// Actions
import { toggleModal } from '../reducer/app';
import { addNewOM } from 'src/reducer/omForm';
import { addNewEf } from 'src/reducer/ef';

const Modal = ({ target, user, userOms, agent}) => {

  const dispatch = useDispatch();
  let isOm = false;
  let defaultValues = {};

  if (target === 'ordre de mission' ) {
    isOm = true;
    defaultValues = {
      duration: true,
      withExpenses: true,
    }
  }
  else {
    defaultValues = {
      isTeaching: agent.unimesStatus === "VACATAIRE",
    }
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: defaultValues });

  const close = () => {
    dispatch(toggleModal());
  }
  
  const onSubmit = (data) => {
    
    if (isOm) {
      const newOM = {
        name: `Ordre-de-mission-${agent.lastname.toUpperCase()}`,
        status: 1,
        url: 'path',
        missioner: user,
        comments: '',
        expenses: data.withExpenses,
        isPonctual: data.duration,
      }
      dispatch(addNewOM(newOM)); 
    }
    else {
      const splitName = userOms.find((om) => om.id === Number(data.om)).name.split('-');
      splitName[1] = 'EF';
      const efName = splitName.join('-');
      
      const newEF = {
        name: efName,
        status: 1,
        url: 'path',
        missioner: user,
        comments: '',
        omId: data.om,
        is_teaching: data.isTeaching,
        has_steps: data.hasSteps,
      }
      dispatch(addNewEf(newEF)); 
    }
  }

  return (
    <div className='modal'>
        <form className="modal__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form__section">
            <FormSectionTitle>Créer un nouvel {target} ?</FormSectionTitle>
            { target === 'ordre de mission' && (
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
            )}
            { target === 'état de frais' && (
              <>
                <div className="form__section-field">
                  <SelectField
                    data={userOms}
                    register={register}
                    formField="om"
                    handler={() => {}}
                    id="work-address-select"
                    label="Sélectionner l'OM dont vous voulez faire l'état de frais"
                    blankValue="Liste des OMs disponibles pour un remboursement"
                    required="Merci de sélectionner l'Ordre de Mission"
                    error={errors.omList}
                  />
                </div>
                <div className="form__section-field">
                  <SwitchButton
                    register={register}
                    isInForm
                    formField='isTeaching'
                    label="Etait-ce une mission de vacation ?"
                  />
                  <SwitchButton
                    register={register}
                    isInForm
                    formField='hasSteps'
                    label="Était-ce une mission avec plusieurs étapes ?"
                  />
                </div>
              </>
            )}
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
