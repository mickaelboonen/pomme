import React from 'react';
import PropTypes from 'prop-types';
import ApiResponse from './ApiResponse'
import { RxDoubleArrowLeft, RxDoubleArrowRight} from "react-icons/rx";
import { BiHide } from "react-icons/bi";

import './style.scss';
import { clearMessage } from '../reducer/app';
import { useDispatch } from 'react-redux';

const ErrorDisplayer = ({ error }) => {

  const dispatch = useDispatch()
  
  const showError = (event) => {
    const {parentNode, nextElementSibling} = event.currentTarget;
    
    const visibleIcon = document.getElementById(`${parentNode.classList.length > 1 ? 'left' : 'right'}-icon`);
    const hiddenIcon = document.getElementById(`${parentNode.classList.length > 1 ? 'right' : 'left'}-icon`);

    parentNode.classList.toggle('error-sidebar--still');
    visibleIcon.classList.toggle('error-sidebar__header-icon--visible');
    hiddenIcon.classList.toggle('error-sidebar__header-icon--visible');
    nextElementSibling.classList.toggle('error-sidebar__body--open');
  }

  const hideError = () => {
    dispatch(clearMessage());
  
  }
  return (
  <div className='error-sidebar'>
    <div className='error-sidebar__header' onClick={showError}>
      <RxDoubleArrowLeft className='error-sidebar__header-icon error-sidebar__header-icon--visible' id="left-icon" />
      <p>Erreur</p>
      <RxDoubleArrowRight className='error-sidebar__header-icon' id="right-icon" />
    </div>
    <div className='error-sidebar__body' onClick={hideError}>
      <ApiResponse apiResponse={error} updateForm={false} />
      <div className='error-sidebar__body-icon'>
        <BiHide/> Ne plus afficher l'erreur
      </div>
    </div>
  </div>
);}

ErrorDisplayer.propTypes = {

};

export default ErrorDisplayer;
