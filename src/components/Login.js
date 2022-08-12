import React, {useState} from "react";

export function Login (props) {

    const [loginData, setLoginData] = useState({
        email:'',
        password:'',
    })

    const handleChandge = (e) => {
        const {name, value} = e.target;
        setLoginData ({
            ...loginData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onUpdateAuth({
            ...loginData
        });
    }

    return(
        <div className="page">
            <section className="auth">
                <h2 className="auth__title">Вход</h2>
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
                        value={loginData.email}
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
                        value={loginData.password}
                    />
                    <span className="auth__error" id="type-password-error"></span>
                    <button className="auth__button" type="submit">
                        Вход
                    </button>
                </form>
            </section>
        </div>
    )
}