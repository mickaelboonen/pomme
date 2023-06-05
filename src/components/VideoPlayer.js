import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaPlayCircle } from 'react-icons/fa'

import './style.scss';

const VideoPlayer = ({ link }) => {
  const videoRef = useRef(null);

  const handlePlayPause = () => {

    const coverElement = document.querySelector('.video__cover');
    coverElement.classList.toggle('video__cover--hidden');

    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };
  
  return (
    <div className='video'>
      <video ref={videoRef} className='video__player' src={link}  controls="controls">
        Votre navigateur ne prend pas en charge la lecture de vidéos.
      </video> 
      {/* <div className='video__cover'>
        <div id="left"><FaPlayCircle onClick={handlePlayPause} /></div>
        <div id="left"><FaPlayCircle onClick={handlePlayPause} /></div>

      </div> */}
    </div>
  );
}

export default VideoPlayer;
