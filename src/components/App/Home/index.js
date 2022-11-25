import React from 'react';
import PropTypes from 'prop-types';
import Plus from '../../../assets/images/add.svg';
import TitleH3 from '../../generics/TitleH3';

import './style.scss';
import { Link } from 'react-router-dom';

const Home = () => {
  
  return (
    <main className="home">
      <div className="home__title" >
        <div className="home__title-group"><div className="home__title-group-capital">P</div><div className="home__title-group-rest">réparer son </div></div>
        <div className="home__title-group"><div className="home__title-group-capital">O</div><div className="home__title-group-rest">rdre de </div></div>
        <div className="home__title-group"><div className="home__title-group-capital">M</div><div className="home__title-group-rest">ission </div></div>
        {/* <div className="home__title-group"><div className="home__title-group-capital">M</div><div className="home__title-group-rest">ême </div></div>
        <div className="home__title-group"><div className="home__title-group-capital">E</div><div className="home__title-group-rest">ndormi</div></div> */}
      </div>
    <section className="home__new">
      <TitleH3>Nouveau document</TitleH3>
      <div className="home__new-buttons">
        <Link to="/documents/ordre-de-mission/nouveau?etape=1">
          <div className="home__new-buttons-item">
            <img src={Plus} alt="" />
            <p>Ordre de Mission</p>
          </div>
        </Link>
        <div className="home__new-buttons-item">
          <img src={Plus} alt="" />
          <p>État de Frais</p>
        </div>
      </div>
    </section>
    <section className="home__new">
      <TitleH3>A signer</TitleH3>
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
