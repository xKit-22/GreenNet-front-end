import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { Link } from "react-router-dom";

import { login } from '../../redux/userSlice'

import './login.scss'

export const Login = () => {
    const [userLogin, setUserLogin] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const [errorText, setErrorText] = useState("");
    const [valid, setValid] = useState(false);

    const dispatch = useDispatch();

    const checkFields = () => {
        if (userLogin && userPassword) {
            setErrorText("");
            setValid(true);
        } else {
            setErrorText("Заполните поля для входа!");
            setValid(false);
        }
    }

    const toLogin = (e) => {
        e.preventDefault();
        checkFields();
        if (valid) {
            const data = {userLogin, userPassword};
            dispatch(login(data));
        } else return;
    }

    return (
        <div className="login-container">
            <div className="content">
                <h1 className="title">Войдите</h1>

                <form>
                    <label htmlFor="">Электронная почта</label>
                    <input type="text" onChange={(e) => {
                        setUserLogin(e.target.value);
                    }} />

                    <label htmlFor="">Пароль</label>
                    <input type="password" onChange={(e) => {
                        setUserPassword(e.target.value);
                    }}/>

                    {/* <span className="error-field">ОШИБКА?</span> */}
                    <span className="error-field">{errorText}</span>

                    <div className="but-cont">
                        <button onClick={(e) => toLogin(e)}>Войти</button>
                        <p>Нет аккаунта?</p>
                        <Link to="/registration" className='reg'>
                            <p>Зарeгестрироваться</p>
                        </Link>

                    </div>
                </form>
            </div>
        </div>
    )
}