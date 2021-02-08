import cn from "classnames";

const InfoTooltip = ({ isOpen, success, onClose }) => {
  return (
    <section
      className={cn("popup", { "popup_is-opened": isOpen })}
      onClick={onClose}
    >
      <div className="popup-info" onClick={onClose}>
        <button
          type="button"
          name="Закрыть"
          className="popup-info__close-button"
          onClick={onClose}
        ></button>
        <div
          className={cn("popup-info__icon", {
            "popup-info__icon_type_cancel": !success,
          })}
        ></div>
        <p className="popup-info__message">
          {" "}
          {success ? "Вы зарегистрировались!" : "Что-то не так!"}
        </p>
      </div>
    </section>
  );
};

export default InfoTooltip;
