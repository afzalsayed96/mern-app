import axios from 'axios';

export const UserRegistration = data => {
    return axios.post(process.env.API_URL + 'users/register', data)
        .then(res => res.status)
        .catch(err => err.response.status)
}

export const UsernameValidation = data => (
    axios.post(process.env.API_URL + 'users/validateUsername', data)
        .then(exist => exist.status)
        .catch(err => err.response.status)
)