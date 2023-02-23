import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { PDFViewer } from '@react-pdf/renderer';

import './style.scss';
import MyPDF from 'src/components/PDF';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'src/components/Modal';
import { toggleModal } from 'src/reducer/app';
import { clearOMTarget } from 'src/reducer/omForm';
import { useNavigate } from 'react-router-dom';
import HomepageTitle from 'src/routes/layout/Home/HomepageTitle';

import './style.scss';

const TestPDF = () =>   {
  const navigate = useNavigate();
  const { app: { isModalOpen, user, isAuthenticated, agent},
    omForm: { nextOMTarget, omForm, currentOM},
    vehicle: { vehicleTypes },
  } = useSelector((state) => state);

  useEffect(() => {
    if (nextOMTarget !== '') {
      dispatch(toggleModal());
      dispatch(clearOMTarget());
      navigate(nextOMTarget);
    }
  }, [nextOMTarget])

  const dispatch = useDispatch();

  const [newTarget, setNewTarget] = useState('');


  return (
    <div className="home">
      <HomepageTitle />
      <section className="home__new" style={{height: '40rem'}}>
        <PDFViewer width="100%" height="100%">
          <MyPDF data={omForm} agent={agent} om={currentOM} vehicleTypes={vehicleTypes} />
        </PDFViewer>
      </section>
      <div className={classNames("modal__background", {"modal__background--open": isModalOpen})} />
      {isModalOpen && <Modal target={newTarget.replace(/-/g, ' ')} user={user} />}

    </div>
  );
}

TestPDF.propTypes = {

};

export default TestPDF;
