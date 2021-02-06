import React from "react";
import {CurrentUserContext} from "../context/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleCardDelete() {
        onCardDelete(card);
    }

    const isOwn = card.owner._id === currentUser._id;

    const cardDeleteButtonClassName = `element__delete-icon ${
        isOwn ? "element__delete-icon_active" : ""
    }`;
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    const cardLikeButtonClassName = `element__like ${
        isLiked ? "element__like_clicked" : ""
    }`;

    return (
        <div className="element">
            <button
                className={cardDeleteButtonClassName}
                onClick={handleCardDelete}
                type="button"
                aria-label="Удалить"
            />
            <img
                className="element__image"
                src={card.link}
                onClick={handleClick}
                alt={card.link}
            />
            <div className="element__information">
                <p className="element__title">{card.name}</p>
                <div className="element__like">
                    <button
                        className={cardLikeButtonClassName}
                        onClick={handleLikeClick}
                        type="button"
                        aria-label="'лайк'"
                    />
                    <p className="element__like-number">
                        {card.likes.length > 0 ? `${card.likes.length}` : 0}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Card;
