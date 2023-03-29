import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const UserCards = ({user: {login, avatar_url, name, description}}) => {
  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg'>
        <img className="w-full" src={avatar_url} alt='profile' />
        <div className='px-6 py-4'>
            <div className='font-bold text-xl mb-2'>{name}</div>
            <p className="text-gray-700 text-base">{description}</p>
        </div>
        <div className='px-6 pt-4 pb-2'>
            <h2 className='card-title'>{login}</h2>
            <Link className='text-base-content text-opacity-40' to={`/user/${login}`}>
                Visit Profile
            </Link>
        </div>
    </div>
  )
}

UserCards.propTypes = {
    user: PropTypes.object.isRequired
}

export default UserCards