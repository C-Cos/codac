import axios from 'axios';

/* export const register = newUser => {
    return axios
        .post('http://localhost:4242/users/register', {
            username : newUser.username,
            email : newUser.email,
            password : newUser.password,
            association : newUser.association,
            postcode : newUser.postcode,
            city: newUser.city
        })
        
} */


export const login = user => {
    return axios
        .post('http://localhost:4242/users/login', {
            email : user.email,
            password : user.password
        })
        
}