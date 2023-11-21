import React from 'react';
import PropTypes from 'prop-types';

import '../style.scss';

// Components
import FormSectionTitle from 'src/components/FormSectionTitle';
import InputValueDisplayer from '../InputValueDisplayer';

const AccomodationsVal = ({ data }) => {  
  return (
    <>
      <div className="form__section">
        <FormSectionTitle>Hébergement</FormSectionTitle>
        {data.hotel && (
          <>
            <InputValueDisplayer
              label="Nombre de nuits à l'hôtel"
              value={data.nights_number}
            />
            <InputValueDisplayer
              label="Règlement de l'hôtel"
              value={data.hotel_payment === 'agent' ? "Avancé par l'agent" : "Payé par Unîmes"}
            />
          </>
        )}
        {!data.hotel && (
          <InputValueDisplayer
            label="Hébergement"
            value="Pas de frais d'hébergement pour la mission"
          />
        )}
      </div>
      <div className="form__section">
        <FormSectionTitle>Repas</FormSectionTitle>
          
        <InputValueDisplayer
          label="Nombre de repas payés par l'agent"
          value={data.meals_paid_by_agent}
        />
        <InputValueDisplayer
          label="Nombre de repas payés par l'agent en restaurant administratif"
          value={data.meals_in_admin_restaurants}
        />
      </div>
    </>
  );
};

AccomodationsVal.propTypes = {
};

export default AccomodationsVal;
