import React from "react";
import iconClose from '../image/Close-Icon.svg';
import successful from '../image/union.svg';
import notSuccessful from '../image/ununion.svg';

export function InfoTooltip ({isOpen, registration, onClose}) {

    return (
        // <div className={`info-tooltip ${props.isOpen ? 'info-tooltip_opened':''}`}></div>
        <div className={`tooltip ${isOpen && 'tooltip_opened'}`}>
            <div className='tooltip__container'>
                <button className= 'tooltip__close' onClick = {onClose}>
                    <img className="tooltip__close-img" src={iconClose} alt="закрытие всплывающего окна"/>
                </button>
                <div className="tooltip__section">
                    <img className="tooltip__image" src={`${registration ? successful : notSuccessful}`} alt="Знак оповещающий о результате регистрации" />
                    <h2 className='tooltip__title'> {`${registration ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз."}`}</h2>
                </div>
            </div>
        </div>
    )
}

