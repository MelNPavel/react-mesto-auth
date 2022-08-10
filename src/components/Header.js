import React from 'react';
import logo from '../image/Logo.svg';
import { useLocation, Link } from 'react-router-dom';

function Header(props) {
    
    let areaAuth = "";
    let linkAuth = ""
    const location = useLocation();

    if (location.pathname === '/signin') {
        areaAuth = "Регистрация"
        linkAuth = "/signup"
    }

    if (location.pathname === '/signup'){
        areaAuth = "Войти"
        linkAuth = "/signin"        
    }


    return (
        <header className="header">
                <img className="logo"  alt="Логотип" src={logo} />
                <p className='header__auth-area'>
                    <Link to={linkAuth} className="link-auth">
                    {areaAuth}
                    </Link>
                </p>
        </header>
    )
};

export default Header;