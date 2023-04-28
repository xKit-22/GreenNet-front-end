import axios from 'axios'

export const updateUser = async (id, data) => {
    await axios.put(`http://localhost:3000/users/${id}`, data);
}