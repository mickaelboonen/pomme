import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import PageTitle from 'src/components/PageTitle';
import FormSectionTitle from 'src/components/FormSectionTitle';
import { useForm } from 'react-hook-form';
import RadioInput from 'src/components/Fields/RadioInput';

const Preferences = () => {
  
  const {
    register,
    handleSubmit,
    watch,
    formState:
    { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleClick = (event) => {
    const el = event.currentTarget;
    const lol = el.closest('.form__section-theme').children[0].children;
    
    const lolArray = Array.from(lol);
    const properties = ['--darkestThemeColor', '--darkerThemeColor', '--mediumThemeColor', '--lighterThemeColor', '--lightestThemeColor', '--lighterLightestThemeColor', '--lighterDarkestThemeColor']

    const colors = [];
    for (let i = 0; i < lolArray.length; i++) {
      const color = {
        name:'',
        property:'',
      };
      const style = getComputedStyle(lolArray[i]);
      const backgroundColor = style.backgroundColor;
      const colorCode = backgroundColor.slice(4, backgroundColor.length -1 );

      let property = `${colorCode}, 1`;
      color.name = properties[i];
      color.property = property;
      colors.push(color);

      if (properties[i] === '--darkestThemeColor') {
        const color = {
          name:'',
          property:'',
        };
        color.name = '--lighterDarkestThemeColor';
        color.property = `${colorCode}, 0.25`;
        colors.push(color);

      }
      else if (properties[i] === '--lightestThemeColor') {
        const color = {
          name:'',
          property:'',
        };
        color.name = '--lighterLightestThemeColor';
        color.property = `${colorCode}, 0.3`;
        colors.push(color);

      }
    }
    
    let stringStyle = '';
    colors.forEach((c) => {
      stringStyle += `${c.name}:${c.property}; `;
    })
    
    document.documentElement.style = stringStyle;
    localStorage.setItem("color-theme", stringStyle);

  };
  return (
  <main className='my-documents'>
    <PageTitle>Mes préférences</PageTitle>

    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <FormSectionTitle>Thème de l'application</FormSectionTitle>
      <div className='form__section-theme'>
        <div className='form__section-theme-colors'>
          <div className='form__section-theme-colors-color' style={{'backgroundColor': 'rgba(116, 41, 70, 1)'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': 'rgba(153, 56, 79, 1)'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': 'rgba(209, 84, 94, 1)'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': 'rgba(255, 137, 127, 1)'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': 'rgba(255, 204, 156, 1)'}} />
        </div>
        <RadioInput
          id="classic"
          formField="theme"
          label="Classic"
          register={register}
          handler={handleClick}
        />
      </div>
      <div className='form__section-theme'>
        <div className='form__section-theme-colors'>
          <div className='form__section-theme-colors-color' />
          <div className='form__section-theme-colors-color' />
          <div className='form__section-theme-colors-color' />
          <div className='form__section-theme-colors-color' />
          <div className='form__section-theme-colors-color' />
        </div>
        <RadioInput
          id="vert-foncé"
          formField="theme"
          label="Vert foncé"
          register={register}
          handler={handleClick}
        />
      </div>
      <div className='form__section-theme'>
        <div className='form__section-theme-colors'>
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#471923'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#6f2f2e'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#a15238'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#da8642'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#ffcc4d'}} />
        </div>
        <RadioInput
          id="marron-jaune"
          formField="theme"
          label="Marron Jaune"
          register={register}
          handler={handleClick}
        />
      </div>
      <div className='form__section-theme'>
        <div className='form__section-theme-colors'>
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#212820'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#265447'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#807f1a'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#d5cb75'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#e8e8be'}} />
        </div>
        <RadioInput
          id="olive"
          formField="theme"
          label="Olive"
          register={register}
          handler={handleClick}
        />
      </div>
    </form>
  </main>
);}

Preferences.propTypes = {

};

export default Preferences;
