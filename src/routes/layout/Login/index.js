import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import HomepageTitle from 'src/routes/layout/Home/HomepageTitle';
import { validateAuthentication } from "src/reducer/agent";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = ( cas ) => {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.agent);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated])
  
  const handleLogin = () => {  
    cas.cas
      .auth() 
        .then((response) => {
          console.log('SUCCESS CAS : ', response);
          dispatch(validateAuthentication(response))
        })
        .catch(response => {
          console.log('ERREUR CAS : ', response);
        });
  }

  // useEffect(() => {
  //   if (location.search.includes('status=inprocess')) {
  //     cas.cas
  //     .auth() 
  //       .then((response) => {
  //         dispatch(validateAuthentication(response))
  //       })
  //       .catch(response => {
  //         console.log('ERREUR CAS : ', response);
  //       });
  //   }
  // }, []);
  
  return (
  <div className='home'>
    <HomepageTitle />
    <div className='home__login'>
      <p className='home__login-text'>Merci de vous identifier pour accéder à l'application.</p>
      <button className='home__login-button' onClick={handleLogin} type="button">S'IDENTIFIER AVEC LE CAS</button>
    </div>
  </div>
);}

Login.propTypes = {

};

export default Login;
