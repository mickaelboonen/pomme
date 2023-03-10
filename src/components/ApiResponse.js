import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const ApiResponse = ({ response, updateForm }) => {
  
  const specificErrors = [
    {
      id: 1,
      details: 'Aucune connexion n’a pu être établie car l’ordinateur cible l’a expressément refusée.'
    },
  ];

  const handleClick = () => {
    const traceElement = document.querySelector('.api-response__error-trace');
    traceElement.classList.toggle('api-response__error-trace--open')
  };

 return (
  <div className='api-response'>
    {response.status !== 200 && (
      <div className="api-response__error">
        <h5 className="api-response__error-title">{response.response.statusText} - {response.response.status}</h5>
        <p className="api-response__error-details">{response.response.data.detail} </p>
        <p className='api-response__error-details'>Merci de contacter l'assistance informatique via <a className='api-response__error-details__link' href='https://glpi.unimes.fr/front/helpdesk.public.php?create_ticket=1'>GLPI</a> et d'expliquer ce que vous faisiez lorque l'erreur est survenue, en fournissant une capture d'écran de l'erreur avec les toutes informations.</p>
        <p className="api-response__error-more" onClick={handleClick}>Plus d'informations sur l'erreur ...</p>
        <div className="api-response__error-trace">
          {response.response.data.trace.map((step) => (
            <p>Fonction <span>{step.function}</span> de la classe <span>{step.short_class}</span>, à la ligne <span>{step.line}</span>.</p>
          ))}
        </div>
      </div>
    )}
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
