import React from 'react';
import PropTypes from 'prop-types';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

import './style.scss';

const Rules = ({ title, children, id}) => {
  const handleClick = (event) => {
    event.currentTarget.nextElementSibling.classList.toggle('rules__body--open');
    document.getElementById(id + '-expand').classList.toggle('rules__title-icon--hidden');
    document.getElementById(id + '-shrink').classList.toggle('rules__title-icon--hidden');
  };

  return (
    <div className='rules' id={id}>
      <h4 className="rules__title" onClick={handleClick} id={id + '-title'}>
        {title}
        <span className="rules__title-icon" id={id + "-expand"}><MdExpandMore /></span>
        <span className="rules__title-icon rules__title-icon--hidden" id={id + "-shrink"}><MdExpandLess /></span>
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
