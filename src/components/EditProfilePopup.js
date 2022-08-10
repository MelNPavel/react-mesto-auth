import React, { useState, useEffect} from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../context/CurrentUserContext.js'

export function EditProfilePopup(props) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const currentUser = React.useContext(CurrentUserContext);

    useEffect(() => {
        if(currentUser) {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }}, [currentUser, props.isOpen]); 

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit (e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }
        
    return(
        <PopupWithForm name='edit' title='Редактировать профиль' isOpen={props.isOpen} onClose={props.onClose} buttonText = 'Сохранить' onSubmit={handleSubmit}>
            <input
                id="type-name"
                className="popup__input popup__input_type_name"
                type="text"
                name="nameProfile"
                placeholder={name}
                minLength="2"
                maxLength="40"
                required
                onChange={handleChangeName}
                value={name}
            />
            <span className="popup__error type-name-error"></span>
            <input
                id="type-about"
                className="popup__input popup__input_type_about"
                type="text"
                name="aboutProfile"
                placeholder={description}
                minLength="2"
                maxLength="400"
                required
                onChange={handleChangeDescription}
                value={description}
            />
            <span className="popup__error" id="type-about-error"></span>
      </PopupWithForm>
)}