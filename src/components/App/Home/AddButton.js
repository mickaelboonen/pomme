import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';


// TODO: transform into doc button
const AddButton = ({ name, icon }) => {
  console.log(icon);
  return (
    <div className="home__new-buttons-item">
      {/* <img src={icon} alt="" /> */}
      <p>{name}</p>
    </div>
  );
};

AddButton.propTypes = {

};

export default AddButton;
