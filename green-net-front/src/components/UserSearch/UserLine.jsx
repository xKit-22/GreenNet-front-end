import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import "./user-search.scss"
import av from '../../assets/cat.jpg'

export const UserLine = (props) => {
    const dispatch = useDispatch();
    const allusers = useSelector(state => state.user.allUsers);

    const findUserById = (id) => {
        return allusers.find(user => user.id === id)
    }

    const user = findUserById(props.userId);
    return (
        <Link to={`/${props.userId}`} className="user-line">
            <div className="user-line-content">
                <div className="user">
                   <span>
                        <img src={av} alt="avatar" />
                    </span>
                    <p>{user?.nickname}</p> 
                </div>
                <button>Подписаться</button>
            </div>

        </Link>
    )
}

UserLine.propTypes = {
    userId: PropTypes.string,
}