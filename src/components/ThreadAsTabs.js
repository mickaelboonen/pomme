import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';
import { useNavigate } from 'react-router-dom';

const ThreadAsTabs = ({ step, tabs, isOm, urlData }) => {
  
  const docId = urlData.searchParams.get('id');
  // const step = urlData.searchParams.get('etape');
  const { pathname } = urlData;
  const navigate = useNavigate();

  const handleClickOnTab = (event) => {
    const { id } = event.currentTarget;
    
    if (Number(id) !== step) {
      if (isOm) {
        navigate(pathname + '?etape=' + id + '&id=' + docId);
      }
      else {
        navigate(pathname + '?etape=' + id + '&id=' + docId + '&om=' + urlData.searchParams.get('om'));
      }
    }
  };

  const tabWidth = 100 / tabs.length;
  
  return (
    <div className="form-page__thread">
      {tabs.map((tab) => (
        <div
          className={classNames("form-page__thread-step" , {"form-page__thread-step--open" : step === tab.id})}
          onClick={handleClickOnTab}
          key={tab.id}
          id={tab.id}
          style={{width: tabWidth + '%'}}
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
