import React from 'react';
import PropTypes from 'prop-types';

import '../style.scss';


import HomepageTitle from '../Home/HomepageTitle';

const Maintenance = () => (
  <div className="home">
    <HomepageTitle />
    <div className='form'>
      <p className='form__text' style={{marginBottom: '2rem'}}>
        POM est actuellement en maintenance et devrait revenir d'ici quelques heures. Désolé pour la gêne occasionnée. 
      </p>
    </div>
  </div>
);

Maintenance.propTypes = {

};

export default Maintenance;
