import React from "react";
import iconClose from '../image/Close-Icon.svg';
import inOk from '../image/union.svg';
import inNo from '../image/ununion.svg';

export function InfoTooltip (props) {

    return (
        // <div className={`info-tooltip ${props.isOpen ? 'info-tooltip_opened':''}`}></div>
        <div className={`tooltip ${props.isOpen ? 'tooltip_opened':''}`}>
            <div className='tooltip__container'>
                <button className= 'tooltip__close' onClick = {props.onClose}>
                    <img className="tooltip__close-img" src={iconClose} alt="закрытие всплывающего окна"/>
                </button>
                <div className="tooltip__section">
                    <img className="tooltip__image" src={inOk} alt="Знак оповещающий о результате регистрации" />
                    <h2 className='tooltip__title'> Вы успешно зарегистрировались!</h2>
                </div>
            </div>
        </div>

    )
}

