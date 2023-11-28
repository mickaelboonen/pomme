import React from 'react';
import PropTypes from 'prop-types';
import { FaSearchPlus, FaSearchMinus } from "react-icons/fa";

const Magnifier = ({ isFormMagnified, handleClickOnGlass }) => {
  return (
    <div className='form__magnifier' onClick={handleClickOnGlass}>
      {isFormMagnified && <FaSearchMinus />}
      {!isFormMagnified && <FaSearchPlus />}
    </div>
  );
}

Magnifier.propTypes = {
  isFormMagnified: PropTypes.bool.isRequired,
  handleClickOnGlass: PropTypes.func.isRequired,
};

export default Magnifier;
