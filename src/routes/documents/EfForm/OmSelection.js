import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import FormSectionTitle from 'src/components/FormSectionTitle';
import Buttons from 'src/components/Fields/Buttons';
import SelectField from 'src/components/Fields/SelectField';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const OmSelection = ({ step }) => {

  const newOm = JSON.parse(localStorage.getItem('newOm'));
  const omArray = [ newOm ];

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState:
    { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);

    const selectedOm = JSON.parse(localStorage.getItem('newOm'));
    const nextStep = step + 1;
    const newEf = {
      id: data.omList,
      name: 'EF' + selectedOm.name.slice(2),
      status: 1,
      omUrl: selectedOm.omUrl,
      userId: selectedOm.userId,
    }
    localStorage.setItem('newEf', JSON.stringify(newEf));
    navigate(`/nouveau-document/état-de-frais?etape=${nextStep}&id=${data.omList}` )
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__section">
        <FormSectionTitle>Ordre de Mission</FormSectionTitle>
        <SelectField
          data={omArray}
          register={register}
          formField="omList"
          id="work-address-select"
          label="Sélectionner l'OM dont vous voulez faire l'état de frais"
          blankValue={"Liste des OMs disponibles pour un remboursement"}
          required="Merci de sélectionner l'Ordre de Mission"
          error={errors.omList}
        />
      </div>
      <Buttons step={step} />
    </form>
  );
};

OmSelection.propTypes = {

};

export default OmSelection;
