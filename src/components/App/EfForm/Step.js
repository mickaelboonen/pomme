import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import SelectField from 'src/components/Fields/SelectField';
import DateField from 'src/components/Fields/DateField';
import TextField from 'src/components/Fields/TextField';

const Step = ({ register }) => {
  return (
  <div className='step'>
    <h4 className='step__title'>Etape</h4>
    <div className='step__container'>
      <div className='step__container-date-place'>
        <p className='step__container-date-place-title'>Date et Lieu</p>
        <DateField 
          register={register}
          id="departure-date-field"
          label="Départ"
          type="date"
          formField="departure-date"
        />
        <DateField 
          register={register}
          id="arrival-date-field"
          label="Arrivée"
          type="date"
          formField="arrival-date"
        />
        <SelectField
          register={register}
          // blankValue
          data={['1' ,'2', '3', '4']}
          id="a"
          formField="a"
          label="Commune :"
        />

      </div>
      <div className='step__container-classes'>
        <p className='step__container-classes-title'>Cours</p>
        <table className='classes'>
          <thead>
            <tr>
              <th></th>
              <th>Début :</th>
              <th>Fin :</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Matin :</td>
              <td>
                <TextField
                  register={register}
                  id="a"
                  formField='a'
                  label=''
                  min='7'
                  max="12"
                  isNumber
                />
              </td>
              <td>
                <TextField
                  register={register}
                  id="a"
                  formField='a'
                  label=''
                  min='8'
                  max="12"
                  isNumber
                /></td>
            </tr>
            <tr>
              <td>Après-midi :</td>
              <td>
                <TextField
                  register={register}
                  id="a"
                  formField='a'
                  label=''
                  min='12'
                  max="20"
                  isNumber
                /></td>
              <td>
                <TextField
                  register={register}
                  id="a"
                  formField='a'
                  label=''
                  min='12'
                  max="20"
                  isNumber
                /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);}

Step.propTypes = {

};

export default Step;
