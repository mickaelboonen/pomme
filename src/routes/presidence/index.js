import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLoaderData, useLocation, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { FaCar } from "react-icons/fa";
// Components
// import NewSection from './NewSection';
import SelectField from 'src/components/Fields/SelectField';
import PageTitle from 'src/components/PageTitle';
import FormSectionTitle from 'src/components/FormSectionTitle';
import FileManager from 'src/routes/utilisateur/MyAccount/FileManager';


import { fetchPresidencyVehicles } from 'src/reducer/presidency';

// Components
// import NewSection from './NewSection';

import { toggleModal } from 'src/reducer/app';
import { addNewOM, clearOMTarget, selectOmData} from 'src/reducer/omForm';
import { selectEfData, clearEfTarget } from 'src/reducer/ef';

import { selectDocumentsList } from 'src/reducer/agent';


import './style.scss';

// import './style.scss';

const Presidence = () => {
  const dispatch = useDispatch();

  const {
    register,
    setValue,
    watch,
    setError,
    handleSubmit,
    formState:
      { errors }
  } = useForm();

  // const member = watch('member');
  const handleChange = (event) => {
    // console.log(event.target.value);
    setIsMemberSelected(event.target.value);
  
    if (event.target.value !== '') {
   // console.log('want cars');
      dispatch(fetchPresidencyVehicles({agent: event.target.value}))
    }
}

  const [isMemberSelected, setIsMemberSelected] = useState('');


// con:sole.log(member);
  const { presidency: { loader, presidencyUsers, presidencyVehicles }} = useSelector((state) => state);

  return (
  <main className="my-documents">
    <PageTitle>Menu de la Présidence</PageTitle>
    <div className='form'>
    <div className='form__section'>
      <FormSectionTitle>Créer un nouvel ordre de mission permanent</FormSectionTitle>
      <div className="form__section-field-buttons"  style={{margin: '1rem'}}>
        <div className="form__section-field-buttons__row">
          <Link to={`/${encodeURIComponent('présidence')}/nouvel-om-permanent`}>Nouveau document</Link>
        </div>
      </div>
    </div>
    <div className='form__section'>
        <FormSectionTitle>Gérer les véhicules de la Présidence</FormSectionTitle>
        <SelectField
          register={register}
          blankValue="Choisissez"
          id="member-field"
          formField="member"
          label="Sélectionner un agent de la Présidence"
          handler={handleChange}
          required="Choisissez"
          data={presidencyUsers}
        />
      </div>
      {isMemberSelected && (
        <div className='form__section'>
          <FileManager
            icon={<FaCar
              className='file-displayer__icon-container-icon'
            />}
            id="cars"
            label={"Les véhicules enregistrés de "+ presidencyUsers.find((user) => user.id === isMemberSelected). name}
            filename=""
            handler={null}
            user={isMemberSelected}
            needsSelect="véhicule"
            data={presidencyVehicles}
            forPresidency
          />
        </div>
      )}
    </div>
  </main>
);
}

Presidence.propTypes = {

};

export default Presidence;
