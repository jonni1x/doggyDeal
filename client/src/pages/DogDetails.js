import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DogDetails = () => {
    
    const { id } = useParams();

  return (
    <div className='container' style={{margin: "100px 0"}}>
        <p>{id}</p>
    </div>
  )
}

export default DogDetails