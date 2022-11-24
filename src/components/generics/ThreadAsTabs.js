import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';
import { useNavigate } from 'react-router-dom';

const ThreadAsTabs = ({ step }) => {
  const navigate = useNavigate();
  const tabs = [
    {
      name: 'OM',
      id: 1,
    },
    {
      name: 'Mission',
      id: 2,
    },
    {
      name: 'Transports',
      id: 3,
    },
    {
      name: 'Hébergements',
      id: 4,
    },
    {
      name: 'Étapes',
      id: 5,
    },
    {
      name: 'Signature',
      id: 6,
    },
  ];

  const handleClickOnTab = (event) => {
    const { id } = event.target;

    if (window.confirm("Voulez-vous enregistrer les informations saisies ?")) {

      // todo : save data
      // then 
      navigate('/documents/etat-de-frais/nouveau?etape=' + id);
    }
  };
  return (
    <div className="form-page__thread">
      {tabs.map((tab) => (
        <div className={classNames("form-page__thread-step" , {"form-page__thread-step--open" : step === tab.id})} onClick={handleClickOnTab} id={tab.id}>
          {tab.name} <span>- Étape {step} / 5</span>
      </div>
      ))}
    </div>
  );
}

ThreadAsTabs.propTypes = {

};

export default ThreadAsTabs;
