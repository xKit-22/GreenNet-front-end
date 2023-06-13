import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { Link } from "react-router-dom";

import { login } from '../../redux/userSlice';
import { ErrorText } from '../ErrorText/ErrorText';
import { changeServerErrorAction } from '../../redux/dialogsSlice';

import './login.scss'

export const Login = () => {
    const [userLogin, setUserLogin] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const serverErrorText = useSelector(state => state.user.error);
    const isShowError = useSelector(state => state.dialog.showServerError);
    // const [valid, setValid] = useState(false);

    const [errorText, setErrorText] = useState("");
    const [valid, setValid] = useState(false);

    const dispatch = useDispatch();

    const checkFields = () => {
        if (userLogin && userPassword) {
            setErrorText("");
            return true;
        } else {
            setErrorText("Заполните поля для входа!");
            return false;
        }
    }

    const toLogin = (e) => {
        e.preventDefault();
        const valid = checkFields();
        if (valid) {
            const data = { userLogin, userPassword };
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
                        if (isShowError) dispatch(changeServerErrorAction());
                        setErrorText('');
                    }} />

                    <span className="error-field">{errorText}</span>
                    {isShowError ? <ErrorText text={serverErrorText} /> : ""}

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