import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeletePopup({isOpen, onClose, onSubmit, isLoading}) {
    function handleSubmit(e) {
        e.preventDefault();
        onSubmit();
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            title="Вы уверены?"
            name="confirm"
            isOpen={isOpen}
            isLoading={isLoading}
            onClose={onClose}
            submitTitle={`${isLoading ? "Удаление" : "Да"}`}
        />
    );
}

export default DeletePopup;
