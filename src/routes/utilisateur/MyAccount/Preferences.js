import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import PageTitle from 'src/components/PageTitle';
import FormSectionTitle from 'src/components/FormSectionTitle';
import { useForm } from 'react-hook-form';
import RadioInput from 'src/components/Fields/RadioInput';

const Preferences = () => {
  
  const {
    register,
    watch
  } = useForm();


  let currentTheme = localStorage.getItem('color-theme-name');
  const themeInput = watch('theme');

  useEffect(() => {
    currentTheme = localStorage.getItem('color-theme-name');
  }, [themeInput])

  const handleClick = (event) => {
    const selectedInput = event.currentTarget;
    const colorsNodeList = selectedInput.closest('.theme__container-theme').children[0].children;

    const themeName = selectedInput.closest('.theme__container-theme').querySelector('input').id;
    
    const colorsArray = Array.from(colorsNodeList);
    const properties = [
      '--darkestThemeColor',
      '--darkerThemeColor',
      '--mediumThemeColor',
      '--lighterThemeColor',
      '--lightestThemeColor',
      '--lighterLightestThemeColor',
      '--lighterDarkestThemeColor'
    ];

    const colors = [];
    for (let i = 0; i < colorsArray.length; i++) {
      const color = { name:'', property:'', };
      const style = getComputedStyle(colorsArray[i]);
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
    localStorage.setItem("color-theme-name", themeName);

  };

  const themes = [
    {
      id: 'classic',
      label: 'Classique',
      colors: ['rgba(116, 41, 70, 1)', 'rgba(153, 56, 79, 1)', 'rgba(209, 84, 94, 1)', 'rgba(255, 137, 127, 1)', 'rgba(255, 204, 156, 1)']
    },
    {
      id: 'unimes',
      label: 'Orange',
      colors: ['#e84e24', '#292929', '#FF8303', '#FEDEBE', '#FFAF42']
    },
    {
      id: 'green',
      label: 'Vert',
      colors: ['#020402', '#0c2c30', '#468884', '#98c4ac', '#dfe7da']
    },
    {
      id: 'olive',
      label: 'Olive',
      colors: ['#212820', '#265447', '#807f1a', '#d5cb75', '#e8e8be']
    },
    {
      id: 'other',
      label: 'Taupe',
      colors: ['#403036', '#5e485b', '#927078', '#d0a6a4', '#d1bdb0']
    },
    {
      id: 'blue',
      label: 'Bleu',
      colors: ['#0c3043', '#12475b', '#1a6f78', '#20959f', '#2bc9c7']
      
    },
    {
      id: 'brown',
      label: 'Marron & Jaune',
      colors: ['#471923','#6f2f2e','#a15238','#da8642','#ffcc4d']
    },
    {
      id: 'hufflepuff',
      label: 'Poufsouffle',
      colors: ['#141414', '#362e29', '#706254', '#ecc655', '#e7b827']
    },
    {
      id: 'ravenclaw',
      label: 'Serdaigle',
      colors: ['#222f5b', '#040d3f', '#2c428a', '#5d5d5d', '#946b2d']
    },
    {
      id: 'slytherin2',
      label: 'Serpy',
      colors: ['#1a472a', '#013403', '#2a623d', '#5d5d5d', '#aaa']
    },
    {
      id: 'gryffindor',
      label: 'Gryffondor',
      colors: ['#740001', '#530909', '#ae0001', '#eeba30', '#d3a625']
    },
  ];

  return (
  <main className='my-preferences'>
    <PageTitle>Mes préférences</PageTitle>
    <form className='theme'>
      <FormSectionTitle>Thème de l'application</FormSectionTitle>
      <div className='theme__container'>

      {themes.map((theme) => (
        <div className='theme__container-theme' key={theme.id}>
          <div className='theme__container-theme-colors'>
            {theme.colors.map((color) => <div key={color} className='theme__container-theme-colors-color' style={{'backgroundColor': color}} />)}
          </div>
          <RadioInput
            id={theme.id}
            checked={theme.id === currentTheme ? true : false}
            formField="theme"
            label={theme.label}
            register={register}
            handler={handleClick}
          />
        </div>
      ))}
      </div>
    </form>
  </main>
);}

Preferences.propTypes = {

};

export default Preferences;
