import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';

export function AddPlacePopup(props) {

    const[name, setName]=useState('');
    const[link, setLink]=useState('');

    function handleChangeNamePlace(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleAddPlaceSubmit(e) {
        e.preventDefault();
        
        props.onUpdateAdd({
            name,
            link
        })
    }

    useEffect(()=>{
        setName('');
        setLink('');
    }, [props.isOpen]);

    return(
        <PopupWithForm name='add' title='Новое место' isOpen={props.isOpen} onClose={props.onClose} buttonText = 'Создать' onSubmit={handleAddPlaceSubmit}>
            <input
                id="type-title"
                className="popup__input popup__input_type_title"
                type="text"
                name="nameCard"
                placeholder="Название"
                required
                minLength="2"
                maxLength="30"
                onChange={handleChangeNamePlace}
                value={name}
            />
            <span className="popup__error" id="type-title-error"></span>
            <input
                id="type-image"
                className="popup__input popup__input_type_image"
                type="url"
                name="linkCard"
                placeholder="Ссылка на картинку"
                required
                onChange={handleChangeLink}
                value={link}
            />
            <span className="popup__error" id="type-image-error"></span>
        </PopupWithForm>
    )
}