import { useEffect } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import Header from './Header';
import { Outlet, useLoaderData } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { validateAuthentication } from "src/reducer/app";

const Layout = ({ cas }) => {
  const theme = localStorage.getItem('theme');
  const colorTheme = localStorage.getItem('color-theme');

  const devHost = '10.30.20.87:8080'
  // const devHost = '192.168.1.53:8080'
  const { host } = useLoaderData();

  
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.app);    

  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector(':root').classList.add('dark');
    }
    if (colorTheme !== '') {
      document.documentElement.style = colorTheme;
    }
  }, [])

  console.log(process.env.NODE_ENV);

  // useEffect(() => {
  //   if (isAuthenticated === false) {
  //     console.log('i wanna log in with cas');
  //     cas
  //     .auth() 
  //       .then((response) => {
  //         dispatch(validateAuthentication(response))
  //       })
  //       .catch(response => {
  //         console.log('ERREUR CAS : ', response);
  //       });
  //   }
  // }, [isAuthenticated])

  return (
    <div>
      <Header cas={cas} />
      {!isAuthenticated && (
        <main id="main">
          NOOOOOOOOO
        </main>
      )}
      {(isAuthenticated || devHost === host) && (
        <main id="main">
          <Outlet />
        </main>
      )}
    </div>
  );
};

Layout.propTypes = {

};

export default Layout;
