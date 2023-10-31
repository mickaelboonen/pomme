import React from 'react';

import DateField from 'src/components/Fields/DateField';
import TextField from 'src/components/Fields/TextField';
import HiddenField from 'src/components/Fields/HiddenField';
import SelectField from 'src/components/Fields/SelectField';
import FormSectionTitle from 'src/components/FormSectionTitle';

import './style.scss';

const AddProgram = ({ register, errors, user }) => { 
  return (
      <>
        <div className="form__section">
          <FormSectionTitle>Ajouter un programme de transport</FormSectionTitle>
          <SelectField
            register={register}
            blankValue="Aucun secteur de programme sélectionné"
            data={["Ferroviaire", "Aérien"]}
            id="program-sector-field"
            formField="programSector"
            label="Secteur"
            handler={() => {}}
            errors={errors.sector}
          />
          <SelectField
            register={register}
            blankValue="Aucun type de programme sélectionné"
            data={["Abonnement", "Fidélité"]}
            id="program-type-field"
            formField="programType"
            label="Abonnement ou carte de fidélité"
            handler={() => {}}
            errors={errors.type}
          />
          <TextField
            id="card-number-field"
            label="Numéro de carte"
            formField="programNumber"
            register={register}
            error={errors.licensePlate}
            errors={errors.number}
          />
          <TextField
            id="program-name-field"
            label="Nom du programme"
            formField="programName"
            register={register}
            error={errors.rating}
            errors={errors.name}
          />
          <DateField
            id="expiration-date-field"
            type="date"
            label="Date d'expiration"
            formField="programExpiration"
            register={register}
            error={errors.expiration}
          />
          <HiddenField
            id="programUser"
            value={user}
            register={register}
          />
        </div>
      </>
  );
};

AddProgram.propTypes = {

};

export default AddProgram;
