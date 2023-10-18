import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLoaderData, useLocation, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';

// Components
// import NewSection from './NewSection';
import Tabs from 'src/components/Tabs';
import PageTitle from 'src/components/PageTitle';

import { toggleModal } from 'src/reducer/app';
import { addNewOM, clearOMTarget, selectOmData} from 'src/reducer/omForm';
import { selectEfData, clearEfTarget } from 'src/reducer/ef';

import { selectDocumentsList } from 'src/reducer/agent';


import './style.scss';

import './style.scss';

const Presidence = () => {
  const handleClickOnNewOM = () => {

  }
  return (
  <main className="my-documents">
    <PageTitle>Menu de la Présidence</PageTitle>
    <div className="my-documents__button">
      <Link to="/presidence/nouvel-om-permanent">New</Link>
    </div>
  </main>
);
}

Presidence.propTypes = {

};

export default Presidence;
