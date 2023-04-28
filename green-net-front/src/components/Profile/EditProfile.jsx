import { useState } from 'react';
import { Link } from "react-router-dom";

import '../Registration/registration.scss'
import { updateUser } from '../Methods/UserMethods';

export const EditProfile = () => {
    const currentUserId = localStorage.getItem('currentUserId');

    const [userLogin, setUserLogin] = useState("");
    const [nickname, setNickname] = useState("");
    const [errorText, setErrorText] = useState('');

    const [valid, setValid] = useState("");


    const checkFields = () => {
        if (userLogin || nickname) {
            setValid(true)
        } else {
            setErrorText("Ни одно поле не заполнено!");
            setValid(false);
        }
    }

    const toUpdate = (e) => {
        e.preventDefault();
        console.log('xoxoxo', nickname);
        console.log('email', userLogin);
        checkFields();
        if (valid) {
            let data;
            if (userLogin !== '') data.userLogin = userLogin;
            if (nickname !== '') data.nickname = nickname;
            // updateUser(currentUserId, data);
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <h2 className="title">Редактирование профиля</h2>

                <form>
                    <label htmlFor="">Имя пользователя</label>
                    <input type="text" onChange={(e) => {
                        setNickname(e.target.value);
                    }}/>

                    <label htmlFor="">Email</label>
                    <input type="text" onChange={(e) => {
                        setUserLogin(e.target.value);
                    }}/>

                    {/* <p className="error-field">{passMatch ? "" : errorText}</p> */}

                    <div className="but-cont">
                        <button onClick={(e) => toUpdate(e)}>Сохранить изменения</button>

                        <Link to={`/${currentUserId}`} className='log'>
                            <p>Отменить</p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}