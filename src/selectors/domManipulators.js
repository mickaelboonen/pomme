
/**
 * routes/documents/EfForm/Transports
 */
export const toggleSwitchOnOtherExpenses = (isChecked) => {
    const otherFieldsGroupElement = document.getElementById('other-fields');
    const otherTextFieldElement = document.getElementById('other');

    if (isChecked) {
      otherFieldsGroupElement.classList.remove('form__section--hidden');
      otherTextFieldElement.classList.remove('form__section-field--hidden');
    }
    else {
      otherFieldsGroupElement.classList.add('form__section--hidden');
      otherTextFieldElement.classList.add('form__section-field--hidden');
    }

}
/**
 * routes/documents/EfForm/Transports
 */
export const equalizeFields = () => {

  const allHalves = document.querySelectorAll('.form__section--documents');

  let heights = [];

  Array.from(allHalves).forEach((section) => {

    const currentHalves = [];
    const labels = Array.from(section.querySelectorAll('label'));
    
    labels.forEach((currentLabel) => {
      currentHalves.push(currentLabel.offsetHeight);
    })

    if (currentHalves[0] > currentHalves[1]) {
      labels[1].style.height = `${currentHalves[0]}px`;
      labels[1].style.display = 'flex';
      labels[1].style.alignItems = 'flex-end';
    }
    else if (currentHalves[1] > currentHalves[0]) {
      labels[0].style.display = 'flex';
      labels[0].style.alignItems = 'flex-end';

    }
    heights.push(currentHalves);

  })

}
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
    document.querySelector('#country-field').classList.add('form__section-field--hidden');
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

export const toggleIsHiddenOnWorkAddressesList = () => {
  const departureFromWork = document.querySelector('#departure-work');
  const comebackToWork = document.querySelector('#comeback-work');

  if ( departureFromWork.checked || comebackToWork.checked ) {

    document.querySelector('#workAdress').classList.remove('form__section-field--hidden');
  }
  else {
    document.querySelector('#workAdress').classList.add('form__section-field--hidden');
  }
}


/**
 * components/App/OMForm/Transports
 */
export const toggleVehicleFields = (value) => {
  const personalCarField = document.querySelector('#personal-car-field');
  const isHidden = personalCarField.className.includes('hidden');

  if (value === 'Véhicule personnel, de prêt' && isHidden) {
    personalCarField.classList.remove('form__section-field--hidden');
  }
  else {
    personalCarField.classList.add('form__section-field--hidden');
  }
}


/**
 * components/App/OMForm/Transports
 */
export const toggleDerogationSection = (element, transportClass) => {
  
  const classToManipulate = 'form__section-field--hidden';
  
  if (transportClass === 'first-class' || transportClass === 'business-class' ) {
    element.classList.remove(classToManipulate);
  }
  else if (transportClass === 'second-class' || transportClass === 'eco-class') {
    element.classList.add(classToManipulate);
  }
  else {
    if (transportClass === 'Véhicule personnel, de prêt') {
      element.classList.remove(classToManipulate);
    }
    else {
      element.classList.add(classToManipulate);
    }
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

export const closeBurgerMenu = () => {

  const firstBar = document.querySelector('#first-bar');
  const secondBar = document.querySelector('#second-bar');
  const secondBarChild = document.querySelector('#secondbis-bar');
  const menu = document.querySelector('.small-screen-menu');
  const thirdBar = document.querySelector('#third-bar');
  firstBar.classList.remove('menu-bar--ext')
  secondBar.classList.remove('menu-bar--int')
  secondBarChild.classList.remove('menu-bar--int-bis')
  thirdBar.classList.remove('menu-bar--ext')
  
  menu.classList.remove('small-screen-menu--open')
};

export const toggleNavList = (event) => {
  
  const el = event.currentTarget.querySelector('.header__menu-section-list');
  el.classList.toggle('header__menu-section-list--open')
}
