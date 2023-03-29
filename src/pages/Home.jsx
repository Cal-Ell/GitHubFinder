import React from 'react';
import UserResults from '../components/users/UserResults';
import UserSearch from '../components/users/UserSearch';
import Jumbotron from '../components/layout/Jumbotron';

const Home = () => {
  return (
    <div className='flex flex-col space-y-4'>
      <Jumbotron />
      <UserSearch />
      <UserResults />
    </div>
  )
}

export default Home