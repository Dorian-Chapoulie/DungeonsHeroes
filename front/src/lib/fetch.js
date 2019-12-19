const API = 'http://localhost:8080/api';
const URLS = {
    player: {
        login: '/player/login',
        register: '/player/register',
    },
};

const fetchAPI = (url, params) => {
    const ret = undefined;
    fetch(API + url, params).then(response => {ret = response });
    return ret;
}

const fetchLogin = async (email, password) => {
    const result = await fetch(API + URLS.player.login, {
        method: 'POST',
        headers: 
            new Headers({
                'Content-Type': 'application/json',    
                'Access-Control-Allow-Origin': '*',            
            }),
        mode: 'cors',
        body: JSON.stringify({email, password}),
    });   
    const data = await result.json();
    return data;
}

const tryRegister = async (email, password, pseudo) => {
    const result = await fetch(API + URLS.player.register, {
        method: 'PUT',
        headers: 
            new Headers({
                'Content-Type': 'application/json',    
                'Access-Control-Allow-Origin': '*',            
            }),
        mode: 'cors',
        body: JSON.stringify({email, password, pseudo}),
    });   
    const data = await result.json();
    return data;
}


module.exports.fetchLogin = fetchLogin;
module.exports.tryRegister = tryRegister;