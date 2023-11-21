import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSignature } from "react-icons/fa";

// Components
import FileManager from 'src/routes/utilisateur/MyAccount/FileManager';
import CheckboxInput from 'src/components/Fields/CheckboxInput';
import FormSectionTitle from 'src/components/FormSectionTitle';

const Signature = ({ register, signature, user, watch }) => {
  const [showSignatureManager, setShowSignatureManager] = useState(watch('savedSignature') === true ? false : true);

  const handleSignatureCheckbox = (event) => {

    if (event.target.checked) {
      setShowSignatureManager(false);
    }
    else {
      setShowSignatureManager(true);
    }
  }

  return (
    <div className="form__section">
      <FormSectionTitle>SIGNATURE</FormSectionTitle>
      <div className="form__section-field">
        <CheckboxInput
          register={register}
          formField="savedSignature"
          handler={handleSignatureCheckbox}
          id="saved-signature-field"
          label="Utiliser la signature enregistrée dans mon profil"
        />
      </div>
      {showSignatureManager && (
        <FileManager
          icon={<FaSignature
            className='file-displayer__icon-container-icon'
          />}
          id="signature"
          label="Signature"
          file={signature}
          handler={null}
          user={user}
        />
      )}
    </div>
  );
}

Signature.propTypes = {
  register: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
  signature: PropTypes.object.isRequired,
  user: PropTypes.string.isRequired,
};

export default Signature;
