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
      <div className='form__section-theme'>
        <div className='form__section-theme-colors'>
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#0c3043'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#12475b'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#1a6f78'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#20959f'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#2bc9c7'}} />
        </div>
        <RadioInput
          id="blue"
          formField="theme"
          label="Blue"
          register={register}
          handler={handleClick}
        />
      </div>
      <div className='form__section-theme'>
        <div className='form__section-theme-colors'>
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#100907'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#211f37'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#585b88'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#979dea'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#d0dbef'}} />
        </div>
        <RadioInput
          id="olive"
          formField="theme"
          label="Olive"
          register={register}
          handler={handleClick}
        />
      </div>
      <div className='form__section-theme'>
        <div className='form__section-theme-colors'>
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#3d2d3f'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#5c4159'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#8a617e'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#ca8cad'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#fbc4e8'}} />
        </div>
        <RadioInput
          id="olive"
          formField="theme"
          label="Olive"
          register={register}
          handler={handleClick}
        />
      </div>
      <div className='form__section-theme'>
        <div className='form__section-theme-colors'>
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#468b88'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#98bea8'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#cad6c6'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#ede8d8'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#f6f5eb'}} />
        </div>
        <RadioInput
          id="olive"
          formField="theme"
          label="Olive"
          register={register}
          handler={handleClick}
        />
      </div>
      <div className='form__section-theme'>
        <div className='form__section-theme-colors'>
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#6ba1ca'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#60b3ce'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#93d0dc'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#cbeaeb'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#f3f3f3'}} />
        </div>
        <RadioInput
          id="olive"
          formField="theme"
          label="Olive"
          register={register}
          handler={handleClick}
        />
      </div>
      <div className='form__section-theme'>
        <div className='form__section-theme-colors'>
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#403036'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#5e485b'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#927078'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#d0a6a4'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#d1bdb0'}} />
        </div>
        <RadioInput
          id="olive"
          formField="theme"
          label="Olive"
          register={register}
          handler={handleClick}
        />
      </div>
      <div className='form__section-theme'>
        <div className='form__section-theme-colors'>
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#132c36'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#1b4043'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#285d58'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#377072'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#55a19b'}} />
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
