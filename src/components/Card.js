import React from 'react';

import { CurrentUserContext } from '../context/CurrentUserContext.js';

function Card (props) {

    const currentUser = React.useContext(CurrentUserContext);
 
    const isOwn = props.ownerId === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__card-remove ${isOwn ? 'element__card-remove_visible' : 'element__card-remove_hidden'}`
    ); 

    function handleDeleteClick() {
        props.onCardDelete(props)};

    function handleLikeClick (){
        props.onCardLike(props)};
    
    const isLiked = props.likeUser.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `element__like ${isLiked ? 'element__like_black' : ''}`
    ); 

    function handleClick() {
        props.onCardClick(props);
    }

    return (
        <li className="element__card">
            <img className="element__img" src={props.link} alt={props.name} onClick = {handleClick}/>
            <button className={cardDeleteButtonClassName} type="button" onClick = {handleDeleteClick}></button>
            <div className="element__item">
                <h2 className="element__title">{props.name}</h2>
            <div className="element__like-container">
                <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                <p className="element__like-count">{props.like}</p>
            </div>
            </div>
        </li>
    )
}

export default Card;