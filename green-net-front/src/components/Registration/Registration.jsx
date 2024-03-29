import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'

import { registration } from '../../redux/userSlice'
import './registration.scss';
import { ErrorText } from "../ErrorText/ErrorText";
import { changeServerErrorAction } from "../../redux/dialogsSlice";

export const Registration = () => {
    const dispatch = useDispatch();

    const [userLogin, setUserLogin] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [passwordRep, setPasswordRep] = useState("");
    const [nickname, setNickname] = useState("");
    const [avatar, setAvatar] = useState('https://img.freepik.com/free-photo/adorable-dog-with-abstract-colorful-graphic-background_23-2150022290.jpg?w=740&t=st=1684323611~exp=1684324211~hmac=f52f6a6f5a2cd828a31f8c42e73a689ca1a1dd43fa3395a5f3cc7e9ae249fec6')

    // const [passMatch, setPassMatch] = useState(false);
    const [errorText, setErrorText] = useState('');

    // const [valid, setValid] = useState(false);

    const serverErrorText = useSelector(state => state.user.error);
    const isShowError = useSelector(state => state.dialog.showServerError);

    const [valid, setValid] = useState("");

    const comparePassword = () => {
        if (userPassword === passwordRep) {
            return true;
        } else {
            return false;
        }
    }

    const checkFields = () => {
        if (userLogin && userPassword && nickname && passwordRep) {
            const passMatch = comparePassword();
            if (passMatch) {
                setErrorText("");
                return true;
            } else {
                setErrorText("Пароли не совпадают!");
                return false;
            }
        } else {
            setErrorText("Заполните поля для входа!");
            return false;
        }
    }

    const toRegister = (e) => {
        e.preventDefault();
        const valid = checkFields();
        if (valid) {
            const data = {avatar, userLogin, userPassword, nickname};
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
                        if (isShowError) dispatch(changeServerErrorAction());
                    }}/>

                    <label htmlFor="">Пароль</label>
                    <input type="password" onChange={(e) => {
                        setUserPassword(e.target.value);
                        setErrorText("");
                    }}/>

                    <label htmlFor="">Подтвердите пароль</label>
                    <input type="password" onChange={(e) => {
                        setPasswordRep(e.target.value);
                        setErrorText("");
                    }}/>

                    <p className="error-field">{errorText}</p>
                    {isShowError ? <ErrorText text={serverErrorText} /> : ""}

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