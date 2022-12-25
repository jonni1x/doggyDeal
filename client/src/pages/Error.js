import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

const Error = () => {
  return (
    <div className='container d-flex align-items-center justify-content-center' style={{height: '79.7vh'}}>
      <Player
        autoplay
        loop
        src="https://assets2.lottiefiles.com/packages/lf20_bhw1ul4g.json"
        style={{ height: '400px', width: '500px' }}
        >
      </Player>
    </div>
  )
}

export default Error