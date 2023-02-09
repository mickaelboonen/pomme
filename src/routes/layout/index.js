import { useEffect } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { validateAuthentication } from "src/reducer/app";

const Layout = ({ cas }) => {
  const theme = localStorage.getItem('theme');
  const colorTheme = localStorage.getItem('color-theme');

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

  useEffect(() => {
    if (isAuthenticated === false) {
      console.log('i wanna log in with cas');
      cas
      .auth() 
        .then((response) => {
          dispatch(validateAuthentication(response))
        })
        .catch(response => {
          console.log('ERREUR CAS : ', response);
        });
    }
  }, [isAuthenticated])

  return (
    <div>
      <Header cas={cas} />
      {!isAuthenticated && (
        <main id="main">
          NOOOOOOOOO
        </main>
      )}
      {!isAuthenticated && (
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
