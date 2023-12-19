import React, { useEffect, useState } from 'react';

import FormSectionTitle from 'src/components/FormSectionTitle';
import CheckboxInput from 'src/components/Fields/CheckboxInput';
import FileField from 'src/components/Fields/FileField';

import { getSavedFileName } from 'src/selectors/formDataGetters';


import './style.scss';


const IdDocuments = ({ currentCni, register, watch, errors, setValue, clearErrors, currentPassport }) => {
  const [region, setRegion] = useState([]);
  const handleRegion = () => {
    const europe = document.getElementById('europe').checked;
    const abroad = document.getElementById('abroad').checked;
    const selectedRegions = [];
    if (abroad) {
      selectedRegions.push('abroad');
    }
    if (europe && !abroad) {
      selectedRegions.push('europe');
    }

    setRegion(selectedRegions);
  }
  const filename = currentPassport ? getSavedFileName(currentPassport.url) : '';
  const cniFilename = currentCni ? getSavedFileName(currentCni.url) : '';
  const savedPassport = watch('savedPassport');
  const savedCni = watch('savedCni');
  const handlePassport = () => {
    clearErrors('passport');
  }
  const handleCni = () => {
    clearErrors('cni');
  }

  console.log(region);
  return (
    <div className="form__section">

    <FormSectionTitle>Documents d'identité </FormSectionTitle>
    <div className="form__section-field">
      <label className="form__section-field-label">Au moins l'une de mes destinations se trouve : (plusieurs choix possible)</label>
      <CheckboxInput
        register={register}
        formField="region"
        handler={handleRegion}
        id="europe"
        required="Veuillez sélectionner une option."
        label="Dans l'union européenne"
      />  
      <CheckboxInput
        register={register}
        formField="region"
        handler={handleRegion}
        id="abroad"
        label="Hors union européenne"
        required="Veuillez sélectionner une option."
      />
      {errors.region && <p className='form__section-field-error form__section-field-error--open'>{errors.region.message}</p>}
      <p className='file-manager__message'>Il vous appartient de vérifier de la validité de votre document d'identité. Veuillez vous rendre sur <a target="_blank" href="https://www.diplomatie.gouv.fr/fr/" style={{textDecoration: 'underline'}}>France Diplomatie</a> pour vérifier les modalités d'entrée dans le.s pays de la mission.</p>
    </div>

    {region.indexOf('abroad') > -1 && (
      <>    
        <FormSectionTitle>Passport </FormSectionTitle>
        <div className="form__section-field">
          <CheckboxInput
            register={register}
            formField="savedPassport"
            handler={handlePassport}
            id="saved-rib-field"
            label="Utiliser le passeport enregistré dans mon profil"
          />
        </div>
        {!savedPassport && (
          <FileField 
            register={register}
            formField="passport"
            id="passport-field"
            error={errors.passport}
            setValue={setValue}
            fileName={filename}
          />
        )}
      </>
    )}
    {region.indexOf('europe') > -1 && (
      <>
        <FormSectionTitle>CNI </FormSectionTitle>

        <div className="form__section-field">
          <CheckboxInput
            register={register}
            formField="savedCni"
            handler={handleCni}
            id="saved-rib-field"
            label="Utiliser la carte d'identité enregistrée dans mon profil"
          />
        </div>
        {!savedCni && (
          <FileField 
            register={register}
            formField="cni"
            id="cni-field"
            error={errors.cni}
            setValue={setValue}
            fileName={cniFilename}
          />
        )}
      </>
    )}

  </div>

  );
}

IdDocuments.propTypes = {

};

export default IdDocuments;
