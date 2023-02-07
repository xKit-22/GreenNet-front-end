import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import './header.scss'
import logo from '../../assets/logo.png'

export const Header = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);

    const currentUserId = localStorage.getItem('currentUserId');
    
    useEffect(() => {
        const user = localStorage.getItem('token');
        setIsAuthorized(!!user);
    }, [])
    return (
        <div className='header'>
            <div className="header-container">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="links">
                    <Link to="/login" className="nav-link">События</Link>
                    <Link to="/login" className="nav-link">Лента</Link>
                    <Link to="/login" className="nav-link">Карта</Link>
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