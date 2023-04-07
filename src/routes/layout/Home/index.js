
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './style.scss';

import HomepageTitle from './HomepageTitle';
import Modal from 'src/components/Modal';
import TitleH3 from 'src/components/TitleH3';


import { toggleModal } from 'src/reducer/app';
import { clearOMTarget } from 'src/reducer/omForm';

const Home = () => {
  
  const navigate = useNavigate();
  const { app: { isModalOpen},
    agent: { user, agent },
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

  const [newTarget, setNewTarget] = useState('');
  
  const handleClickOnNewDoc = (event) => {
    dispatch(toggleModal());
    setNewTarget(event.currentTarget.id);
  }

  const handleClickOnNewEf = () => {
    navigate(`/utilisateur/${user}/mes-états-de-frais`);
    // dispatch(toggleModal());
  }

  console.log(user);

  return (
    <div className="home">
      <HomepageTitle />
      <section className="home__new">
        <TitleH3>Nouveau document</TitleH3>
        <div className="home__new-buttons">
          <div id="ordre-de-mission" className="home__new-buttons-item" onClick={handleClickOnNewDoc}>
            <IoMdAddCircle
              className='home__new-buttons-item-image'
            />
            <p>Ordre de Mission</p>
          </div>
          {(user === 'mboone01' || user === 'nathalie') && (
            <div id="état-de-frais" className="home__new-buttons-item" onClick={handleClickOnNewEf}>
              <IoMdAddCircle
                className='home__new-buttons-item-image'
              />
              <p>État de Frais</p>
            </div>
          )}
        </div>
      </section>
      <div className={classNames("modal__background", {"modal__background--open": isModalOpen})} />
      {isModalOpen && <Modal target={newTarget.replace(/-/g, ' ')} user={user} agent={agent} />}

    </div>
  );
};

Home.propTypes = {

};

export default Home;
