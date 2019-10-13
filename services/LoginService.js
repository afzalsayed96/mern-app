import axios from 'axios';

const UserLogin = data => (
    axios.post(process.env.API_URL + 'users/login', data)
        .then(res => res.status)
        .catch(err => err.response.status)
)

export default UserLogin;