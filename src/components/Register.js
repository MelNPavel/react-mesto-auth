import React, { useState } from "react";
import { Link } from 'react-router-dom';


export function Register(props) {

    const [registerData, setRegisterData] = useState({
        email:'',
        password:'',
    })

    const handleChandge = (e) => {
        const {name, value} = e.target;
        setRegisterData ({
            ...registerData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onUpdateAuth({
            ...registerData
        });
    }

    return(
        <div className="page">
           
            <section className="auth">
                <h2 className="auth__title">Регистрация</h2>
                <form className="auth__form" onSubmit={handleSubmit}>
                    <input
                        id="type-email"
                        className="auth__input auth__input_type_email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        minLength="7"
                        maxLength="40"
                        required
                        onChange={handleChandge}
                        value={registerData.email}
                    />
                    <span className="auth__error type-email-error"></span>
                    <input
                        id="type-password"
                        className="auth__input auth__input_type_password"
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        minLength="8"
                        maxLength="50"
                        required
                        onChange={handleChandge}
                        value={registerData.password}
                    />
                    <span className="auth__error" id="type-password-error"></span>
                    <button className="auth__button" type="submit">
                    Регистрация
                    </button>
                </form>
                <div className="auth__check-area">
                    
                    
                    <p className="auth__link">Уже зарегистрированы?&nbsp;
                        <Link to={"/signin"} className="link-auth link-auth__signin">
                            Войти
                        </Link>
                    </p>
                </div>
            </section>
        </div>
    )
}