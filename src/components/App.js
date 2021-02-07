import React, { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import DeletePopup from "./DeletePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import { authorize, register, tokenCheck } from "../utils/auth";

import { api } from "../utils/Api";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    isOpen: false,
    link: "",
    name: "",
  });
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [cardDelete, setCardDelete] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isSignInLocation, setIsSignInLocation] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [email, setEmail] = useState("");
  const history = useHistory();
  const [success, setSuccess] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  //receiving data
  React.useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getInitialCards()])
      .then((info) => {
        const [userInfo, cards] = info;
        setCurrentUser(userInfo);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    document.addEventListener("keydown", handleEscapeClose);
    document.addEventListener("mousedown", handleOverlayClose);

    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
      document.removeEventListener("mousedown", handleOverlayClose);
    };
  });

  //setstate

  const handleEditProfileClick = function () {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = function () {
    setAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = function () {
    setEditAvatarPopupOpen(true);
  };

  const handleDeleteCardClick = () => {
    setIsDeletePopupOpen(true);
  };

  function handleCardClick({ name, link }) {
    setSelectedCard({ isOpen: true, name: name, link: link });
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({ isOpen: false, link: "", name: "" });
  };

  function handleUpdateUser(data) {
    setLoading(true);
    api
      .editProfileInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  function handleUpdateAvatar(avatarLink) {
    setLoading(true);
    api
      .editAvatar(avatarLink)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  function handleEscapeClose(e) {
    if (e.key === "Escape") closeAllPopups();
  }

  function handleOverlayClose(e) {
    if (e.target.classList.contains("popup")) closeAllPopups();
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .setLike(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((err) => console.log(err));
    } else {
      api
        .removeLike(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((err) => console.log(err));
    }
  };

  function handleCardDeleteConfirm() {
    const isOwn = cardDelete._id === currentUser._id;
    setLoading(true);
    api
      .deleteCard(cardDelete._id, !isOwn)
      .then((newCard) => {
        // state update
        setCards(
          cards.filter((c) => (c._id === cardDelete._id ? !newCard : c))
        );
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  function handleAddPlaceSubmit(data) {
    setLoading(true);
    api
      .createNewCard(data)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  // Отмена всплытия для закрытия по клику по оверлею
  function noClose(e) {
    e.stopPropagation();
  }

  function handleCardDelete(card) {
    setCardDelete(card);
    handleDeleteCardClick();
  }

  // Log in
  const handleLogin = (_) => {
    setLoggedIn(true);
    history.push("/cards");
  };

  // Checking the token on page load
  useEffect(() => {
    checkToken();
  }, []);

  // lig out
  const handleSignOut = () => {
    localStorage.removeItem("token");
    setEmail("");
    setLoggedIn(false);
    setIsExpanded(false);
    setIsSignInLocation(true);
  };

  // Open the popup
  const infoToolTipOpen = (type) => {
    setSuccess(type);
    setIsInfoTooltipOpen(true);
  };

  // Authorization request
  const onLogin = (email, password) => {
    authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          handleLogin();
          setEmail(email);
        }
      })
      .catch((err) => {
        console.log(err);
        infoToolTipOpen(false);
      });
  };

  // Registration request
  const onRegister = (email, password) => {
    register(email, password)
      .then((res) => {
        if (res.data?._id) {
          infoToolTipOpen(true);
          history.push("/signin");
          setIsSignInLocation();
        }
      })
      .catch((err) => {
        console.log(err);
        infoToolTipOpen(false);
      });
  };

  // Token verification
  const checkToken = () => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      tokenCheck(token)
        .then((res) => {
          if (res.data?.email) {
            setEmail(res.data.email);
            handleLogin();
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          isExpanded={isExpanded}
          email={email}
          loggedIn={loggedIn}
          isSignInLocation={isSignInLocation}
          setSignInScreen={() => setIsSignInLocation(true)}
          resetSignInScreen={() => setIsSignInLocation(false)}
          handleSignOut={handleSignOut}
          resetEmail={() => setEmail("")}
          expand={() => setIsExpanded(!isExpanded)}
        />
        <Switch>
          <ProtectedRoute
            path="/cards"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onDeleteCard={handleDeleteCardClick}
            cards={cards}
          />

          <Route path="/signup">
            <Register
              setSignInScreen={() => setIsSignInLocation(true)}
              onRegister={onRegister}
            />
          </Route>

          <Route path="/signin">
            <Login onLogin={onLogin} />
          </Route>

          <Route path="/">
            {loggedIn ? <Redirect to="/cards" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>

        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <DeletePopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDeleteConfirm}
          isLoading={isLoading}
        />
        <InfoTooltip
          success={success}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          noClose={noClose}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
