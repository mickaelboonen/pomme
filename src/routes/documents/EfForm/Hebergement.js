import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import './style.scss';
import FormSectionTitle from 'src/components/FormSectionTitle';
import RefusalMessage from 'src/components/Fields/RefusalMessage';
import Buttons from 'src/components/Fields/Buttons';
import TextField from 'src/components/Fields/TextField';
import FileField from 'src/components/Fields/FileField';

import { applyRegisterFromHebergementData } from 'src/selectors/formValidationsFunctions';

import { efHelp } from 'src/data/efHelp';
import { toggleHelp } from 'src/reducer/ef';

const Hebergement = ({ step }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [searchParams] = useSearchParams();
  const omId = searchParams.get('id');

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState:
    { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);    
    const nextStep = step + 1;
    localStorage.setItem('hebergementEf', JSON.stringify(data));
    navigate('/nouveau-document/état-de-frais?etape=' + nextStep + '&id=' + omId)
  };
  const { refusalMessage, mealFields } = useSelector((state) => state.efForm)
  
  const omHebergement = JSON.parse(localStorage.getItem('hebergement'));
  const hotel = watch('hotel');

  useEffect(() => {
    applyRegisterFromHebergementData(omHebergement, register);

    if (Number(hotel) > 0) {
      register('hotelFiles', {
        required: 'Veuillez fournir le justificatif de paiement.'
      })
    }
  });

  useEffect(() => {
    trigger();
  }, []);

  const showHelp = (event) => {

    const { id } = event.target;

    const el = document.getElementById(`${id}-help`);

    const currentHelp = efHelp.find((e) => e.id === id);
    dispatch(toggleHelp(currentHelp));

  };
  
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <FormSectionTitle>Hébergement</FormSectionTitle>
      <div className='form__section form__section--documents'>
        <div className='form__section-half'>
          <TextField
            isNumber
            min='0'
            id="hotel-field"
            formField="hotel"
            register={register}
            label="Hébergement à titre onéreux (France et étranger)"
            placeholder="Montant"
            error={errors.hotel}
          />
        </div>
        <div className='form__section-half'>
          <FileField
            register={register}
            formField="hotelFiles"
            id="hotel-files-field"
            multiple
            label="Facture"
            placeholder=""
            error={errors.hotelFiles}
          />
        </div>
      </div>
      <TextField 
        isNumber
        min='0'
        id="free-accomodation-field"
        formField="free-accomodation"
        register={register}
        label="Hébergement à titre gratuit"
        placeholder="Nombre de nuits"
      />
      <div className="form__section-field" id="meals">
        <FormSectionTitle>Repas</FormSectionTitle>
        {mealFields.map((field) => (
          <TextField
            key={field.id}
            id={field.id}
            formField={field.formField}
            register={register}
            isNumber
            min="0"
            placeholder="Nombre de repas"
            label={field.label}
            hasHelp
            helpFunction={showHelp}
          />
        ))}
      </div>
      {refusalMessage !== '' && <RefusalMessage message={refusalMessage} />}
      {/* <Buttons step={step} /> */}
    </form>
    
  );
};

Hebergement.propTypes = {

};

export default Hebergement;
