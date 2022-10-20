import React from 'react';
import PropTypes from 'prop-types';
import Plus from '../../../assets/images/add.svg';

import './style.scss';

const Home = () => {
  return (
    <main className="home">
      <h1 className="home__title">P<span>réparer son </span>O<span>rdre de </span>M<span>ission </span>M<span>ême </span>E<span>ndormi</span></h1>
    <section className="home__new">
      <h2 className="home__new-title">Nouveau document</h2>
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
      <h2 className="home__new-title">A signer</h2>
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
