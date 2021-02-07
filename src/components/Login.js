import React, {useState} from 'react';

const Login = ({onLogin}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailInput = (e) => setEmail(e.target.value);
    const handlePasswordInput = (e) => setPassword(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        onLogin(email, password);
    }

    return (
        <form name="login" className="signup" onSubmit={handleSubmit}>
            <h2 className="signup__title">Вход</h2>
            <input name="email" id="email" type="email" value={email} onChange={handleEmailInput}
                   className='signup__input' placeholder="Email" required/>
            <input name="password" id="password" type="password" minLength="6" value={password}
                   onChange={handlePasswordInput} className='signup__input' placeholder="Пароль" required/>
            <button type='submit' className='signup__button'>Вход</button>
        </form>
    );
}

export default Login;