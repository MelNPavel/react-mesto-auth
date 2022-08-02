import React, { useState, useEffect } from 'react';
import buttonEdit from '../image/button-edit.svg';
import buttonAdd from '../image/add-button.svg';
import Card from './Card.js';
import { CurrentUserContext } from '../context/CurrentUserContext.js';

function Main({onAddPlace, onEditProfile, onEditAvatar, cardClick, cards, onCardLike, onCardDelete}) {
    
    const currentUser = React.useContext(CurrentUserContext);
    
    const [avatar, setAvatar]=useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if(currentUser) {
        setAvatar(currentUser.avatar);
        setName(currentUser.name);
        setDescription(currentUser.about);
    }}, [currentUser]);

    function getCardsClick(card) {
        cardClick(card)
    }

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__item">
                    <a
                        className="profile__avatar"
                        onClick={onEditAvatar}
                        style={{ backgroundImage: `url(${avatar})` }}
                    ></a>
                    <div className="profile__info">
                        <div className="profile__info-item">
                            <h1 className="profile__info-name">{name}</h1>
                            <button className="profile__edit-button" type="button" onClick={onEditProfile}>
                                <img className="profile__edit-icon" src={buttonEdit} alt="Кнопка редактирования" />
                            </button>
                        </div>
                        <p className="profile__info-about">{description}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" onClick={onAddPlace} >
                    <img className="profile__add-image" src={buttonAdd} alt="Кнопка добавления" />
                </button>
            </section>
            
            <ul className="element">
                {cards.map((item) => {
                    return (
                        <Card
                            key={item._id}
                            cardId={item._id}
                            name={item.name}
                            link={item.link}
                            likeUser={item.likes}
                            like={item.likes.length}
                            ownerId={item.owner._id}
                            onCardClick={getCardsClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />)
                })}
            </ul>
        </main>
    )
};

export default Main;