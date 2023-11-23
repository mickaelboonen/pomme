import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { MdRefresh } from 'react-icons/md'
import { FaQuestionCircle } from 'react-icons/fa'
import classNames from 'classnames';
var lodash = require('lodash/collection');

import './modalStyle.scss';

// Components 
import Help from 'src/components/Help';
import SwitchButton from 'src/components/SwitchButton';
import SelectField from 'src/components/Fields/SelectField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import ButtonElement from 'src/components/Fields/ButtonElement';
import RadioInput from 'src/components/Fields/RadioInput';

// Actions
import { toggleModal } from '../reducer/app';
import { addNewOM } from 'src/reducer/omForm';
import { addNewEf } from 'src/reducer/ef';
import { fetchOMs } from 'src/reducer/agent';
import { Link } from 'react-router-dom';

const Modal = ({ target, user, userOms, agent, loader }) => {
  
  const dispatch = useDispatch();
  let isOm = false;
  let defaultValues = {};

  const { omManager : { services, departments, missionTypes }} = useSelector((state) => state);
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: defaultValues });

  if (target === 'ordre de mission' ) {
    isOm = true;
    defaultValues = {
      duration: 'ponctual',
      expenses: 'with',
    }
  }
  else {
    defaultValues = {
      isTeaching: agent.unimesStatus === "VACATAIRE",
    }
  }

  const close = () => {
    dispatch(toggleModal());
  }

  
  const refreshData = () => {
      dispatch(fetchOMs(user));
  };

  let omTypes = [
    // {
      // name: 'Mission test',
      // id: 'test'
    // },
    // {
      // name: "Chargés de Mission",
      // id: 'cdm'
    // },
    {
      name: 'Mission Doctorants',
      id: 'doctorants'
    },
    {
      name: 'Mission de Recherche',
      id: 'research'
    },
    // {
      // name: "Mission d'enseignement",
      // id: 'deve'
    // },
    // {
      // name: 'Mission des personnels administratifs',
      // id: 'admin'
    // },
    // {
      // name: 'Mission de formation des personnels administratifs',
      // id: 'formation'
    // }
  ];

  const departmentsToShow = departments.map((dep) => {
    return {
      id: dep.shortName,
      name: dep.name,
    }
  })
  const missionTypesToShow = missionTypes.map((dep) => {
    return {
      id: dep.shortName,
      name: dep.name,
    }
  })
  let servicesToShow = services.map((service) => {
    return {
      id: service.shortName,
      name: service.name,
    }
  })

  servicesToShow = servicesToShow.filter((service) => !service.name.includes('POM'))
  
  const onSubmit = (data) => {
    if (isOm) {
      const omType =  (data.type === 'doctorants' ? 'admin' : data.type) + (data.service ? '-' + data.service : '');

      const newOM = {
        name: `Ordre-de-mission-${agent.lastname.toUpperCase()}`,
        status: 1,
        url: 'path',
        missioner: user,
        comments: '',
        expenses: data.expenses === 'with' ? 1 : 0,
        isPonctual: data.duration === 'ponctual' ? 1 : 0,
        type: omType,
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
        is_teaching: false,
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

  const [service, setService] = useState([]);
  const displayService = (event) => {
    const { value } = event.target;
    if (value === 'deve') {
      setService(departmentsToShow);
    }
    else if (value === "formation" || value === "admin") {
      setService(servicesToShow);
    }
    else if (value === "cdm") {
      setService(missionTypesToShow);
    }
    else if (value === "doctorants") {
      
      setService([
        {
          name: "Prise en charge par l'École Doctorale / l'UPR",
          id:'ed'
        },
        // {
          // name: 'Prise en charge par le Collège Doctoral',
          // id:'cd'
        // },
      ]);
    }
    else {
      setService([]);
    }
  }

  return (
    <div className='modal'>
        <form className="modal__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form__section">
            <FormSectionTitle>Créer un nouvel {target} ?</FormSectionTitle>
            { target === 'ordre de mission' && (
              <div className="form__section-field">

              <div className='form__section form__section--documents'>
                <div className='form__section-half'>
                  <label className="form__section-field-label" htmlFor="departure-place">Durée</label>
                  
                  <RadioInput
                    id="ponctual"
                    formField="duration"
                    label="Ponctuel"
                    register={register}
                    required="Veuillez indiquer la durée de votre mission"
                  />
                  <RadioInput
                    id="permanent"
                    formField="duration"
                    label="Permanent"
                    register={register}
                    required="Veuillez indiquer la durée de votre mission"
                  />
                </div>
                <div className='form__section-half'>
                  <label className="form__section-field-label" htmlFor="departure-place">Frais</label>
                    
                    <RadioInput
                      id="with"
                      formField="expenses"
                      label="Avec frais"
                      register={register}
                      required="Veuillez indiquer si vore mission engendre des frais"
                    />
                    <RadioInput
                      id="without"
                      formField="expenses"
                      label="Sans frais"
                      register={register}
                      required="Veuillez indiquer si vore mission engendre des frais"
                    />
                  </div>
              </div>
              <div>
              {errors.duration && <p className="form__section-field-error form__section-field-error--open">{errors.duration.message}</p>}
              {errors.expenses && <p className="form__section-field-error form__section-field-error--open">{errors.expenses.message}</p>}

              </div>
                <div className="form__section-field">
                  <SelectField
                      data={omTypes}
                      register={register}
                      formField="type"
                      handler={displayService}
                      id="om-type"
                      label="Sélectionner le type d'OM"
                      blankValue="--Veuillez sélectionner un type--"
                      required="Merci de sélectionner le type d'ordre de mission"
                      error={errors.type}
                    />
                    <p onClick={toggleHelp} id="research-help" className="form__section-field-select-help">Besoin d'aide ? Cliquez ici.</p>
                </div>
                {service.length > 0 && (
                  <SelectField
                    data={lodash.sortBy(service, ['name'])}
                    register={register}
                    formField="service"
                    handler={() => {}}
                    id="work-address-select"
                    label="Sélectionner le département / service concerné"
                    blankValue="--Veuillez sélectionner un département / service --"
                    required="Merci de sélectionner le département ou service concerné"
                    error={errors.service}
                  />
                )}
                <Help
                  id="research"
                  title='Mission de Recherche'
                  message="Les Missions de Recherche comprennent les missions en rapport avec la Recherche, les événements scientifiques, colloques, séminaires, conférences et réunions, ainsi que les formations prises en charge par le Labo."
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
                  {user === 'mboone01' && <Link to={`/utilisateur/${encodeURIComponent('mes-états-de-frais')}/vacataires`}>Je suis Vacataire</Link>}
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
