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
    watch,
    formState:
    { errors },
  } = useForm();


  let currentTheme = localStorage.getItem('color-theme-name');
  const themeInput = watch('theme');
  console.log(themeInput);

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
      id: 'green',
      label: 'Vert',
      colors: ['#020402', '#0c2c30', '#468884', '#98c4ac', '#dfe7da']
    },
    {
      id: 'classic',
      label: 'Classique',
      colors: ['rgba(116, 41, 70, 1)', 'rgba(153, 56, 79, 1)', 'rgba(209, 84, 94, 1)', 'rgba(255, 137, 127, 1)', 'rgba(255, 204, 156, 1)']
    },
    {
      id: 'olive',
      label: 'Olive',
      colors: ['#212820', '#265447', '#807f1a', '#d5cb75', '#e8e8be']
    },
    {
      id: 'other',
      label: 'Autre',
      colors: ['#403036', '#5e485b', '#927078', '#d0a6a4', '#d1bdb0']
    },
    {
      id: 'blue',
      label: 'Bleu',
      colors: ['#0c3043', '#12475b', '#1a6f78', '#20959f', '#2bc9c7']
      
    }, 
    {
      id: 'rose',
      label: 'Rose',
      colors: ['#3d2d3f', '#5c4159', '#8a617e', '#ca8cad', '#fbc4e8']
    },
    {
      id: 'slytherin',
      label: 'Vert Serpentard',
      colors: ['#132c36', '#1b4043', '#285d58', '#377072', '#55a19b']
    },
    {
      id: 'brown',
      label: 'Marron & Jaune',
      colors: ['#471923','#6f2f2e','#a15238','#da8642','#ffcc4d']
    },
    {
      id: 'lilac',
      label: 'Lilas',
      colors: ['#100907', '#211f37', '#585b88', '#979dea', '#d0dbef']
    },
    // {
    //   id: 'light-blue',
    //   label: 'Bleu clair',
    //   colors: ['#6ba1ca', '#60b3ce', '#93d0dc', '#cbeaeb', '#f3f3f3']
    // },
    // {
    //   id: 'light-green',
    //   label: 'Vert clair',
    //   colors: ['#468b88', '#98bea8', '#cad6c6', '#ede8d8', '#f6f5eb']
    // },
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
