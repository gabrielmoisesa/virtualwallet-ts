import { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveEmail } from '../../redux/actions';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateInputs = (newEmail: string, newPassword: string) => {
    const emailRegex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/;
    const isEmailValid = emailRegex.test(newEmail);
    const isPasswordValid = newPassword.length >= 6;
    setIsDisabled(!isEmailValid || !isPasswordValid);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    validateInputs(newEmail, password);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validateInputs(email, newPassword);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(saveEmail(email));
    navigate('/carteira');
  };

  return (
    <div className="center-content">
      <form className="login-form" onSubmit={ handleSubmit }>
        <h1>
          Log
          <span className="blue-100-text">in</span>
        </h1>
        <label>
          E-mail
          <input
            type="text"
            data-testid="email-input"
            value={ email }
            onChange={ handleEmailChange }
          />
        </label>
        <label>
          Senha
          <input
            type="password"
            data-testid="password-input"
            value={ password }
            onChange={ handlePasswordChange }
          />
        </label>
        <button className="login-btn" disabled={ isDisabled } type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
