import React, { useHistory }  from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import { useNavigate } from 'react-router-dom';

const Buttons = ({ step }) => {
  
  const steps = ['mission', 'transports', 'hébergement', 'avance', 'signature'];
  
  const navigate = useNavigate();

  const handleClick = () => {
    let previousStep = step;
    previousStep--;
    navigate('/documents/ordre-de-mission/nouveau?etape=' + previousStep);
  }
  return (
    <div className="form__section-field">
      <div className="form__section-field-buttons">
        { (step !== 1 && step !== 5) && <button type="button" id="previous-button" onClick={handleClick}>Retour : {steps[step - 2]}</button>}
        { step !== 5 && <button type="submit">Suivant : {steps[step]}</button>}
        { step === 5 && <button type="submit">Valider</button>}
      </div>
    </div>
  );
};

Buttons.propTypes = {
  step: PropTypes.number.isRequired,
};

export default Buttons;
