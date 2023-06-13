import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'

import { registration } from '../../redux/userSlice'
import './registration.scss'

export const Registration = () => {
    const dispatch = useDispatch();

    const [userLogin, setUserLogin] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [passwordRep, setPasswordRep] = useState("");
    const [nickname, setNickname] = useState("");

    const [passMatch, setPassMatch] = useState(false);
    const [errorText, setErrorText] = useState('');

    const [valid, setValid] = useState("");

    const comparePassword = () => {
        if (userPassword === passwordRep) {
            setPassMatch(true);
        } else {
            setPassMatch(false);
            setErrorText('Пароли не совпадают!')
        }
    }

    const checkFields = () => {
        if (userLogin && userPassword && nickname && passwordRep) {
            comparePassword();
            if (passMatch) {
                setErrorText("");
                setValid(true);
            } else {
                setErrorText("Пароли не совпадают!");
                setValid(false);
            }
        } else {
            setErrorText("Заполните поля для входа!");
            setValid(false);
        }
    }

    const toRegister = (e) => {
        e.preventDefault();
        checkFields();
        if (valid) {
            const data = {userLogin, userPassword, nickname};
            dispatch(registration(data));
        } else return;       
    }

    return (
        <div className="register-container">
            <div className="content">
                <h2 className="title">Регистрация</h2>

                <form>
                    <label htmlFor="">Имя пользователя</label>
                    <input type="text" onChange={(e) => {
                        setNickname(e.target.value);
                    }}/>

                    <label htmlFor="">Email</label>
                    <input type="text" onChange={(e) => {
                        setUserLogin(e.target.value);
                    }}/>

                    <label htmlFor="">Пароль</label>
                    <input type="password" onChange={(e) => {
                        setUserPassword(e.target.value);
                    }}/>

                    <label htmlFor="">Подтвердите пароль</label>
                    <input type="password" onChange={(e) => {
                        setPasswordRep(e.target.value);
                    }}/>

                    <p className="error-field">{passMatch ? "" : errorText}</p>

                    <div className="but-cont">
                        <button onClick={(e) => toRegister(e)}>Зарегистрироваться</button>

                        <Link to="/login" className='log'>
                            <p>Вход</p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}