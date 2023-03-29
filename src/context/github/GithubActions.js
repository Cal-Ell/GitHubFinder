import axios from 'axios';
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
    baseURL: GITHUB_URL,
    headers: {Authorization: `token ${GITHUB_TOKEN}`}
})

export const searchUsers = async (text) => {
    const params = new URLSearchParams({
        q: text
    })
    try {
        const response = await github.get(`/search/users?${params}`);
        return response.data.items;
    } catch(e){
        console.error(e);
    }
};

export const getUserAndRepos = async (login) => {
    try {
        const [user, repos] = await Promise.all([
            github.get(`/users/${login}`),
            github.get(`/users/${login}/repos`)
        ]);
    
        return {user: user.data, repos: repos.data};
    } catch(e){
        console.error(e);
    }
}

export const getRandomUsers = async () => {
    try {
        const response = await github.get(`/users`);
        return response.data;
    } catch(e){
        console.error(e);
    }
}