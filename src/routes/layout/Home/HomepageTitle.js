import React from 'react';

import './style.scss';

const HomepageTitle = () => (
  <>
    <div className="home__title" >
      <p className="home__title-text">
        <span>P</span>réparer son <span> O</span>rdre de <span>M</span>ission
      </p>
    </div>
    <div className="home__title home__title--responsive" >
      <p className="home__title-text">
        <span>POM</span>
      </p>
    </div>
  </>
);

export default HomepageTitle;
