import axios from "axios";

export const UserListItem = ({user}) => {

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:3000/users/${id}`)
    }

    return (
        <div>
            <img src={''} alt={'avatar'}/>
            <p><a href={`/${user.id}`} target={'_blank'}>{user.nickname}</a></p>
            <button onClick={() => deleteUser(user.id)}>Удалить</button>
        </div>
    )
}