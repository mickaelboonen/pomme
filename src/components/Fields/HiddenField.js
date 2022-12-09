import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const HiddenField = ({ id, value, register}) => (
    <input id={id} name={id} type="hidden" {...register(id)} value={value} />
);

HiddenField.propTypes = {

};

export default HiddenField;
