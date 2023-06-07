import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const ApiResponse = ({ apiResponse, updateForm }) => {
  
  const { response, message } = apiResponse;
  
  return (
    <div className='api-response'>
      {(response.status && response.status !== 200 && response.status !== 202) && (
        <div className="api-response__error">
          <p className='api-response__error-details'>
            <span>Merci de contacter l'assistance informatique via</span> <a className='api-response__error-details__link' href='https://glpi.unimes.fr/front/helpdesk.public.php?create_ticket=1'>GLPI</a> et d'expliquer ce que vous faisiez lorque l'erreur est survenue, en fournissant une capture d'écran de l'erreur avec les toutes informations ci-dessous.
          </p>
          <div className="api-response__error-separator" />
          <h5 className="api-response__error-title">{response.statusText} - {response.status}</h5>
          <p className="api-response__error-details">{response.data.detail || response.data.message} </p>
          {response.data.trace && (
            <div className="api-response__error-trace">
              {response.data.trace.map((step) => (
                <p key={response.data.trace.indexOf(step)}>Fonction <span>{step.function}</span> de la classe <span>{step.short_class}</span>, à la ligne <span>{step.line}</span>.</p>
              ))}
            </div>
          )}
          <div className="api-response__error-separator" />
        </div>
      )}
      {(response.status === 200 || response.status === 202) && (
        <p className="form__section-message form__section-message--success">
          {message} <br />
          {!updateForm && <span style={{fontStyle: 'italic'}}>Vous allez être redirigé dans quelques instants.</span>}
        </p>
        )}
    </div>
  );
};

ApiResponse.propTypes = {

};

export default ApiResponse;
