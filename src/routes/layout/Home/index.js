import React from 'react';
import PropTypes from 'prop-types';
import Plus from '../../../assets/images/add.svg';
import TitleH3 from '../../../components/TitleH3';
import { PDFViewer } from '@react-pdf/renderer';

import './style.scss';
import { Link } from 'react-router-dom';
import MyPDF from '../../../components/PDF';
import { useSelector } from 'react-redux';

const Home = () => {
  
  const { omForm } = useSelector((state) => state.omForm);
  return (
    <main className="home">
      <div className="home__title" >
        <div className="home__title-group"><div className="home__title-group-capital">P</div><div className="home__title-group-rest">réparer son </div></div>
        <div className="home__title-group"><div className="home__title-group-capital">O</div><div className="home__title-group-rest">rdre de </div></div>
        <div className="home__title-group"><div className="home__title-group-capital">M</div><div className="home__title-group-rest">ission </div></div>
      </div>
    <section className="home__new">
      <TitleH3>Nouveau document</TitleH3>
      <div className="home__new-buttons">
        <Link to="/nouveau-document/ordre-de-mission?etape=1">
          <div className="home__new-buttons-item">
            <img src={Plus} alt="" />
            <p>Ordre de Mission</p>
          </div>
        </Link>
        <Link to="/nouveau-document/état-de-frais?etape=1">
          <div className="home__new-buttons-item">
            <img src={Plus} alt="" />
            <p>État de Frais</p>
          </div>
        </Link>
      </div>
    </section>
    <section className="home__new" style={{height: '20rem'}}>
      {/* <PDFViewer>
        <MyPDF data={omForm[0].data} />
      </PDFViewer> */}
    </section>

    </main>
  );
};

Home.propTypes = {

};

export default Home;
