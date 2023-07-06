import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { MdRefresh } from 'react-icons/md'
import { FaQuestionCircle } from 'react-icons/fa'
import classNames from 'classnames';

import './modalStyle.scss';

// Components 
import Help from 'src/components/Help';
import SwitchButton from 'src/components/SwitchButton';
import SelectField from 'src/components/Fields/SelectField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import ButtonElement from 'src/components/Fields/ButtonElement';

// Actions
import { toggleModal } from '../reducer/app';
import { addNewOM } from 'src/reducer/omForm';
import { addNewEf } from 'src/reducer/ef';
import { fetchOMs } from 'src/reducer/agent';

const Modal = ({ target, user, userOms, agent, loader }) => {
  
  const dispatch = useDispatch();
  let isOm = false;
  let defaultValues = {};

  if (target === 'ordre de mission' ) {
    isOm = true;
    defaultValues = {
      duration: true,
      withExpenses: true,
      isTrainingCourse: false,
      isResearch: false,
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

  
  const refreshData = () => {
      dispatch(fetchOMs(user));
  };
  
  const onSubmit = (data) => {
    if (isOm) {
      console.log(agent);
      const newOM = {
        name: `Ordre-de-mission-${agent.lastname.toUpperCase()}`,
        status: 1,
        url: 'path',
        missioner: user,
        comments: '',
        expenses: data.withExpenses,
        isPonctual: data.duration,
        isTrainingCourse: data.isTrainingCourse,
        isResearch: data.isResearch,
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

  const toggleHelp = (event) => {
    const target = event.currentTarget.id.split('-')[0];
    const helpElement = document.getElementById(target);
    helpElement.classList.toggle('help--open');
  };

  useEffect(() => {
    if (target === '') {
      dispatch(toggleModal());
    }
  }, [])
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
                <div className="form__section-field-modal">
                  <SwitchButton
                    register={register}
                    isInForm
                    formField='isResearch'
                    label="Mission de Recherche :"
                  />
                  <FaQuestionCircle id="research-help" className="form__section-field-modal-icon" onClick={toggleHelp} />
                </div>
                <Help
                  id="research"
                  message="Comprend les missions en rapport avec la Recherche, les événements scientifiques, colloques, séminaires, conférences et réunions, ainsi que les formations prises en charge par le Labo."
                />
                <div className="form__section-field-modal">
                  <SwitchButton
                    register={register}
                    isInForm
                    formField='isTrainingCourse'
                    label="Mission de formation des personnels :"
                  />
                  {/* <FaQuestionCircle className="form__section-field-modal-icon" id="hr-help" onClick={toggleHelp} /> */}
                </div>
                {/* <Help
                  id="hr"
                  message="blablabl"
                /> */}
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
                    required="Merci de sélectionner un Ordre de Mission"
                    error={errors.om}
                  />
                  <div className="my-documents__files-buttons">
                    <button style={{width: 'fit-content'}} onClick={refreshData} type="button">
                      <MdRefresh className={classNames('my-documents__files-buttons-icon', {'my-documents__files-buttons-icon--animated': loader})} />  {!loader ? 'Rafraîchir la liste' : ''}
                    </button>
                  </div>
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
          <div className="form__section-field-buttons" style={{display: 'flex', justifyContent: 'center'}} id="modal-button">
            <ButtonElement
              type="submit"
              label="Valider"
              hasLoader
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
