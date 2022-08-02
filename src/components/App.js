import React, { useState, useEffect} from 'react';

import Header from '../components/Header.js';
import Main from './Main.js';
import Footer from '../components/Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import { CurrentUserContext } from '../context/CurrentUserContext.js';
import { EditProfilePopup } from './EditProfilePopup.js';
import { EditAvatarPopup } from './EditAvatarPopup.js';
import { AddPlacePopup } from './AddPlacePopup.js';

function App() {
   
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [currentUser, setcurrentUser] = useState(null);
    const [cards, setCards] = useState([]);

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(null);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }  

    //Загрузка первоначальных данных пользователя
    useEffect(() => {
        api.getUserInfo()
            .then((res) => {
                setcurrentUser(res)
            })
            .catch((err) => {
                console.log ('Ошибка' + err);
              })
    }, [])

    //Загрузка карточек первоначальная
    useEffect(() => {
        api.getTasksCards()
            .then(res => {
                setCards(res)
            })
            .catch((err) => {
                console.log ('Ошибка' + err);
            })
    }, [])

    //Обновление данных пользователя
    function handleUpdateUser(data) {
        api.addUser(data)
            .then((res) => {
                setcurrentUser(res)
                closeAllPopups()
            })
            .catch((err) => {
                console.log ('Ошибка' + err);
            })
    }
    
    //Обновление автара
    function handleUpdateAvatar(data) {
        api.avatar(data)
            .then((res) => {
                setcurrentUser(res)
                closeAllPopups()
            })
            .catch((err) => {
                console.log ('Ошибка' + err);
            })
    }

    //Лайки
    function handleCardLike(card) {
        const isLiked = card.likeUser.some(i => i.cardId === currentUser._id);
        api.likePut(card.cardId, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map(
                    (c) => c._id === card.cardId ? newCard : c))})
            .catch((err) => {
                console.log ('Ошибка' + err);
            })
        api.likeUnPut(card.cardId, isLiked)
            .then((newCard) => {
                setCards((state) => state.map(
                (c) => c._id === card.cardId ? newCard : c))})
            .catch((err) => {
                console.log ('Ошибка' + err);
             })
    } 

    //удаление карточки
    function handleCardDelete(card) {
        api.deleteCard(card.cardId)
            .then ((res) => {
                setCards(prevCards=> prevCards.filter(item => item._id !== card.cardId))
            })
            .catch((err) => {
                console.log ('Ошибка' + err);
             })                
    }

     //добавление карточки
    function handleAddPlaceSubmit(data) {
        api.addCard(data)
            .then ((newCard) => {
                setCards([newCard, ...cards])
                closeAllPopups()
            })   
            .catch((err) => {
                console.log ('Ошибка' + err);
             })
    }
    
    return (

        <CurrentUserContext.Provider value={currentUser}>            
            <div className="page">
                <Header />
                <Main
                    onAddPlace={handleAddPlaceClick}
                    onEditProfile={handleEditProfileClick}
                    onEditAvatar={handleEditAvatarClick}
                    cardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike} 
                    onCardDelete={handleCardDelete}
                />

                <Footer />
                <ImagePopup
                    card={selectedCard} onClose={closeAllPopups}
                />
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onUpdateAdd={handleAddPlaceSubmit} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} /> 
                <PopupWithForm name='consent' title='Вы уверены?' onClose={closeAllPopups} buttonText = 'да' />
            </div>            
        </CurrentUserContext.Provider>
    );
}

export default App;
