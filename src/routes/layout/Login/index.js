import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import HomepageTitle from 'src/routes/layout/Home/HomepageTitle';
import ApiResponse from 'src/components/ApiResponse';
import { validateAuthentication } from "src/reducer/agent";
import { setApiResponse, authenticate } from "src/reducer/app";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

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

  useEffect(() => {

    // console.log(document.cookie:);
    const cookies = document.cookie.split(';');
    const monCookie = cookies.find(cookie => cookie.trim().startsWith('user='));
    const realCookie = monCookie.slice(6)
    const decodedValue = decodeURIComponent(realCookie);
    console.log(decodedValue);
  //  console.log(JSON.parse(decodedValue));:
    
  }, [])
  
  const handleLogin = () => { 
    // dispatch(authenticate());
    return;
    cas
      .auth() 
        .then((response) => {
          console.log('SUCCESS CAS : ', response);
          dispatch(validateAuthentication(response))
        })
        .catch(response => {
          console.log('ERREUR CAS : ', response);
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
          }))
        });
  }
  
  
  return (
  <div className='home'>
    <HomepageTitle />
    <div className='home__login'>
      <p className='home__login-text'>Merci de vous identifier pour accéder à l'application.</p>
      {/* <button className='home__login-button' onClick={handleLogin} type="button">S'IDEN:TIFIER AVEC LE CAS</button> */}
      <a href="https://cas.unimes.fr/cas/login?TARGET=http://172.16.97.49:8000/api/casHandler">S'IDENTIFIER AVEC LE CAS</a>
      {apiMessage.response && <ApiResponse apiResponse={apiMessage} updateForm={false} />}
    </div>
  </div>
);}

Login.propTypes = {

};

export default Login;
