import React, { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm.js';

export function EditAvatarPopup(props) {

    const inputRef = useRef(null)
     
    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
            avatar: inputRef.current.value
        });
    } 

    useEffect(()=>{
        inputRef.current.value=''
    }, [props.isOpen]);

    return(
        <PopupWithForm name='avatar' title='Обновить аватар' isOpen={props.isOpen} onClose={props.onClose} buttonText = 'Сохранить' onSubmit={handleSubmit}>
            <input
                id="type-avatar"
                className="popup__input popup__input_type_avatar"
                type="url"
                name="avatar"
                placeholder="Ссылка на аватар"
                required
                ref={inputRef}
            />
            <span className="popup__error" id="type-avatar-error"></span>
        </PopupWithForm>
    )
}