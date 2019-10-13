import axios from 'axios';

export const UserRegistration = data => {
    return axios.post('http://localhost:3000/users/register', data)
        .then(res => res.status)
        .catch(err => err.response.status)
}

export const UsernameValidation = data => (
    axios.post('http://localhost:3000/users/validateUsername', data)
        .then(exist => exist.status)
        .catch(err => err.response.status)
)