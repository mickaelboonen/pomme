import React from 'react';
import PropTypes from 'prop-types';
import Plus from '../../../assets/images/add.svg';
import TitleH3 from '../../generics/TitleH3';

import './style.scss';

const Home = () => {
  return (
    <main className="home">
      {/* <h1 className="home__title">
        POMME
        <span>P</span><span className="hidden-title">réparer son </span>
        <span>O</span><span className="hidden-title">rdre de </span>
        <span>M</span><span className="hidden-title">ission </span>
        <span>M</span><span className="hidden-title">ême </span>
        <span>E</span><span className="hidden-title">ndormi</span>
      </h1> */}
    <section className="home__new">
      <TitleH3 title="Nouveau document" />
      <div className="home__new-buttons">
        <div className="home__new-buttons-item">
          <img src={Plus} alt="" />
          <p>Ordre de Mission</p>
        </div>
        <div className="home__new-buttons-item">
          <img src={Plus} alt="" />
          <p>Ordre de Mission</p>
        </div>
      </div>
    </section>
    <section className="home__new">
      <TitleH3 title="A signer" />
      <div className="home__new-buttons">
        Test
      </div>
    </section>

    </main>
  );
};

Home.propTypes = {

};

export default Home;
