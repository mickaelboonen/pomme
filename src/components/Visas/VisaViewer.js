import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import classNames from 'classnames';

// Components
import TextareaField from 'src/components/Fields/TextareaField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import VisaComponent from 'src/components/VisaComponent';

const VisaViewer = ({ data, user, watch, gest, register}) => {

  const isOm = data.name.split('-')[1] === 'OM' ? true : false;
  return (
    <div className="form__section">
      <FormSectionTitle>Viser le document</FormSectionTitle>
      <VisaComponent
        data={data}
        user={user}
        watch={watch}
        gest={gest}
        isOm={isOm}
      />
      <TextareaField
        id="comments-field"
        label="Commentaires"
        formField="comments"
        register={register}
      />
    </div>
  );
};

VisaViewer.propTypes = {

};

export default VisaViewer;
