import React from 'react';
import PropTypes from 'prop-types';
import ButtonElement from 'src/components/Fields/ButtonElement';

const ReturnLink = ({ link }) => (
  <div className="form__section">
    <div className='form__section-field-buttons form__section-field-buttons--solo'>
      <ButtonElement
        isLink
        link={link}
        label="Retour"
      />
    </div>
  </div>
);

ReturnLink.propTypes = {
  link: PropTypes.string.isRequired,
};

export default ReturnLink;
