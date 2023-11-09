import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Header from 'src/routes/layout/Header';
import PageTitle from 'src/components/PageTitle';

import './style.scss';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

const Error = () => {
  const theme = localStorage.getItem('theme');
  const colorTheme = localStorage.getItem('color-theme');

  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector(':root').classList.add('dark');
      const headerButton = document.querySelector('#theme-switch-header');
      const menuButton = document.querySelector('#theme-switch-menu');
      // headerButton.checked = true;
      // menuButton.checked = true;
    }
    if (colorTheme !== '') {
      document.documentElement.style = colorTheme;
    }
  }, [])


  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <Header />
      { isRouteErrorResponse(error) && (
        <main className='error'>
          <PageTitle>{error.status} - {error.statusText}</PageTitle>
          {error.status === 404 && <a className='error__container-link error__container-link--404' href='/'>Retour à la page d'accueil</a>}
        </main>
      )}
      { !isRouteErrorResponse(error) && (
        <main className='error'>
          <PageTitle>Oups, une erreur est survenue</PageTitle>
          <div className='error__container'>
            <p className='error__container-message'>Une erreur est survenue lors du chargement de la page. Veuillez réessayer ce que vous faisiez, rafraîchir la page ou revenir plus tard.</p>
            <p className='error__container-message'>Si l'erreur persiste, merci de contacter l'assistance informatique via <a className='error__container-link' href='https://glpi.unimes.fr/front/helpdesk.public.php?create_ticket=1'>GLPI</a> et d'expliquer ce que vous faisiez lorque l'erreur est survenue.</p>
          </div>
        </main>
      )}
    </div>
  );
};

Error.propTypes = {

};

export default Error;
