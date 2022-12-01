
/**
 * components/App/OMForm/Mission
 */
export const displayRegionFieldsInFormMission = () => {
  const isAbroad = document.querySelector('#étranger');
  const domTom = document.querySelector('#dom-tom');

  if ( isAbroad.checked ) {
    document.querySelector('#country-field').classList.remove('form__section-field--hidden');
    document.querySelector('#abroad-field').classList.remove('form__section-field--hidden');
    document.querySelector('#abroad-report').classList.remove('form__section-field--hidden');
  }
  else if (domTom.checked) {
    document.querySelector('#abroad-field').classList.remove('form__section-field--hidden');
    document.querySelector('#abroad-report').classList.add('form__section-field--hidden');

  }
  else {
    document.querySelector('#country-field').classList.add('form__section-field--hidden');
    document.querySelector('#abroad-field').classList.add('form__section-field--hidden');
    document.querySelector('#abroad-report').classList.add('form__section-field--hidden');
  } 
}

export const toggleIsHiddenOnNextFormSection = (target) => {
  const { checked } = target;
  const nextSectionField = target.closest('.form__section-field').nextSibling;

  if (checked) {
    nextSectionField.classList.remove('form__section-field--hidden');
  }
  else {
    nextSectionField.classList.add('form__section-field--hidden');
  }
}
// HEADER DOM MANIPULATION -------------------------------------------------------

export const toggleBurgerMenu = () => {

  const firstBar = document.querySelector('#first-bar');
  const secondBar = document.querySelector('#second-bar');
  const secondBarChild = document.querySelector('#secondbis-bar');
  const menu = document.querySelector('.small-screen-menu');
  const thirdBar = document.querySelector('#third-bar');
  firstBar.classList.toggle('menu-bar--ext')
  secondBar.classList.toggle('menu-bar--int')
  secondBarChild.classList.toggle('menu-bar--int-bis')
  thirdBar.classList.toggle('menu-bar--ext')
  
  menu.classList.toggle('small-screen-menu--open')
};

export const toggleNavList = (event) => {
  
  const el = event.currentTarget.querySelector('.header__menu-section-list');
  el.classList.toggle('header__menu-section-list--open')
}
