import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({onClose, isOpen, onAddPlace, isLoading}) {
    const nameRef = React.useRef();
    const linkRef = React.useRef();

    React.useEffect(() => {
        nameRef.current.value = "";
        linkRef.current.value = "";
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPlace({
            name: nameRef.current.value,
            link: linkRef.current.value,
        });
    };

    return (
        <PopupWithForm
            title="Новое место"
            name="new-place"
            onSubmit={handleSubmit}
            isOpen={isOpen}
            onClose={onClose}
            submitTitle={`${isLoading ? "Сохраняю" : "Добавить"}`}
        >
            <input
                ref={nameRef}
                id="name-input"
                className="popup__item"
                type="text"
                required
                placeholder="Название"
                name="name"
                minLength={"1"}
                maxLength={"30"}
            />
            <input
                id="link-input"
                className="popup__item"
                type="url"
                required
                ref={linkRef}
                placeholder="Ссылка на картинку"
                name="link"
            />
        </PopupWithForm>
    );
}

export default AddPlacePopup;
