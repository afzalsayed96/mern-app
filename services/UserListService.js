import axios from 'axios';
const UserList = data => (
    axios.get('http://localhost:3000/users/all', data)
        .then(res => res.data)
        .then(data => data)
        .catch(err => console.log(err))
)

export default UserList;