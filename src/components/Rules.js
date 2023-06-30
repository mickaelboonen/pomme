import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Rules = ({ title, children, id}) => {
  const handleClick = (event) => {
    event.currentTarget.nextElementSibling.classList.toggle('rules__body--open');
  };

  return (
    <div className='rules' id={id}>
      <h4 className="rules__title" onClick={handleClick} id={id + '-title'}>
        {title}
      </h4>
      <div className="rules__body">
        {children}
      </div>
    </div>
  );
  }

Rules.propTypes = {

};

export default Rules;
