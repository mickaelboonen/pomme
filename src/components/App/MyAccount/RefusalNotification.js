import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import PageTitle from '../../generics/PageTitle';

const RefusalNotification = () => {
  const message= '';
  return (
  <main className='form-page'>
    <PageTitle>Notification de refus définitif</PageTitle>
    <PageTitle>Ordre de Mission {'id'}</PageTitle>
    <div className='form-page__notification'>

        <p className='form-page__notification-message'>Votre Ordre de Mission a été refusé définitivement.
          {message !== "" && " Vous trouverez ci-dessous un commentaire du responsable expliquant la raison de ce refus. Merci d'en prendre note et de supprimer l'Ordre de Mission."}
          {message === "" && " Merci de bien vouloir le supprimer."}
        </p>
        {message !== "" && <p className='form-page__notification-message form-page__notification-message--refusal'>{message}</p>}
        <div className='form-page__notification-button'>
          <button>Prendre note du refus et supprimer l'ordre de mission</button>
        </div>
      </div>
  </main>
);}

RefusalNotification.propTypes = {

};

export default RefusalNotification;
