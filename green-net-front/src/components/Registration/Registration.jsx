import { Link } from "react-router-dom";

import './registration.scss'

export const Registration = () => {
    return (
        <div className="register-container">
            <div className="content">
                <h2 className="title">Регистрация</h2>

                <form>
                    <label htmlFor="">Имя пользователя</label>
                    <input type="text" 
                    // onChange={(e) => {
                    //     setUserName(e.target.value);
                    // }} 
                    />

                    <label htmlFor="">Email</label>
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

                    <label htmlFor="">Подтвердите пароль</label>
                    <input type="password" 
                    // onChange={(e) => {
                    //     setConfirmPassword(e.target.value);
                    // }} 
                    />

                    {/* <p className="error-field">{passMatch ? "" : errorText}</p> */}
                    <p className="error-field">ошибка</p>

                    <div className="but-cont">
                        <button 
                        // onClick={(e) => toRegister(e)}
                        >Зарегистрироваться</button>

                        <Link to="/login" className='log'>
                            <p>Вход</p>
                        </Link>
                    </div>



                </form>


            </div>
        </div>
    )
}