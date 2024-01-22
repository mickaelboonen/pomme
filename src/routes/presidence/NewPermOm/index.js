import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLoaderData, useLocation, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { getDDMMYYDate } from 'src/selectors/dateFunctions';

// Components
// import NewSection from './NewSection';
import SelectField from 'src/components/Fields/SelectField';
import CheckboxInput from 'src/components/Fields/CheckboxInput';
import TextField from 'src/components/Fields/TextField';
import PageTitle from 'src/components/PageTitle';
import ButtonElement from 'src/components/Fields/ButtonElement';
import FormSectionTitle from 'src/components/FormSectionTitle';

import { toggleModal } from 'src/reducer/app';
import { addNewOM, clearOMTarget, selectOmData} from 'src/reducer/omForm';
import { selectEfData, clearEfTarget } from 'src/reducer/ef';

import { fetchPresidencyVehicles, createPermOm, createPermOmPDF } from 'src/reducer/presidency';


// import './style.scss';

import '../style.scss';
import { useForm } from 'react-hook-form';
import DocsGenerator from './DocsGenerator';

const NewPermOm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {
    register,
    setValue,
    watch,
    setError,
    handleSubmit,
    formState:
      { errors }
  } = useForm({
    defaultValues: {
      "car": "6",
      "member": "broig",
      "otherMember": "",
      "purpose": "Tout déplacement dans le cadre de la Présidence",
      "dispensations": [
          "train",
          "avion",
          "car",
          "taxi"
      ]
  }
  });

  const [dispensations, member] = watch(['dispensations', 'member']);

  useEffect(() => {
    // if (dispensations && dispensations.indexOf('car') > -1) {
      // console.log(member);
      setValue('car', presidencyVehicles);
    // }
  }, [presidencyVehicles])

  const { presidency: { loader, presidencyUsers, currentOm, presidencyVehicles, proceedToPdf}} = useSelector((state) => state);

  useEffect(() => {
    if (proceedToPdf) {
      navigate(`/${encodeURIComponent('présidence')}/${encodeURIComponent('pdfs-à-créer')}/${currentOm.id}`);
    }
  }, [proceedToPdf])
  const [isSubmitted, setIsSubmitted] = useState(false);
  const onSubmit = (data) => {
    console.log(data);
    const recipient = presidencyUsers.find((user) => user.id === data.member);
    // data.addresses = [{city: 'France_métropolitaine'}];
    data.name = createOmName(recipient)
    const year = new Date().getFullYear()
    const beginning = new Date(year + '-01-01T00:00:00');
    const ending = new Date(year + '-12-31T23:59:00');


    data.beginning = beginning;
    data.ending = ending;
    console.log(data);

    dispatch(createPermOm(data));
    // setIsSubmitted(true);
  }
  const handleClickForVehicles = () => {
    // console.log(member);
    if (member === '') {
      setError('member', {type: 'custom', message: 'Veuillez sélectionner un membre de la Présidence.'})
    }
    else {
      dispatch(fetchPresidencyVehicles({agent: member}))
    }
  }

  const createOmName = (data) => {
    const recipient = data.name.split(' ');
    return  recipient[0].slice(0,1) + '.' + recipient[1].toUpperCase() + '-OM_PERMANENT-' + new Date().getFullYear() + '-FRANCE_MÉTROPOLITAINE';
  }
  return (
    <main className="form-container">
      <PageTitle>Créer un nouvel OM permanent</PageTitle>
        {!loader && (
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form__section">

              <FormSectionTitle>Bénéficiaire de l'OM</FormSectionTitle>
              <SelectField
                register={register}
                blankValue="Choisissez"
                id="member-field"
                formField="member"
                label="Agent de la Présidence"
                handler={() => {}}
                error={errors.member}
                required="Choisissez"
                data={presidencyUsers}
              />
              <TextField
                id="other-member-field"
              formField="otherMember"
              label="Autre agent"
              placeholder="Renseigner le nom de l'agent dont vous souhaitez créer l'OM s'il ne se trouve pas dans la liste ci-dessus"
                register={register}
              />
              <FormSectionTitle>Mission</FormSectionTitle>
              <TextField
                id="purpose"
              formField="purpose"
              label="Libellé de la mission"
                register={register}
              />
            </div>
            <div className="form__section">
              <FormSectionTitle>Transports</FormSectionTitle>
              <div className="form__section-field">
                <p className="form__section-field-label">Dérogations</p>
                <CheckboxInput
                  id="train"
                  formField="dispensations"
                  label="Train en première classe"
                  register={register}
                />
                <CheckboxInput
                  id="avion"
                  formField="dispensations"
                  label="Avion en classe affaire"
                  register={register}
                />
                <CheckboxInput
                  id="taxi"
                  formField="dispensations"
                  label="Taxi"
                  register={register}
                />
                <CheckboxInput
                  id="car"
                  formField="dispensations"
                  label="Autorisation de véhicule"
                  register={register}
                />
              </div>
              
              {(dispensations && dispensations.indexOf('car') > -1) && (
                <div className="form__section-field">
                  {presidencyVehicles.length > 0 && (
                    <SelectField
                      register={register}
                      blankValue="Choisissez"
                      id="car-field"
                      formField="car"
                      label="Véhicules de l'agent"
                      handler={() => {}}
                      error={errors.car}
                      required="Veuillez choisi un véhicule."
                      data={presidencyVehicles}
                    />
                  )}
                  <div className="form__section-field-buttons"  style={{margin: 0}}>
                    <div className="form__section-field-buttons__row">
                      <button type="button" onClick={handleClickForVehicles}>{member === '' ? "Veuillez sélectionner un agent" : "Récupérer les véhicules de " + member}</button>
                    </div>
                  </div>
                </div>
              )}
              {errors.presentation && <p className="form__section-field-error form__section-field-error--open">{errors.presentation.message}</p>}
              {/* </div> */}
            </div>
          {/* <div className="form__section">
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
                  formField="nacres"
                  label="Code Nacres"
                  register={register}
                />
              </div>
            </div>
            <div className='form__section form__section--documents'>
              <div className='form__section-half'>
                <TextField
                  id="lolf-field"
                  formField="lolf"
                  label="Code LOLF"
                  register={register}
                /> 
              </div>
              <div className='form__section-half'>
                <TextField
                  id="analytic-field"
                  formField="analytique"
                  label="Code analytique"
                  register={register}
                />
              </div>
            </div>
          </div> */}
          {isSubmitted && (
            <DocsGenerator data={watch()} />
          )}
          <div className="form__section">
            <div className="form__section-field-buttons"  style={{margin: '1rem'}}>
              <div className="form__section-field-buttons__row">
                <button type="submit">Valider la saisie définitive</button>
              </div>
            </div>
          </div>
        </form>
      )}
    </main>
  );
}

NewPermOm.propTypes = {

};

export default NewPermOm;
