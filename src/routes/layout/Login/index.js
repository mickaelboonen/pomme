import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import HomepageTitle from 'src/routes/layout/Home/HomepageTitle';
import ApiResponse from 'src/components/ApiResponse';
import { validateAuthentication, checkAuthentication } from "src/reducer/agent";
import { setApiResponse, authenticate } from "src/reducer/app";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import RotatingLoader from '../../../components/Loaders/RotatingLoader';

const Login = ({ cas }) => {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { agent: { isAuthenticated }, app : { apiMessage } } = useSelector((state) => state);
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated])
  
  
  const handleLogin = () => { 
    sessionStorage.removeItem('logout-reason');
    const loaderElement = document.querySelector('.rotating-loader');
    document.querySelector('.home__login-button-text').textContent = '';
    loaderElement.classList.add('rotating-loader--loading');
    cas
      .auth() 
        .then((response) => {
          sessionStorage.removeItem('logout-reason');
          dispatch(checkAuthentication({username : response.user, password: 'fsdf'}))
        })
        .catch((response) => {
          console.log(response);
          dispatch(setApiResponse({
            response : {
              status: 500,
              statusText: response.type,
              data: {
                detail: '',
                trace: []
              }
            },
            // message: response.message,
          }))}
        )
        .finally(() => {
          // TODO : a mettre dans le success
        if (process.env.NODE_ENV === 'development') {

          sessionStorage.removeItem('logout-reason');
          dispatch(checkAuthentication({username : 'mboone01', password: 'fsdf'}))
        }
        });
  }

  return (
  <div className='home'>
    <HomepageTitle />
    <div className='home__login'>
      <p className='home__login-text'>{sessionStorage.getItem('logout-reason') ?? "Merci de vous identifier pour accéder à l'application."}</p>
      <button className='home__login-button' onClick={handleLogin} type="button">
        {/* <div className='home__login-button-loader home__login-button-loader--loading'></div> */}
        <RotatingLoader />
        <span className='home__login-button-text'>S'IDENTIFIER</span>
      </button>
      {/* {apiMessage.response && <ApiResponse apiResponse={apiMessage} updateForm={false} />} */}
    </div>
  </div>
);}

Login.propTypes = {

};

export default Login;
