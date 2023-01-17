import React  from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { uploadFile } from 'src/reducer/omForm';
import { turnTransportsDataToDbFormat } from 'src/selectors/dataToDbFormat';

const Buttons = ({ step, url, id, watch, update}) => {
  
  const dispatch = useDispatch();

  const nextStep = step + 1;
  const backStep = step - 1;
  
  const handleClick = () => {
    const data = watch();
    // dispatch(saveDataAsItIs({ data: formData, step: step}));
    
    if (step === 1) {

    }
    else if (step === 2) {
      const databaseData = turnTransportsDataToDbFormat(data);
      if (typeof databaseData.transportDispensation !== 'string' || typeof databaseData.vehicleAuthorization !== 'string') {
        dispatch(uploadFile({data: databaseData, step: 'transports'}));
      }
      // Else we directly update the transports entity
      else {
        dispatch(update(databaseData));
      }
    }

    else if (step === 3) {
      
    }

    else if (step === 4) {
      
    }

    else if (step === 5) {
      
    }




    // saveToDb();
  }
  return (
    <div className="form__section">
      <div className="form__section-field-buttons">
        <button type='button'><Link to={url.pathname + '?etape=' + backStep + '&id=' + id}>PRÉCÉDENT</Link></button>
        <button type="button" id="previous-button" onClick={handleClick}>Enregistrer en l'état</button>
        <button type="submit">Valider les données</button>
        <button type='button'><Link to={url.pathname + '?etape=' + nextStep + '&id=' + id}>SUIVANT</Link></button>
      </div>
    </div>
  );
};

Buttons.propTypes = {
  step: PropTypes.number.isRequired,
};

export default Buttons;
