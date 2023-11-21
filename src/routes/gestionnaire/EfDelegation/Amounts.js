import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { Link, useLoaderData } from 'react-router-dom';
import { FaEye, FaDownload, FaEyeSlash } from 'react-icons/fa';
import { BlobProvider, Document, PDFViewer } from '@react-pdf/renderer';
import { floatAddition, floatMultiplication, OTHER_MEALS_AMOUNT, ADMIN_MEALS_AMOUNT} from 'src/selectors/mathFunctions';

import '../style.scss';

// Components
import TextareaField from 'src/components/Fields/TextareaField';
import InputValueDisplayer from 'src/routes/gestionnaire/DocValidation/InputValueDisplayer';
import FileField from 'src/components/Fields/FileField';
import CheckboxInput from 'src/components/Fields/CheckboxInput';
import FormSectionTitle from 'src/components/FormSectionTitle';
import RadioInput from 'src/components/Fields/RadioInput';
import HiddenField from 'src/components/Fields/HiddenField';
import { useDispatch, useSelector } from 'react-redux';
import ValidationMonitoringPdf from 'src/components/PDF/ValidationMonitoringPdf';
import EfPdf from 'src/components/PDF/EfPdf';
import OmAdvancePdf from 'src/components/PDF/OmAdvancePdf';

import { setValidationDate, setExistingValidationDate} from 'src/selectors/pdfFunctions';
import VisaComponent from 'src/components/VisaComponent';

// Actions
import { getSavedFileName } from 'src/selectors/formDataGetters';
import {  addEfMonitoringPdf,addOmMonitoringPdf } from 'src/reducer/omManager';
import { getDDMMYYDate } from '../../../selectors/dateFunctions';
import { floatSubtraction } from '../../../selectors/mathFunctions';


const Amounts = ({ef}) => {


  const { transports, accomodations } = ef;
  const { advance } = ef.om;
    

  let transportsFields = Object.entries(transports).filter((transport) => (!transport[0].includes('_files') && transport[0] !== 'km' && transport[0] !== 'horsepower' ) && transport[1]);
  transportsFields = transportsFields.filter((transport) => transport[0] !== 'id' && transport[0] !== 'status');

  const transportsAmountsArray = transportsFields.map((t) => t[1]);
  // console.log(transportsAmountsArray);
  const totalTransportsExpenses = floatAddition(transportsAmountsArray);


  const adminMealsAmount = floatMultiplication(accomodations.meals_in_admin_restaurants, ADMIN_MEALS_AMOUNT);
  const frenchMeals = floatMultiplication(accomodations.meals_paid_by_agent_in_france, OTHER_MEALS_AMOUNT);
  const overseasMeals = floatMultiplication(accomodations.meals_paid_by_agent_overseas, OTHER_MEALS_AMOUNT);


  
  const totalMeals = floatAddition([adminMealsAmount, frenchMeals, overseasMeals]);
  const othersExpensesAmount = floatAddition([transports.visa ?? 0, accomodations.event ?? 0]);

  const totalAmount = floatAddition([totalMeals, othersExpensesAmount, totalTransportsExpenses, accomodations.hotel ?? 0]);
  const totalMinusAdvance = floatSubtraction([totalAmount, advance.advance_amount]);

  return (
  <div className="form__section">
    <FormSectionTitle>TOTAUX DE LA MISSION</FormSectionTitle>

    <div className='form__section form__section--documents'>
        <div className='form__section-half'>
          <InputValueDisplayer
            label="Montant total repas"
            value={totalMeals + ' euros'}
          />
        </div>
        <div className='form__section-half'>
          <InputValueDisplayer
            label="Montant total nuités"
            value={accomodations.hotel + ' euros'}
          />
        </div>
      </div>
      <div className='form__section form__section--documents'>
        <div className='form__section-half'>
          <InputValueDisplayer
            label="Montant total transports"
            value={totalTransportsExpenses + ' euros'}
          />
        </div>
        <div className='form__section-half'>
          <InputValueDisplayer
            label="Total autres"
            value={othersExpensesAmount + ' euros'}
          />
        </div>
      </div>
      <div className="form__section-field">
        {advance.advance && (
          <InputValueDisplayer
            label="RAPPEL : Avance accordée au missionnaire"
            value={advance.advance_amount + ' euros'}
          />
        )}
        {advance.advance && (
          <InputValueDisplayer
            label="Montant total généré en chiffres, avance déduite"
            value={totalMinusAdvance + ' euros'}
          />
        )}
        {!advance.advance && (
          <InputValueDisplayer
            label="Montant total généré en chiffres"
            value={totalAmount + ' euros'}
          />
        )}
    </div>

  </div>
);}

Amounts.propTypes = {

};

export default Amounts;
