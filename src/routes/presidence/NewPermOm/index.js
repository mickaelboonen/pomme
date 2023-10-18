import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLoaderData, useLocation, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';

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

import { selectDocumentsList } from 'src/reducer/agent';


// import './style.scss';

import '../style.scss';
import { useForm } from 'react-hook-form';

const NewPermOm = () => {
  const {
    register,
    setValue,
    watch,
    setError,
    handleSubmit,
    formState:
      { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }
  const handleClickOnNewOM = () => {

  }
  return (
  <main className="form-container">
    <PageTitle>Créer un nouvel OM permanent</PageTitle>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <FormSectionTitle>Bénéficiaire de l'OM</FormSectionTitle>

        <SelectField
          register={register}
          blankValue="Choisissez"
          // data,
          id="member-field"
          formField="member"
          label="Agent de la Présidence"
          // isHidden,
          handler={() => {}}
          // disabled,
          // validators,
          error={errors.member}
          required="Choisissez"
        
          data={['Roig', 'Seddoukki', 'Leroy', 'Le Gal La Salle', 'Olivier', 'Cadiere', 'Olivaux'] }
          />
        <FormSectionTitle>Mission</FormSectionTitle>
        <TextField
          id="purpose"
          formField="purpose"
          label="Libellé de la mission"
          register={register}
        />

        <FormSectionTitle>Transports</FormSectionTitle>

        <div className="form__section-field">
        <p className="form__section-field-label">Dérogations</p>
        <CheckboxInput
          id="train"
          formField="presentation"
          label="Train en première classe"
          register={register}
        />
        <CheckboxInput
          id="avion"
          formField="presentation"
          label="Avion en classe affaire"
          register={register}
        />
        <CheckboxInput
          id="taxi"
          formField="presentation"
          label="Taxi"
          register={register}
        />
        {errors.presentation && <p className="form__section-field-error form__section-field-error--open">{errors.presentation.message}</p>}
      </div>
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
      <div className="form__section-field-buttons">
        <div className="form__section-field-buttons__row">
          <button type="submit">Valider la saisie définitive</button>
        </div>
      </div>
    </div>

      </form>
  </main>
);
}

NewPermOm.propTypes = {

};

export default NewPermOm;
