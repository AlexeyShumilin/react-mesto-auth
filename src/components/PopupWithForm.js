import React from "react";

function PopupWithForm({
  onSubmit,
  name,
  title,
  onClose,
  submitTitle,
  children,
  isOpen,
}) {
  return (
    <div className={`popup popup-${name} ${isOpen && "popup_is-opened"}`}>
      <form
        className="popup__container"
        method="GET"
        name={`${name}`}
        onSubmit={onSubmit}
        action="#"
        noValidate
      >
        <button className="popup__close" onClick={onClose} type="reset" />
        <h2 className="popup__title">{title}</h2>
        {children}
        <button className="popup__save" type="submit">
          {submitTitle}
        </button>
      </form>
    </div>
  );
}

export default PopupWithForm;
