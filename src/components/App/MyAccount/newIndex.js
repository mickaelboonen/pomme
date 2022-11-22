import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import PageTitle from '../../generics/PageTitle';
import FormSectionTitle from '../../generics/FormSectionTitle';
import { useForm } from 'react-hook-form';
import RadioInput from '../OMForm/Fields/RadioInput';

const MyData = () => {
  
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
    const properties = ['--darkestThemeColor', '--darkerThemeColor', '--mediumThemeColor', '--lighterThemeColor', '--lightestThemeColor']

    for (let i = 0; i < lolArray.length; i++) {
      
      const style = getComputedStyle(lolArray[i]);
      const backgroundColor = style.backgroundColor;
      const root = lolArray[i].getRootNode();
      console.log(root);
      document.documentElement.style.setProperty(properties[i], backgroundColor);
    }

  };
  return (
  <main className='my-documents'>
    <PageTitle>Mes préférences</PageTitle>

    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <FormSectionTitle>Thème de l'application</FormSectionTitle>
      <div className='form__section-theme'>
        <div className='form__section-theme-colors'>
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#742946'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#99384f'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#d1545e'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#ff897f'}} />
          <div className='form__section-theme-colors-color' style={{'backgroundColor': '#ffcc9c'}} />
        </div>
        <RadioInput
          id="classic"
          formField="theme"
          label="Vert foncé"
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
    </form>
  </main>
);}

MyData.propTypes = {

};

export default MyData;
