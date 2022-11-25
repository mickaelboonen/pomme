import React from 'react';
import PropTypes from 'prop-types';
import PageTitle from 'src/components/PageTitle';
import DataList from './DataList';
import { Link } from 'react-router-dom';

import './style.scss';


const DAFC = ({ title }) => (
  <main className='dafc'>
    <PageTitle>{title}</PageTitle>
    {title === 'États de frais à valider' && <DataList data={['1', '2', '3', '4']} title={title} isEf />}
    {title === 'Ordres de mission à contrôler' && <DataList data={['1', '2', '3', '4']} title={title} /> }    
    <Link to="/" className="form-page__container-link">Accueil</Link>
  </main>
);

DAFC.propTypes = {
  title: PropTypes.string.isRequired,
};

export default DAFC;
