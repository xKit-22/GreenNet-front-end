import { Link } from "react-router-dom";

import './login.scss'

export const Login = () => {
    return (
        <div className="login-container">
            <div className="content">
                <h1 className="title">Войдите</h1>

                <form>
                    <label htmlFor="">Электронная почта</label>
                    <input type="text" 
                    // onChange={(e) => {
                    //     setEmail(e.target.value);
                    // }} 
                    />

                    <label htmlFor="">Пароль</label>
                    <input type="password" 
                    // onChange={(e) => {
                    //     setPassword(e.target.value);
                    // }} 
                    />

                    <span className="error-field">ОШИБКА?</span>
                    {/* <span className="error-field">{errorText}</span> */}

                    <div className="but-cont">
                        <button 
                        // onClick={(e) => toLogin(e)}
                        >Войти</button>
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