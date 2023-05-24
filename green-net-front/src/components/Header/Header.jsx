import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import './header.scss'
import { getUserById } from '../../redux/userSlice'
import logo from '../../assets/logo.png'
import { current } from "@reduxjs/toolkit";

export const Header = () => {
    const dispatch = useDispatch();

    const [isAuthorized, setIsAuthorized] = useState(false);

    const currentUser = useSelector(state => state.user.user);

    const currentUserId = localStorage.getItem('currentUserId');

    useEffect(() => {
        if (!currentUser) dispatch(getUserById(currentUserId));
        console.log('from header', currentUser);
        const user = localStorage.getItem('token');
        setIsAuthorized(!!user);
    }, []);

    return (
        <div className='header'>
            <div className="header-container">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="links">
                    <Link to="/events" className="nav-link">События</Link>
                    <Link to="/login" className="nav-link">Лента</Link>
                    <Link to="/map" className="nav-link">Карта</Link>
                    <Link to="/shop" className="nav-link">Магазин</Link>
                    <Link to="/user-search" className="nav-link">Поиск</Link>
                    {
                        isAuthorized ?
                            <Link to={`/${currentUserId}`} className="nav-link">Профиль</Link>
                            :
                            <Link to="/login" className="nav-link">Войти</Link>
                    }

                </div>

            </div>
        </div>
    )
}