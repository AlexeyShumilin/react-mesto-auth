import React from "react";

function ImagePopup({onClose, card}) {
    return (
        <div className={`popup img-popup ${card.isOpen && "img-popup_is-opened"}`}>
            <div className="img-popup__content">
                <button className="popup__close" onClick={onClose}/>
                <img
                    className="img-popup__place"
                    src={card && card.link}
                    alt={card && card.name}
                />
                <p className="img-popup__caption">{card && card.name}</p>
            </div>
        </div>
    );
}

export default ImagePopup;
