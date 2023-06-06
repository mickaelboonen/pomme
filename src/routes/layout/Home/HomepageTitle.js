import React from 'react';

import './style.scss';

const HomepageTitle = () => (
  <>
    {/* <div className="home__title" >
      <div className="home__title-group">
        <div className="home__title-group-capital">P</div>
        <div className="home__title-group-rest">réparer son </div>
      </div>
      <div className="home__title-group">
        <div className="home__title-group-capital">O</div>
        <div className="home__title-group-rest">rdre de </div>
      </div>
      <div className="home__title-group">
        <div className="home__title-group-capital">M</div>
        <div className="home__title-group-rest">ission </div>
      </div>
    </div> */}
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
