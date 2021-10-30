import axios from 'axios';
const UserList = data => (
    axios.get(process.env.API_URL + 'users/all', data)
        .then(res => res.data)
        .then(data => data)
        .catch(err => console.log(err))
)

export default UserList;