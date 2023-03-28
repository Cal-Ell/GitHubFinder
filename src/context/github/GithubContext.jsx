import React, {createContext, useReducer} from 'react';
import GithubReducer from './GithubReducer';

const GithubContext = createContext();
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        user: {},
        loading: false,
        repos: []
    }
    const [state, dispatch] = useReducer(GithubReducer, initialState);

    const searchUsers = async (text) => {
        setLoading();
        const params = new URLSearchParams({
            q: text
        })
        try {
            const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`
                }
            });
            const {items} = await response.json();
            dispatch({
                type: 'GET_USERS',
                payload: items,
                loading: false
            });
        } catch(e){
            console.error(e);
        }
    };

    const getUser = async (login) => {
        setLoading();
        try {
            const response = await fetch(`${GITHUB_URL}/users/${login}`, {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`
                }
            });

            if(response.status === 404){
                window.location = '/notfound'
            } else {
                const data = await response.json();
                dispatch({
                    type: 'GET_USER',
                    payload: data,
                    loading: false
                });
            }
            
        } catch(e){
            console.error(e);
        }
    };

    const getUserRepos = async (login) => {
        setLoading();
        const params = new URLSearchParams({
            sort: 'created',
            per_page: 10
        })
        try {
            const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`
                }
            });
            const data = await response.json();
            dispatch({
                type: 'GET_REPOS',
                payload: data,
            });
        } catch(e){
            console.error(e);
        }
    };


    const setLoading = () => {
        dispatch({
            type: 'SET_LOADING'
        })
    }

    const clearUsers = () => {
        dispatch({
            type: 'CLEAR_USERS'
        })
    }

    return <GithubContext.Provider value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        repos: state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext