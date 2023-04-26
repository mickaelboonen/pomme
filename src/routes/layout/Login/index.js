import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import HomepageTitle from 'src/routes/layout/Home/HomepageTitle';
import ApiResponse from 'src/components/ApiResponse';
import { validateAuthentication, checkAuthentication } from "src/reducer/agent";
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
  
  
  const handleLogin = () => { 
    cas
      .auth() 
        .then((response) => {
          console.log('SUCCESS CAS : ', response);
          sessionStorage.removeItem('logout-reason');
          dispatch(validateAuthentication(response))
        })
        .catch(response => 
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
        )
        .finally(() => {
          // TODO : a mettre dans le success
          sessionStorage.removeItem('logout-reason');
          dispatch(checkAuthentication({username : 'mboone01', password: 'fsdf'}))
          // dispatch(getAgentData({username : 'sdgsdfdgdsgsd', password: ''}))
        });
  }

  return (
  <div className='home'>
    <HomepageTitle />
    <div className='home__login'>
      <p className='home__login-text'>{sessionStorage.getItem('logout-reason') ?? "Merci de vous identifier pour accéder à l'application."}</p>
      <button className='home__login-button' onClick={handleLogin} type="button">S'IDENTIFIER</button>
      {/* {apiMessage.response && <ApiResponse apiResponse={apiMessage} updateForm={false} />} */}
    </div>
  </div>
);}

Login.propTypes = {

};

export default Login;
