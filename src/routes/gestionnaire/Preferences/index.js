import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

// Components
import PageTitle from 'src/components/PageTitle';
import SelectField from 'src/components/Fields/SelectField';
import ButtonElement from 'src/components/Fields/ButtonElement';
import FormSectionTitle from 'src/components/FormSectionTitle';

// Action
import { updateAgentPreferences } from 'src/reducer/agent';

const Preferences = () => {
  
  const dispatch = useDispatch();
  const { agentPreferences } = useSelector((state) => state.agent);
  
  const {
    register,
    handleSubmit
  } = useForm({
    defaultValues: {
      efPreference: agentPreferences.efPreference ? 'Oui' : 'Non',
      omPreference: agentPreferences.omPreference ? 'Oui' : 'Non',
      cptLogin: agentPreferences.cptLogin
    }
  });

  const onSubmit = (data) => {
    
    data.efPreference = data.efPreference === 'Oui' ? true : false;
    data.omPreference = data.omPreference === 'Oui' ? true : false;
    dispatch(updateAgentPreferences(data));
  }
  return (

    <div className='my-preferences'>
      <PageTitle>Mes préférences</PageTitle>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <FormSectionTitle>Notifications Email</FormSectionTitle>
        <SelectField 
          register={register}
          data={['Oui', 'Non']}
          id='om-notification-field'
          formField='omPreference'
          handler={() => {}}
          label="Me prévenir par mail lorqu'un ordre de mission requiert mon attention"
        />
        <SelectField 
          register={register}
          data={['Oui', 'Non']}
          id='ef-notification-field'
          formField='efPreference'
          handler={() => {}}
          label="Me prévenir par mail lorqu'un état de frais requiert mon attention"
        />
        <div className='form__section'>
          <div className='form__section-field-buttons form__section-field-buttons--solo'>
            <ButtonElement
              type="submit"
              label="Valider les préférences"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Preferences;
