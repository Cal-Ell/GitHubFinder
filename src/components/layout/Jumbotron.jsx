import React, {useState, useContext, useEffect} from 'react';
import GithubContext from '../../context/github/GithubContext';
import UserCards from '../users/UserCards';
import ImageSlider, { Slide } from "react-auto-image-slider";
import Spinner from './Spinner';
import {getRandomUsers} from  '../../context/github/GithubActions';

const Jumbotron = () => {
    const {randomUsers, dispatch, loading} = useContext(GithubContext);
    useEffect(() => {
        dispatch({
            type:'SET_LOADING'
        });
        const getRandoms = async () => {
            const data = await getRandomUsers();
            dispatch({
                type: 'GET_RANDOMS',
                payload: data
            })
        } 
        getRandoms();
    }, [dispatch]);

    if(loading){
        return <Spinner />
    }

    return (
        <div className='fixed top-0 bottom-0'>
            <ImageSlider>
                {randomUsers.map(user => (
                    <Slide key={user.id}>
                        <UserCards key={user.id} user={user}/>
                    </Slide>
                ))}
            </ImageSlider>
        </div>
    )
}

export default Jumbotron