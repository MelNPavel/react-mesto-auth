import React from 'react';
import logo from '../image/Logo.svg';
import { Link, Route, Switch } from 'react-router-dom';

function Header(props) {
   
    return (
        <header className="header">
                <img className="logo"  alt="Логотип" src={logo} />
                <nav className='header__auth-area'>
                    <p className='header__email'>{props.emailHeader}</p>
                    <Switch>
                        <Route exact path="/">
                            <Link to="/signin" className="link-auth" onClick={props.onlogOut}>Выйти </Link>
                        </Route>
                        <Route path="/signup">
                            <Link to="/signin" className="link-auth">Войти</Link>
                        </Route>
                        <Route path="/signin">
                            <Link to="/signup" className="link-auth">Регистрация</Link>
                        </Route>
                    </Switch>
                    
                </nav>
        </header>
    )
};

export default Header;