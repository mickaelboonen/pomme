import React from 'react';
import TextField from '../OMForm/Fields/TextField';
import SwitchButton from '../../generics/SwitchButton';
import PropTypes from 'prop-types';

import './style.scss';

const TicketRequestSection = ( {register, mode, ticketClass}) => (
  <div className="split-fields">
    <div className="split-fields__half">
      <h4>DÉPART</h4>
      <div className="form__section-field">
        <TextField
          id="departure"
          label={`${mode} de départ`}
          formField="departure-input"
          register={register}
        />
        <TextField
          id="arrival"
          label={`${mode} d'arrivée`}
          formField="arrival-input"
          register={register}
        />
        <div className="split-fields__half-field">
          <label className="form__section-field-label" htmlFor="departure" style={{'textAlign': 'left', 'display': 'block'}}>Date et Heure du Billet</label>
          <input className="split-fields__half-field-input" type="datetime-local" id="departure-datetime" {...register('departure')} />
        </div>
        <SwitchButton
          register={register}
          isInForm
          formField="class-input"
          label={ticketClass}
        />
      </div>
    </div>
    <div className="split-fields__half">
      <h4>RETOUR</h4>
      <div className="form__section-field">
        <TextField
          id="departure"
          label={`${mode} de départ`}
          formField="departure-input"
          register={register}
        />
        <TextField
          id="arrival"
          label={`${mode} d'arrivée`}
          formField="arrival-input"
          register={register}
        />
        <div className="split-fields__half-field">
          <label className="form__section-field-label" htmlFor="departure" style={{'textAlign': 'left', 'display': 'block'}}>Date et Heure du Billet</label>
          <input className="split-fields__half-field-input" type="datetime-local" id="return-datetime" {...register('departure')} />
        </div>
        <SwitchButton
          register={register}
          isInForm
          formField="class-input"
          label={ticketClass}
        />
      </div>
    </div>
  </div>
);

TicketRequestSection.propTypes = {

};

export default TicketRequestSection;
