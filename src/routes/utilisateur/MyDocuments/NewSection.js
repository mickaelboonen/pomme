import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './style.scss';
import SelectField from 'src/components/Fields/SelectField';
import FormSectionTitle from 'src/components/FormSectionTitle';

import { displayOmStatus } from 'src/reducer/omForm';

const Section = ({ id, data, steps, currentDoc}) => {
  
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(displayOmStatus(event.target.value));
  }

  return (
    <section id={id} className="my-documents__files">
      <SelectField
        data={data}
        register={() => {}}
        handler={handleChange}
        formField="select-input"
        id="list"
        label={`Liste des Ordres de Missions`}
        blankValue="Aucun document sélectionné"
      />
      {currentDoc.hasOwnProperty('id') && (
        <div className='om-status'>
          <FormSectionTitle>Statut des différentes étapes</FormSectionTitle>
          <div className='om-status__steps'>
            {steps.map((step) => (
              <div key={step.name} className={classNames("om-status__steps-step", {
                "om-status__steps-step--validated" : step.status === 1,
                "om-status__steps-step--not-validated" : step.status === 0,
              })}>
                {step.name}
              </div>
            ))}
          </div>
          <div className='om-status__message'>
          <FormSectionTitle>Réserves ou commentaires du Gestionnaire</FormSectionTitle>
            Attention, vous avez fait des erreurs sur tel champs et / ou tel champ
          </div>
        </div>
      )}
      {currentDoc.hasOwnProperty('id') && (
        <div className="my-documents__files-buttons">
          <Link to="/modifier-un-document/ordre-de-mission?etape=1&id=70">
            Reprendre / Modifier
          </Link>

          <Link to="/modifier-un-document/ordre-de-mission?etape=1&id=70">
            Faire une demande de déplacement
          </Link>

          <Link to="/modifier-un-document/ordre-de-mission?etape=1&id=70">
            Prendre connaissance du refus et supprimer
          </Link>

        </div>
      )}
    </section>
  );
};

Section.propTypes = {

};

export default Section;
