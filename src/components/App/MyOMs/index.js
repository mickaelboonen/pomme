import React from 'react';
import PropTypes from 'prop-types';
import File from '../../../assets/images/file.svg';

import './style.scss';

const MyOMs = () => (
  <div>
    <h2>Ordres de Mission de {'USERNAME'}</h2>
    <button type='button'>NOUVEAU</button>
    <section className="home__new">
      <h3 className="home__new-title">En cours</h3>
      <div className="home__new-buttons">
        <div className="home__new-buttons-item">
          <img src={File} alt="" />
          <p>Ordre de Mission</p>
        </div>
        <div className="home__new-buttons-item">
          <img src={File} alt="" />
          <p>Ordre de Mission</p>
        </div>
      </div>
    </section>
    <section className="home__new">
      <h3 className="home__new-title">Validés</h3>
      <div className="home__new-buttons">
        <div className="home__new-buttons-item">
          <img src={File} alt="" />
          <p>Ordre de Mission</p>
        </div>
        <div className="home__new-buttons-item">
          <img src={File} alt="" />
          <p>Ordre de Mission</p>
        </div>
      </div>
    </section>
  </div>
);

MyOMs.propTypes = {

};

export default MyOMs;
