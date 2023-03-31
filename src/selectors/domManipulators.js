// }
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
      labels[0].style.height = `${currentHalves[1]}px`;

    }
    heights.push(currentHalves);
  })

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
