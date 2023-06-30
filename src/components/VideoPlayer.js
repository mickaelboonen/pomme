import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaPlayCircle } from 'react-icons/fa'
import { IoIosCloseCircleOutline } from 'react-icons/io'

import './style.scss';
import classNames from 'classnames';

const VideoPlayer = ({ link }) => {
  const videoRef = useRef(null);
  
  const [isVisible, setIsVisible] = useState(false);

  const toggleVideoPlayer = () => {
    if (!isVisible) {
      setIsVisible(!isVisible);
      videoRef.current.currentTime = 0;
      videoRef.current.play()
    }
    
  };

  const handleVideoEnded = () => {
    setIsVisible(false);
  };

  const closeVideo = () => {
      setIsVisible(false);
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
  };
  
  return (
    <div className='video'>
      <div onClick={toggleVideoPlayer} className={classNames('video__container', { 'video__container--open': isVisible})}>
        <div className='video__container-player'>
          <video onEnded={handleVideoEnded} ref={videoRef} className={classNames('video__player', { 'video__player--visible': isVisible})} src={link}  controls="controls">
            Votre navigateur ne prend pas en charge la lecture de vidéos.
          </video>
          <IoIosCloseCircleOutline onClick={closeVideo} className={classNames('video__container-player-icon', {'video__container-player-icon--visible': isVisible})} />
        </div>
        {!isVisible && (
          <div onClick={toggleVideoPlayer} className='video__container-cover'>
            <FaPlayCircle className='video__container-cover-icon' />
          </div>  
        )}
      </div>
      {!isVisible && (<p className='video__title'>Découvrir POM en vidéo</p>)}
    </div>
  );
}

export default VideoPlayer;
