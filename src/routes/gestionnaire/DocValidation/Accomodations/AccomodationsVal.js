import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { useLoaderData } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import '../style.scss';

// Components
import TextareaField from 'src/components/Fields/TextareaField';
import TextField from 'src/components/Fields/TextField';
import FormSectionTitle from 'src/components/FormSectionTitle';

// Selectors 
import { addAllAddressesFields } from 'src/selectors/keyObjectService';

// Reducer
import { getDDMMYYDate, getHHMMTime } from 'src/selectors/dateFunctions';
import FileHandler from '../FileHandler';
import InputValueDisplayer from '../InputValueDisplayer';

const AccomodationsVal = ({ displayPdf, data, entity }) => {
  console.log(data);
  const loader = useLoaderData();

  
  return (
    <>
      <div className="form__section">
        <FormSectionTitle>Hébergement</FormSectionTitle>

        <InputValueDisplayer
          label="Nombre de nuits à l'hôtel"
          value={data.nights_number}
        />
        <InputValueDisplayer
          label="Règlement de l'hôtel"
          value={data.hotel_payment === 'agent' ? "Avancé par l'agent" : "Payé par Unîmes"}
        />

      </div>
        <FormSectionTitle>Repas</FormSectionTitle>
        
        <InputValueDisplayer
          label="Nombre de repas payés par l'agent"
          value={data.meals_paid_by_agent}
        />
        <InputValueDisplayer
          label="Nombre de repas payés par l'agent en restaurant administratif"
          value={data.meals_in_admin_restaurants}
        />
    </>
    
  );
};

AccomodationsVal.propTypes = {
  entity: PropTypes.string.isRequired,
};

export default AccomodationsVal;
