import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Controller = ({ control, register, name, rules, render}) => {
    const props = register(name, rules);
    return render({
        onChange: (e) => props.onChange({
            target: {
                name,
                value: e.target.value
            }
        }), 
        name: props.formField
    });
}

Controller.propTypes = {

};

export default Controller;
