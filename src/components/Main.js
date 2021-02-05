import React from "react";
import Card from "./Card.js";
import avatarEdit from "./../images/avatar-edit.svg";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const {
    cards,
    onEditAvatar,
    onEditProfile,
    onAddPlace,
    onCardDelete,
    onCardLike,
    onCardClick,
  } = props;
  return (
    <main className="content">
      <div className="profile page__profile">
        <img
          className="profile__avatar"
          src={currentUser.avatar}
          alt="аватар"
        />
        <img
          className="profile__edit"
          src={avatarEdit}
          alt="avatarEdit"
          onClick={onEditAvatar}
        />
        <div className="user-info">
          <div className="user-info__data">
            <div className="user-info__name-data">
              <h1 className="user-info__name">{currentUser.name}</h1>
              <button
                className=" button user-info__edit-button"
                type="button"
                aria-label="Редактировать профиль"
                onClick={onEditProfile}
              />
            </div>
            <p className="user-info__about">{currentUser.about}</p>
          </div>
          <button
            className="button user-info__add-button"
            type="button"
            aria-label="Добавить элемент"
            onClick={onAddPlace}
          />
        </div>
      </div>
      <section className="elements" aria-label="элементы">
        {cards.map((item, index) => (
          <Card
            key={index}
            card={item}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            onCardClick={onCardClick}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
