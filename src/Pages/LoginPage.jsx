import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage(props) {
  const { handleSuccessLogin } = props;
  const [loginData, setLoginData] = React.useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({
    email: '',
    password: '',
    validateValues: '',
  });
  const navigate = useNavigate();
  function handleChange(e) {
    const { value, name } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  function handleBlur(e, item) {
    const { name } = e.target;
    if (item === '') {
      setErrors((prevData) => ({
        ...prevData,
        [name]: 'Поле является обязательным',
      }));
    }
    if (loginData.email) {
      const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
      if (!reg.test(loginData.email)) {
        setErrors((prevData) => ({
          ...prevData,
          email: 'Введен некорректный адрес почты',
        }));
      }
    }
  }
  function handleFocus(e) {
    const { name } = e.target;
    setErrors((prevData) => ({
      ...prevData,
      [name]: '',
      validateValues: '',
    }));
  }
  function handleClick() {
    if (!errors.email && !errors.password) {
      fetch('/api/sessions/auth', {
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
      })
        .then((response) => {
          if (response.status === 201) {
            handleSuccessLogin();
            navigate('/orders');
          } else if (response.status === 401) {
            setErrors((prevData) => ({
              ...prevData,
              validateValues: 'Неверные данные для авторизации',
            }));
          }
        });
    }
  }
  return (
    <div className="block">
      <div className="wrapper">
        <h1>Войдите, чтобы продолжить</h1>
        <input
          type="text"
          className={(errors.email || errors.invalidEmail) ? 'red-frame' : ''}
          value={loginData.email}
          name="email"
          placeholder="E-mail"
          onChange={handleChange}
          onBlur={(e) => handleBlur(e, loginData.email)}
          onFocus={handleFocus}
        />
        <span className="span error-message">{errors.email}</span>
        <input
          type="password"
          className={errors.password ? 'red-frame' : ''}
          value={loginData.password}
          name="password"
          placeholder="Password"
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleBlur(e, loginData.password)}
          onFocus={(e) => handleFocus(e)}
        />
        <span className="span error-message">{errors.password}</span>
        <span className="span forgot-password"><a href="http://www.google.com">Забыли пароль?</a></span>
        <span className="span error">{errors.validateValues}</span>
        <button className="button button--login" type="button" onClick={handleClick}>Войти</button>
        <p>Или зарегистрируйтесь, если еще нет аккаунта</p>
        <button className="button button--register" type="button">Зарегистрироваться</button>
      </div>
    </div>
  );
}
