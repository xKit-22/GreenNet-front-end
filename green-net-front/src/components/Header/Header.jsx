import { Link } from "react-router-dom";

import './header.scss'
import logo from '../../assets/logo.png'

export const Header = () => {
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
                    <Link to="/profile" className="nav-link">Профиль</Link>
                    
                </div>

            </div>
        </div>
    )
}