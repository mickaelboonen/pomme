import React from 'react';
import PropTypes from 'prop-types';
import ApiResponse from './ApiResponse'
import { RxDoubleArrowLeft, RxDoubleArrowRight} from "react-icons/rx";
import { BiHide } from "react-icons/bi";

import './style.scss';
import { clearMessage } from '../reducer/app';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

const ErrorDisplayer = ({ response }) => {

  const dispatch = useDispatch()

  const showError = (event) => {
    const {parentNode, nextElementSibling} = event.currentTarget;
    
    const visibleIcon = document.getElementById(`${parentNode.classList.length > 1 ? 'left' : 'right'}-icon`);
    const hiddenIcon = document.getElementById(`${parentNode.classList.length > 1 ? 'right' : 'left'}-icon`);

    parentNode.classList.toggle('sidebar-notification--still');
    visibleIcon.classList.toggle('sidebar-notification__header-icon--visible');
    hiddenIcon.classList.toggle('sidebar-notification__header-icon--visible');
    nextElementSibling.classList.toggle('sidebar-notification__body--open');
  }

  const hideError = () => {
    dispatch(clearMessage());
  
  }

  const htmlSuccessCodes = [200, 202, 100];
  return (
  <div className={classNames('sidebar-notification', {'sidebar-notification--success': htmlSuccessCodes.indexOf(response.response.status) > -1, 'sidebar-notification--error': htmlSuccessCodes.indexOf(response.response.status) === -1})}>
    <div className='sidebar-notification__header' onClick={showError}>
      <RxDoubleArrowLeft className='sidebar-notification__header-icon sidebar-notification__header-icon--visible' id="left-icon" />
      <p>{htmlSuccessCodes.indexOf(response.response.status) > -1 ? 'Succès' : 'Erreur'}</p>
      <RxDoubleArrowRight className='sidebar-notification__header-icon' id="right-icon" />
    </div>
    <div className='sidebar-notification__body'>
      <ApiResponse apiResponse={response} updateForm={false} />
      {/* {response.response.status !== 200 && ( */}
        <div className='sidebar-notification__body-icon' onClick={hideError}>
          <BiHide/> Ne plus afficher le message
        </div>
      {/* )} */}
    </div>
  </div>
);}

ErrorDisplayer.propTypes = {

};

export default ErrorDisplayer;
