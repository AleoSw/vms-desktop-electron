import React, { useState, useEffect } from 'react';
import "./CameraStream.css"

const CameraStream = ({ videoUrl}) => {

  console.log(videoUrl)

  return (
    <div className='cam'>
      <img src={videoUrl} autoPlay />
    </div>
  );
};

export default CameraStream;
