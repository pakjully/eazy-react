import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [isValidForm, setIsValidForm] = React.useState(false);
  const [loginData, setLoginData] = React.useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({
    email: '',
    password: '',
    validateValues: '',
  });
  function checkValues() {
    if (!errors.email && !errors.password) {
      setIsValidForm(true);
    }
  }
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
  }
  function handleFocus(e) {
    const { name } = e.target;
    setErrors((prevData) => ({
      ...prevData,
      [name]: '',
      validateValues: '',
    }));
  }
  async function handleClick() {
    checkValues();
    if (isValidForm) {
      await fetch('/api/sessions/auth', {
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
            alert('Вы вошли');
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
          className={errors.email || errors.invalidEmail ? 'red-frame' : ''}
          value={loginData.email}
          name="email"
          placeholder="E-mail"
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleBlur(e, loginData.email)}
          onFocus={(e) => handleFocus(e)}
        />
        <span className="span error-message">{errors.email}</span>
        <input
          type="text"
          className={errors.password ? 'red-frame' : ''}
          value={loginData.password}
          name="password"
          placeholder="Password"
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleBlur(e, loginData.password)}
          onFocus={(e) => handleFocus(e)}
        />
        <span className="span error-message">{errors.password}</span>
        <span className="span forgot-password">Забыли пароль?</span>
        <span className="span error">{errors.validateValues}</span>
        <button className="button button--login" type="button" onClick={handleClick}>Войти</button>
        <p>Или зарегистрируйтесь, если еще нет аккаунта</p>
        <button className="button button--register" type="button">Зарегистрироваться</button>
      </div>
    </div>
  );
}
