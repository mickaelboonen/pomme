import React from 'react';
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from 'react-router-dom';

import './style.scss';
import PageTitle from 'src/components/PageTitle';
import TextField from 'src/components/Fields/TextField';
import HiddenField from 'src/components/Fields/HiddenField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import ButtonElement from 'src/components/Fields/ButtonElement';
import TextareaField from 'src/components/Fields/TextareaField';
import { useDispatch, useSelector } from 'react-redux';
import { createDerogation, clearSideForm } from '../../../reducer/omForm';
import { useEffect } from 'react';

const Derogation = () => {
  
  const navigate = useNavigate();
  const loader = useLoaderData();
  const dispatch = useDispatch();
  const { isSideFormInDB } = useSelector((state) => state.omForm);

  const types = loader.searchParams.get('type').split(',');
  const omId = loader.searchParams.get('omId');
  let lol = 'Demande de dérogation pour '

  if (types.length === 2) {
    lol += "le train et l'avion";
  }
  else if (types.length ===1) {
    if (types[0] === 'train') {
      lol += "le train";
      
    }
    else if (types[0] === 'plane') {
      lol += "l'avion";
    }
    else if (types[0] === 'taxi') {
      lol += "le taxi";
    }
  }
  const {
    register,
    handleSubmit,
    watch,
    formState:
    { errors },
  } = useForm();

  useEffect(() => {
    if (isSideFormInDB) {
      dispatch(clearSideForm());
      navigate('/modifier-un-document/ordre-de-mission?etape=2&id=63');
    }
  }, [isSideFormInDB])

  const onSubmit = (data) => {
    data.type = lol;
    console.log(data);

    dispatch(createDerogation(data));
    // TODO : Process Data
    // On récupère les données de l'utilisateur et on envoie à la validation.
    // navigate('/nouveau-document/ordre-de-mission?etape=2');
  };
  return (
    <div className="form-page__container">
      <div className="form-page__title">
        <PageTitle>Demande de prise en charge d’une dépense par voie dérogatoire au GDM </PageTitle>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form__section">
            <FormSectionTitle>Dérogation</FormSectionTitle>
            <HiddenField id="omId" value={omId} register={register} />
            <TextField
              register={register}
              disabled={true}
              id="type-field"
              label="Type de dérogation"
              formField="type"
              value={lol}
            />
            <TextareaField 
              register={register}
              id="reasons-field"
              label="Raisons de la dérogation"
              formField="reasons"
              required="Merci de renseigner les raisons de la dérogation"
              error={errors.reasons}
            />
            <TextareaField 
              register={register}
              id="rule-field"
              label="Règle du guide des missions faisant l’objet de la demande de dérogation"
              formField="rule"
              required="Merci de renseigner la règle du GDM faisant l’objet de la demande de dérogation"
              placeholder=""
              error={errors.rule}
            />
          </div>
          <div className="form__section">
            <div className="form__section-field-button">
              <ButtonElement
                type="submit"
                label="Envoyer la demande"          
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

Derogation.propTypes = {

};

export default Derogation;
