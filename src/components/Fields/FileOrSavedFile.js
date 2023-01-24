import React from 'react';
import PropTypes from 'prop-types';
import CheckboxInput from 'src/components/Fields/CheckboxInput';
import FileField from 'src/components/Fields/FileField';

import './style.scss';

const FileOrSavedFile = ({ register, setValue, id, label, hasSavedDocument}) => {

  const idWithCapitalFirstLetter = id[0].toUpperCase() + id.slice(1);
  return (
    <div className="form__section-field">
      <CheckboxInput
        register={register}
        formField={"saved" + idWithCapitalFirstLetter}
        id={"saved-" + id +"-field"}
        label={"Utiliser la " + label.toLowerCase() + " enregistrée dans mon profil"}
      />  
      {!hasSavedDocument && (
        <FileField
          setValue={setValue}
          register={register}
          formField={"car" + idWithCapitalFirstLetter +"File"}
          id={"car-" + id +"-document"}
          label={label}
        />
      )}
    </div>
  );
}

FileOrSavedFile.propTypes = {

};

export default FileOrSavedFile;
