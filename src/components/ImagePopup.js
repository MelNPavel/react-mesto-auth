import React from 'react';
import iconClose from '../image/Close-Icon.svg';

function ImagePopup (props) {

    return (
    <div className={`popup popup_image_background ${props.card && 'popup_opened'}`}>
        <div className="popup__image-container">
            <figure className="popup__foto-block">
                <img className="popup__foto" src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : ''}/>
                <figcaption className="popup__foto-name">{props.card ? props.card.name : ''}</figcaption>
                <button className= "popup__close popup__close_place_foto" type="button">
                    <img className="popup__close-img"  src={iconClose} alt="закрытие всплывающего окна" onClick = {props.onClose}/>
                </button>
            </figure>
        </div>
    </div>
    )
}

export default ImagePopup