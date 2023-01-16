import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';
import { useNavigate } from 'react-router-dom';

const ThreadAsTabs = ({ step, tabs, isOm, urlData }) => {
  

  const omId = urlData.searchParams.get('id');
  const { pathname } = urlData;
  const navigate = useNavigate();

  const handleClickOnTab = (event) => {
    const { id } = event.target;

    if (window.innerWidth >= 600) {
      if (window.confirm("Voulez-vous enregistrer les informations saisies ?")) {
        navigate(pathname + '?etape=' + id + '&id=' + omId);
      }
    }
  };
  return (
    <div className="form-page__thread">
      {tabs.map((tab) => (
        <div
          className={classNames("form-page__thread-step" , {"form-page__thread-step--open" : step === tab.id})}
          onClick={handleClickOnTab}
          key={tab.id}
          id={tab.id}
          >
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
