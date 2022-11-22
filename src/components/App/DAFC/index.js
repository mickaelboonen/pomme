import React from 'react';
import PropTypes from 'prop-types';
import PageTitle from '../../generics/PageTitle';

import './style.scss';
import { useLocation } from 'react-router-dom';
import { setDafcTitle } from '../../../selectors/dafcFunctions';
import FormSectionTitle from '../../generics/FormSectionTitle';
import SelectField from '../OMForm/Fields/SelectField';
import ButtonElement from '../OMForm/Fields/ButtonElement';
import DataList from './DataList';

import Logo from '../../../assets/images/pdf.svg';
import EfControl from './EfControl';
import EfValidation from './EfValidation';
import OmToGFC from './OmToGFC';
const DAFC = () => {
  const location = useLocation();
  const pathnameArray = location.pathname.split('/');
  const title = setDafcTitle(pathnameArray);
  
  return (
    <main className='dafc'>
      <PageTitle>{title}</PageTitle>
      <DataList data={['1', '2', '3', '4']} title="États de frais à valider" isEf />
      <DataList data={['1', '2', '3', '4']} title="Ordres de mission" />
      <EfControl />
      <EfValidation />
      <OmToGFC />
      
    </main>
  );
};

DAFC.propTypes = {

};

export default DAFC;
