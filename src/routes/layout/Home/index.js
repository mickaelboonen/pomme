import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import TitleH3 from '../../../components/TitleH3';
import { PDFViewer } from '@react-pdf/renderer';
import { IoMdAddCircle, FaSun, FaMoon } from "react-icons/io";

import './style.scss';
import MyPDF from '../../../components/PDF';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'src/components/Modal';
import { toggleModal } from 'src/reducer/app';

const Home = () => {
  
  const { app: { isModalOpen, user} } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [newTarget, setNewTarget] = useState('');
  const handleClickOnNewOM = (event) => {
    dispatch(toggleModal())
    setNewTarget(event.currentTarget.id)
  }

  return (
    <div className="home">
      <div className="home__title" >
        <div className="home__title-group"><div className="home__title-group-capital">P</div><div className="home__title-group-rest">réparer son </div></div>
        <div className="home__title-group"><div className="home__title-group-capital">O</div><div className="home__title-group-rest">rdre de </div></div>
        <div className="home__title-group"><div className="home__title-group-capital">M</div><div className="home__title-group-rest">ission </div></div>

      </div>
    <section className="home__new">
      <TitleH3>Nouveau document</TitleH3>
      <div className="home__new-buttons">
        <div id="ordre-de-mission" className="home__new-buttons-item" onClick={handleClickOnNewOM}>
          <IoMdAddCircle
            className='home__new-buttons-item-image'
          />
          <p>Ordre de Mission</p>
        </div>
        <div id="état-de-frais" className="home__new-buttons-item" onClick={handleClickOnNewOM}>
          <IoMdAddCircle
            className='home__new-buttons-item-image'
          />
          <p>État de Frais</p>
        </div>
      </div>
    </section>
    <section className="home__new" style={{height: '20rem'}}>
      {/* <PDFViewer>
        <MyPDF data={omForm[0].data} />
      </PDFViewer> */}
    </section>
    <div className={classNames("modal__background", {"modal__background--open": isModalOpen})} />
    {isModalOpen && <Modal target={newTarget.replace(/-/g, ' ')} user={user} />}


    </div>
  );
};

Home.propTypes = {

};

export default Home;
