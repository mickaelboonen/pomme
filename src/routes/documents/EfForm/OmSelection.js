import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import FormSectionTitle from 'src/components/FormSectionTitle';
import ButtonElement from 'src/components/Fields/ButtonElement';
import SelectField from 'src/components/Fields/SelectField';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const OmSelection = ({ step }) => {
  const {userOms } = useSelector((state) => state.omForm)

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState:
    { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    
    // dispatch(createEf(data));
    // navigate(`/nouveau-document/état-de-frais?etape=${nextStep}&id=${data.omList}` )
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__section">
        <FormSectionTitle>Ordre de Mission</FormSectionTitle>
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
      <div className="form__section-field-buttons">
        <ButtonElement
          label="Créer mon état de frais"
          type="submit"
        />
      </div>
    </form>
  );
};

OmSelection.propTypes = {

};

export default OmSelection;
