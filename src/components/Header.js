import React from "react";
import mestologo from "../images/logo.svg";

const Header = () => {
  return (
    <header className="header">
      <img alt="логотип Место" className="header__logo" src={mestologo} />
    </header>
  );
};

export default Header;
