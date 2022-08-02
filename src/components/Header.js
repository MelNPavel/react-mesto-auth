import React from 'react';
import logo from '../image/Logo.svg';

function Header() {
    return (
        <header className="header">
                <img className="logo"  alt="Логотип" src={logo} />
        </header>
    )
};

export default Header;