import React from 'react';
import PropTypes from 'prop-types';

import HiddenField from 'src/components/Fields/HiddenField';

const VisaHiddenFields = ({ id, register, user }) => (
  <>
    <HiddenField id="docId" value={id} register={register} />
    <HiddenField id="actor" value={user} register={register} />
  </>
);

VisaHiddenFields.propTypes = {
  id: PropTypes.number.isRequired,
  register: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
};

export default VisaHiddenFields;
