import React, { useState, useEffect} from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

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
import { Login } from "./Login.js";
import { Register } from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import { InfoTooltip } from "./InfoTooltip.js";
import { auth } from "./Auth.js";
import { authIn } from "./Auth.js";

function App() {
   
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [currentUser, setcurrentUser] = useState(null);
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [infoTooltip, setInfoTooltip] = useState(false);

    function handleInfotooltip() {
        setInfoTooltip(true);
    }

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
        setInfoTooltip(false);

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
    
    //Регистрация
    const handleRegister = (data) => {
        auth(data.email, data.password)
            .then((res) => {
                return res;
            })
            .catch((err) => console.log(err));
    }

    //Вход через логин
    const handleLogin = (data) => {
        authIn(data.email, data.password)
            .then((res) => {
                return res;
            })
            .catch((err) => console.log(err));
    }
    
    //Проверка перед входом
     
    
    return (

        <CurrentUserContext.Provider value={currentUser}>            
            <div className="page">
            <Header />
            <Switch>
                <ProtectedRoute
                    exact path="/"    
                    loggedIn={loggedIn}
                    component={Main}    
                    onAddPlace={handleAddPlaceClick}
                    onEditProfile={handleEditProfileClick}
                    onEditAvatar={handleEditAvatarClick}
                    cardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike} 
                    onCardDelete={handleCardDelete}
                />        
                
                <Route path="/signin">
                    <Login 
                    isOpen={infoTooltip}
                    onUpdateAuth={handleLogin}
                    />
                </Route>

                <Route path="/signup">
                    <Register 
                        onSubmitReg={handleInfotooltip}
                        onUpdateAuth = {handleRegister}
                    />
                </Route>    
            </Switch>
            <Footer />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onUpdateAdd={handleAddPlaceSubmit} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} /> 
                <PopupWithForm name='consent' title='Вы уверены?' onClose={closeAllPopups} buttonText = 'да' />
                <InfoTooltip isOpen={infoTooltip} onClose={closeAllPopups} />
            </div>            
            
        </CurrentUserContext.Provider>
    );
}

export default App;
