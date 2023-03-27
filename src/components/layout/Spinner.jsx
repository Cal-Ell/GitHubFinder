import React from 'react';
import spin from '../assets/spinner.gif';

const Spinner = () => {
  return (
    <div className='mt-20'>
        <img 
            src={spin} 
            alt='loading' 
            width={180}
            className='text-center mx-auto'
        />
    </div>
  )
}

export default Spinner