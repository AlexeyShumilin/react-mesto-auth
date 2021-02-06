import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../context/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    function handleNameUpdater(e) {
        setName(e.target.value);
    }

    function handleDescriptionUpdater(e) {
        setDescription(e.target.value);
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            title="Редактировать профиль"
            name="edit-profile"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            submitTitle={"Сохранить"}
        >
            <input
                id="author-input"
                className="popup__item"
                onChange={handleNameUpdater}
                value={name || ""}
                type="text"
                name="name"
                placeholder="Введите имя"
                minLength="2"
                maxLength="40"
                pattern="[a-zA-Zа-яёА-ЯЁ\s-]*"
                required
            />
            <input
                id="about-input"
                className="popup__item"
                onChange={handleDescriptionUpdater}
                value={description || ""}
                type="text"
                name="about"
                placeholder="Расскажите о себе"
                minLength="2"
                maxLength="200"
                required
            />
        </PopupWithForm>
    );
}

export default EditProfilePopup;
