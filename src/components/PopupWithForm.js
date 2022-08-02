import React from 'react';
import iconClose from '../image/Close-Icon.svg';

function PopupWithForm (props) {

    return(
        <div className={`popup popup_${props.name}_type ${props.isOpen ? 'popup_opened':''}`}>
            <div className={`popup__container popup__container_type_${props.name}`}>
                <button className= {`popup__close popup__close_type_${props.name} type="button`} onClick = {props.onClose} >
                    <img className="popup__close-img" src={iconClose} alt="закрытие всплывающего окна"/>
                </button>
                <h2 className={`popup__title popup__title_type_${props.name}`}>{props.title}</h2>
                <form className={`popup__form popup__form_type_${props.name}`} name={props.name} onSubmit={props.onSubmit}>
                    {[props.children]}
                <button className="popup__button" type="submit">{props.buttonText}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;