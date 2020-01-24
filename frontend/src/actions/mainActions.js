import axios from 'axios';

export const USER_AUTH = 'USER_AUTH';
export const AUTH_ERROR = 'AUTH_ERROR';


function user_auth(user, redirection){
    return {
        type: USER_AUTH,
        user,
        redirection
    }
}

function auth_error(bool){
    return {
        type: AUTH_ERROR,
        bool
    }
}

export function user_login_action(user) {
    return dispatch => {
        axios.post('http://localhost:4242/users/login', user)
        .then(res => {
            localStorage.setItem('usertoken', res.data.token)
            dispatch(user_auth(res.data.user, true));
        })
        .catch((error) => {
            dispatch(auth_error(true));
        });

    }
}