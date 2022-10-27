import React from 'react';
import PropTypes from 'prop-types';
import OMForm from '../OMForm';
import VehicleUseForm from '../VehicleUseForm';

import './style.scss';
import { useLocation } from 'react-router-dom';

const Forms = () => {
  const location = useLocation();
  const target = location.pathname.split('/')[2];
  const step = Number(location.search.split('=')[1]);
  return (
    <main className="form-page">
      {target === 'autorisation-de-vehicule' && (<VehicleUseForm step={step} />) }
      {target === 'ordre-de-mission' && (<OMForm step={step} />) } 
      {target === 'etat-de-frais' && (<OMForm step={step} />) } 
    </main>
  );
}

Forms.propTypes = {

};

export default Forms;

