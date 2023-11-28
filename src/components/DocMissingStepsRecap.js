import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.scss';

const DocMissingStepsRecap = ({ docState, id, url, om}) => (
  <div className='form'>
    <p className='form__text'>Merci de terminer les étapes précédentes pour accéder à cette étape.</p>
    <p className='form__text'>Il vous reste à valider :</p>
    <p className='form__text'>{docState.map((missingStep) => {
      if (docState.indexOf(missingStep) === docState.length -1 ) {
        return <Link key={missingStep.step} to={url.pathname + "?etape=" + missingStep.step + "&id=" + id + (om ? "&om=" + om : '')}>{missingStep.name.toUpperCase()}</Link>;
      }
      return <Link key={missingStep.step} to={url.pathname + "?etape=" + missingStep.step + "&id=" + id + (om ? "&om=" + om : '')}>{missingStep.name.toUpperCase() + ' - '}</Link>;
      })}
    </p>
</div>
);

DocMissingStepsRecap.propTypes = {
  
};
DocMissingStepsRecap.defaultProps = {
  om: null,
};

export default DocMissingStepsRecap;
