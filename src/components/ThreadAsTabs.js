import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';
import { useNavigate } from 'react-router-dom';

const ThreadAsTabs = ({ step, tabs, isOm }) => {
  const navigate = useNavigate();

  const handleClickOnTab = (event) => {
    const { id } = event.target;

    if (window.confirm("Voulez-vous enregistrer les informations saisies ?")) {

      // todo : save data
      // then
      const target = isOm ? 'ordre-de-mission' : 'état-de-frais';
      navigate('/nouveau-document/' + target + '?etape=' + id);
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
ThreadAsTabs.defaultProptypes = {
  isOm: false,
};

export default ThreadAsTabs;
