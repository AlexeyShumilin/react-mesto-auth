import React from "react";
import mestologo from "../images/logo.svg";
import { Link } from "react-router-dom";

const Header = ({
  email,
  loggedIn,
  isSignInLocation: isSignInPlace,
  setSignInScreen,
  resetSignInScreen,
  handleSignOut,
}) => {
  return (
    <header className="header">
      <img alt="логотип Место" className="header__logo" src={mestologo} />
      <p className="header__text">{email}</p>
      {loggedIn && (
        <Link className="header__text" onClick={handleSignOut} to="/signin">
          Выйти
        </Link>
      )}
      {!loggedIn && isSignInPlace && (
        <Link className="header__text" onClick={resetSignInScreen} to="/signup">
          Регистрация
        </Link>
      )}
      {!loggedIn && !isSignInPlace && (
        <Link className="header__text" onClick={setSignInScreen} to="/signin">
          Войти
        </Link>
      )}
    </header>
  );
};

export default Header;
