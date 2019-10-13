import axios from 'axios';

const UserLogin = data => (
	axios.post('http://localhost:3000/users/login', data)
        .then(res => res.status)
        .catch(err => err.response.status)
)

export default UserLogin;