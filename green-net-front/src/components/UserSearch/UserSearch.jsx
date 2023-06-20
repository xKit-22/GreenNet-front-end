import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios'

import './user-search.scss'
import { UserLine } from './UserLine'
import { getAllUsers } from '../../redux/userSlice'

export const UserSearch = () => {
    const dispatch = useDispatch();
    const allusers = useSelector(state => state.user.allUsers);
    const [listOfUsers, setListOfUsers] = useState('');

    const [searchString, setSearchString] = useState('');


    useEffect(() => {
        dispatch(getAllUsers())
    }, [])

    useEffect(() => {
        setListOfUsers(() => allusers?.map(item => <UserLine user={item} />));
    }, [allusers])

    const filterUsers = (searchString) => {
        const filteredArray = allusers?.filter(item => item.nickname.includes(searchString));
        setListOfUsers(() => filteredArray?.map(item => <UserLine user={item} />));
    }

    return (
        <div className='search'>
            <div className="search-container">
                <h2>Введите никнейм пользователя</h2>
                <input type="text" onChange={(e) => {
                    setSearchString(e.target.value);
                }} />
                <button onClick={() => filterUsers(searchString)}>Найти</button>
                <div className="user-lines-container">
                    {listOfUsers}
                </div>
            </div>
        </div>
    )
}
