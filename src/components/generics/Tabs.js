import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import classNames from 'classnames';

const Tabs = ({ handler, tabs}) => {
  const firstId = tabs[0].id;
  return (
    <div className='tabs'>
      {tabs.map((tab) => (
        <div
          onClick={handler}
          className={classNames('tabs__item', {'tabs__item--open': tab.id === firstId})}
          id={tab.id}
        >
          {tab.name}
        </div>
      ))}
    </div>
  );
};

Tabs.propTypes = {
  handler: PropTypes.func.isRequired,
  tabs: PropTypes.arrayOf.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })
};

export default Tabs;
