import React, { useState, useEffect } from 'react';
import "./CameraStream.css"

const CameraStream = ({ videoUrl}) => {

  console.log(videoUrl)

  return (
    <div className='cam'>
      <img src={videoUrl} controls autoPlay type="multipart/x-mixed-replace; boundary=--myboundary" />
    </div>
  );
};

export default CameraStream;
