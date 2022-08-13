import React, { useState, useEffect} from 'react';
import { Switch, Route, useHistory } from "react-router-dom";

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
import { auth, authorize, getContent } from "../utils/Auth.js";

function App() {
   
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [currentUser, setcurrentUser] = useState(null);
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [infoTooltip, setInfoTooltip] = useState(false);
    const history = useHistory();
    const [registration, setRegistration] = useState("");
    const [email, setEmail] = useState("");

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
        if (loggedIn){
        api.getUserInfo()
            .then((res) => {
                setcurrentUser(res)
            })
            .catch((err) => {
                console.log ('Ошибка' + err);
              })
}}, [loggedIn])

    //Загрузка карточек первоначальная
    useEffect(() => {
        if (loggedIn){
        api.getTasksCards()
            .then(res => {
                setCards(res)
            })
            .catch((err) => {
                console.log ('Ошибка' + err);
            })
}}, [loggedIn])

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
    
    //Если есть токен заходи
    const tokenCheck = () => {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            return;
        }
            getContent(jwt)
                .then((res) => {
                    setLoggedIn(true);
                    setEmail(res.data.email);
                    history.push ('/');
                })
                .catch((err) => console.log(err));
    }

    // useEffect((loggedIn, history) => {
    //     if (loggedIn){
    //         history.push ('/')
    //     }
    //  }, [loggedIn]);

    //Регистрация
    const handleRegister = (data) => {
        auth(data.email, data.password)
            .then((res) => {
                if (res.data) {
                    setInfoTooltip(true);
                    setRegistration(true);
                    setLoggedIn(true);
                    setEmail(data.email);
                    history.push ('/signin');
                }
            })
            .catch((err) => {
                setInfoTooltip(true);
                setRegistration(false);
                setLoggedIn(false);
                console.log(err);
                }
            );
    }

    //Вход через логин
    const handleLogin = (data) => {
        authorize(data.email, data.password)
            .then((res) => {
                if (res.token) {
                setLoggedIn(true);
                localStorage.setItem('jwt', res.token);
                setEmail(data.email);
                history.push ('/');
    }})
            .catch((err) => {
                console.log(err)
            setInfoTooltip(true);
            setRegistration(false);
        });
    }

    //Выход
    const onlogOut = () => {
        setLoggedIn(false);
        localStorage.removeItem('jwt');
        setEmail("");
    }

    useEffect(()=>{
        tokenCheck();
     }, []);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
            <Header onlogOut={onlogOut}
            emailHeader={email} 
            />
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
                        onUpdateAuth={handleLogin}
                    />
                </Route>

                <Route path="/signup">
                    <Register
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
                <InfoTooltip isOpen={infoTooltip} registration={registration} onClose={closeAllPopups} />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;