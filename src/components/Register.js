import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Register = ({ onRegister, setSignInScreen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    onRegister(email, password);
  };

  const onSignInClick = (_) => {
    history.push("/signin");
    setSignInScreen();
  };

  return (
    <form name="login" className="signup" onSubmit={handleSubmit}>
      <h2 className="signup__title">Регистрация</h2>
      <input
        name="email"
        className="signup__input"
        id="email"
        type="email"
        value={email}
        onChange={handleEmailInput}
        placeholder="Email"
        required
      />
      <input
        name="password"
        className="signup__input"
        id="password"
        type="password"
        minLength="6"
        value={password}
        onChange={handlePasswordInput}
        placeholder="Пароль"
        required
      />
      <button type="submit" className="signup__button">
        Зарегистрироваться
      </button>
      <p className="signup__text" onClick={onSignInClick}>
        Вы зарегистрированы? Вход
      </p>
    </form>
  );
};

export default Register;
