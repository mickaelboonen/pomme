import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import classNames from 'classnames';

const Tabs = ({ handler, tabs}) => {
  const firstId = tabs[0].id;
  const handleClick = (event) => {
    const openTab = document.querySelector(`#${event.currentTarget.id}`);
    const allTabs = document.querySelectorAll('.tabs__item');

    allTabs.forEach((currentTab) => {
      if (currentTab === openTab) {
        openTab.classList.add('tabs__item--open')
      }
      else {
        currentTab.classList.remove('tabs__item--open')
      }
    })
    handler(event);
  }
  return (
    <div className='tabs'>
      {tabs.map((tab) => (
        <div
          onClick={handleClick}
          className={classNames('tabs__item', {'tabs__item--open': tab.id === firstId})}
          id={tab.id}
          key={tab.id}
        >
          {tab.name}
          {tab.hasOwnProperty('notification') && (
            <span className='tabs__item-notification'>
              {tab.notification}
            </span>
          )}
          
        </div>
      ))}
    </div>
  );
};

Tabs.propTypes = {
  handler: PropTypes.func.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.object),
};

export default Tabs;
