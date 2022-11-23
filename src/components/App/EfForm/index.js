import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import Mission from './Mission';
import PageTitle from '../../generics/PageTitle';
import Transports from './Transports';
import Hebergement from './Hebergement';
import Avance from './Avance';
import Signature from './Signature';
import Thread from '../../generics/Thread';
import OmSelection from './OmSelection';

const OMForm = ({ step }) => {  
  console.log(step);
  return (
    <div className='form-container'>
      <Thread step={step} />
      <div className="form-page__title">
        <PageTitle>Création d'un État de frais</PageTitle>
      </div>
      <div className="form-page__container">
        {step === 1 && <OmSelection step={step} />}
        {step === 2 && <Mission step={step} />}
        {step === 3 && <Transports step={step} />}
        {step === 4 && <Hebergement step={step} />}
        {step === 5 && <Avance step={step} />}
        {step === 6 && <Signature step={step} />}
        {step !== 6 && <button className="form-page__container-link" type='button'>Enregistrer en l'état et revenir plus tard</button>}
        {step === 6 && <button className="form-page__container-link" type='button'>Retour : Avance</button>}
      </div>
    </div>
  );
};

OMForm.propTypes = {

};

export default OMForm;
