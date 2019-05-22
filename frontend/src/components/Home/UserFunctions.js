import axios from 'axios'

export const register = newUser => {
    return axios
        .post('http://localhost:4242/users/register', {
            username : newUser.username,
            email : newUser.email,
            password : newUser.password,
            confpass : newUser.confpass,
            association : newUser.association
        })
        
}


export const login = user => {
    return axios
        .post('http://localhost:4242/users/login', {
            email : user.email,
            password : user.password
        })
        
}