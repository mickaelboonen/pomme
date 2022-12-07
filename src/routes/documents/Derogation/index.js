import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import './style.scss';
import FormSectionTitle from 'src/components/FormSectionTitle';
import PageTitle from 'src/components/PageTitle';
import ButtonElement from 'src/components/Fields/ButtonElement';
import TextareaField from 'src/components/Fields/TextareaField';

const Derogation = () => {
  
  
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

    // TODO : Process Data
    // On récupère les données de l'utilisateur et on envoie à la validation.
    navigate('/nouveau-document/ordre-de-mission?etape=2');
  };
  return (
    <div className="form-page__container">
      <div className="form-page__title">
        <PageTitle>Demande de prise en charge d’une dépense par voie dérogatoire au GDM </PageTitle>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form__section">
            <FormSectionTitle>Dérogation</FormSectionTitle>
            <TextareaField 
              register={register}
              id="dispensation-reason-field"
              label="Objet et motif de la dérogation"
              formField="dispensationReason"
              required="Merci de renseigner le motif de la dérogation"
              error={errors.dispensationReason}
            />
            <TextareaField 
              register={register}
              id="dispensation-rule-field"
              label="Règle du guide des missions faisant l’objet de la demande de dérogation"
              formField="dispensationRule"
              required="Merci de renseigner la règle du GDM faisant l’objet de la demande de dérogation"
              placeholder=""
              rows={3}
              error={errors.dispensationRule}
            />
            {/* 
            // TODO : pour les gestionnaires
            <TextField
              id="budget-line-field"
              label="Ligne budgétaire"
              formField="budgetLine"
              register={register}
            /> */}
          </div>
          <div className="form__section">
            <div className="form__section-field-button">
              <ButtonElement
                // isHidden
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
