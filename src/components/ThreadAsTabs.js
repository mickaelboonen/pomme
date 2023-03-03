import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';
import { useNavigate } from 'react-router-dom';

const ThreadAsTabs = ({ step, tabs, isOm, urlData }) => {
  
  const docId = urlData.searchParams.get('id');
  const { pathname } = urlData;
  const navigate = useNavigate();

  const handleClickOnTab = (event) => {
    const { id } = event.target;

    if (isOm) {
      navigate(pathname + '?etape=' + id + '&id=' + docId);
    }
    else {
      navigate(pathname + '?etape=' + id + '&id=' + docId + '&om=' + urlData.searchParams.get('om'));
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
          {tab.name} <span>- Étape {step} / {tabs.length}</span>
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
