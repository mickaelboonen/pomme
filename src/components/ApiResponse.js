import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const ApiResponse = ({ response, updateForm }) => {
  console.log(response.status);
 return (
  <div className='form__section' style={{marginBottom: '1rem'}}>
    {response.status !== 200 && <p className="form__section-message form__section-message--error">Ceci est une erreur</p>}
    {response.status === 200 && (
      <p className="form__section-message form__section-message--success">
        {response.data} <br />
        {!updateForm && <span style={{fontStyle: 'italic'}}>Vous allez être redirigé dans quelques instants.</span>}
      </p>
      )}
  </div>
);}

ApiResponse.propTypes = {

};

export default ApiResponse;
