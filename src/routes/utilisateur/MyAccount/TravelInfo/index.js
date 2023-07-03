import React from 'react';
import PropTypes from 'prop-types';


import PageTitle from 'src/components/PageTitle';
import SelectField from 'src/components/Fields/SelectField';
import FormSectionTitle from 'src/components/FormSectionTitle';
import {
  FaUserCircle, FaAt,
} from "react-icons/fa";

import './style.scss';
import FileManager from '../FileManager';
import { useSelector } from 'react-redux';

const TravelInfo = () => {
  const { agent : { user }} = useSelector((state) => state);
  const contacts =  [
    {
      id: 1,
      name: 'Yann Egea',
      phone: '46.44',
      icon: <FaUserCircle className='file-displayer__icon-container-icon' style={{filter: 'drop-shadow(1px 1px 1px #000)'}} />,
    },
    {
      id: 2,
      name: 'Sabine Tjollyn',
      phone: '45.82',
      icon: <FaUserCircle className='file-displayer__icon-container-icon' style={{filter: 'drop-shadow(1px 1px 1px #000)'}} />,
    },
    {
      id: 3,
      name: 'Delphine Brigliano',
      phone: '46.15',
      icon: <FaUserCircle className='file-displayer__icon-container-icon' style={{filter: 'drop-shadow(1px 1px 1px #000)'}} />,
    },
    {
      id: 4,
      name: 'financier.depenses@unimes.fr',
      phone: '',
      icon: <FaAt className='file-displayer__icon-container-icon' style={{filter: 'drop-shadow(1px 1px 1px #000)'}} />,
    },
  ]
  return (
    <main className="my-documents">
      <PageTitle>Mon Profil Voyageur</PageTitle>
      <div className='form'>
        <div className='form__section'>
          <FormSectionTitle>Abonnements & cartes de fidélité</FormSectionTitle>
          {/* <SelectField
            register={() => {}}
            blankValue="Aucun programme sélectionné"
            data={[]}
            id="program-field"
            formField="program"
            label=""
            handler={() => {}}
            required
          /> */}
          <FileManager
            icon={<FaUserCircle
              className='file-displayer__icon-container-icon'
            />}
            id="programs"
            label="Liste des cartes d'abonnement ou de fidélité"
            filename=""
            handler={null}
            user={user}
            needsSelect="programme"
            data={[]}
          />
        </div>
        <div className='form__section'>
          <FormSectionTitle>Mes contatcs</FormSectionTitle>
          <ul className='form__section-list'>
            {contacts.map((contact) => (
              <li className='form__section-list-item' key={contact.id}> {contact.icon} {contact.name} - {contact.phone}</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

TravelInfo.propTypes = {

};

export default TravelInfo;
