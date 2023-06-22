import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";

import "./user-search.scss"
import av from '../../assets/cat.jpg'

export const UserLine = (props) => {
    const dispatch = useDispatch();
    const allusers = useSelector(state => state.user.allUsers);
    const pathName = window.location.pathname.slice(1);

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:3000/users/${id}`);
        window.location.reload();
    }

    const user = props.user;
    return (
        <div className="user-line">

            <div className="user-line-content">
                <div className="user">
                    <span>
                        <img src={user?.avatar} alt="avatar" />
                    </span>
                    <p>{user?.nickname}</p>
                </div>
                {
                    pathName == 'admin' ?
                        <button onClick={() => deleteUser(user.id)}>Удалить</button>
                        : ''
                }
            </div >
        </div >

        </Link>
    )
}

UserLine.propTypes = {
    user: PropTypes.object,
}