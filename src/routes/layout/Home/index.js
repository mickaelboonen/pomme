
// import classNames from 'classnames';
import PropTypes from 'prop-types';
import { IoMdAddCircle } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './style.scss';

import HomepageTitle from './HomepageTitle';
// import Modal from 'src/components/Modal';
import TitleH3 from 'src/components/TitleH3';


import { toggleModal } from 'src/reducer/app';
import { clearOMTarget } from 'src/reducer/omForm';
import VideoPlayer from 'src/components/VideoPlayer';
// import Rules from 'src/components/Rules';
import Presentation from 'src/assets/video/presentation-pom.mp4';

const Home = () => {
  
  const navigate = useNavigate();
  const { app: { isModalOpen, apiMessage },
    agent: { user, agent, loader },
    omForm: { nextOMTarget },
  } = useSelector((state) => state);
  
  useEffect(() => {
    if (nextOMTarget !== '') {
      dispatch(toggleModal());
      dispatch(clearOMTarget());
      navigate(nextOMTarget);
    }
  }, [nextOMTarget])

  const dispatch = useDispatch();
    
  // const [newTarget, setNewTarget] = useState('');
  
  const handleClickOnNewDoc = () => {
    navigate(`/utilisateur/${user}/mes-ordres-de-mission`);
  }

  const handleClickOnNewEf = () => {
    navigate(`/utilisateur/${user}/${encodeURIComponent('mes-états-de-frais')}`);
  }
  
  return (
    <div className="home">
      <HomepageTitle />
      <VideoPlayer link={Presentation} />
      <section className="home__new">
        <div className='form__section-container' id={'id'} style={{width: '50%', margin: 'auto', padding: '1rem'}}>
          <h4 className="form__section-container-title" id={'id' + '-title'}>
            Fermeture de POM
          </h4>
          <div style={{padding: '1rem', textAlign: 'justify'}}>
            <p style={{marginBottom: '1rem'}}>POM est momentannément fermé afin de continuer le développement de l'application et de vous garantir une expérience optimisée. Votre Profil et les Ordres de Mission que vous avez déjà créés restent toutefois disponibles sur l'application.</p>
            <p style={{marginBottom: '1rem'}}>Vous pouvez retrouver tous les documents PDF nécessaires aux Ordres de Mission sur la page <Link style={{fontWeight: 'bold', }} to='/assistance'>assistance</Link>, onglet "LES ANCIENS PDFS". </p>
            <p style={{marginBottom: '1rem'}}>Nous vous préviendrons par email lorsque l'application sera de nouveau disponible et nous vous prions de bien vouloir nous excuser pour la gêne occasionnée. Merci pour votre compréhension.</p>
            <p style={{marginBottom: '1rem'}}>A bientôt sur POM. </p>
          </div>
        </div>
      </section>
      {(user === 'mboone01' || user === 'nathalie') && (
        <section className="home__new">
          <TitleH3>Nouveau document</TitleH3>
          <div className="home__new-buttons">
            <div id="ordre-de-mission" className="home__new-buttons-item" onClick={handleClickOnNewDoc}>
              <IoMdAddCircle
                className='home__new-buttons-item-image'
              />
              <p>Ordre de mission</p>
            </div>
            <div id="état-de-frais" className="home__new-buttons-item" onClick={handleClickOnNewEf}>
              <IoMdAddCircle
                className='home__new-buttons-item-image'
              />
              <p>État de frais</p>
            </div>
          </div>
        </section>
      )}
      {/* <div className={classNames("modal__background", {"modal__background--open": isModalOpen})} /> */}
      {/* {isModalOpen && <Modal target={newTarget.replace(/-/g, ' ')} user={user} agent={agent} loader={loader} apiMessage={apiMessage} />} */}

    </div>
  );
};

Home.propTypes = {

};

export default Home;
