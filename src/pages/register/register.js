import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './register.module.css';
import { getRegistrationData } from '../../services/actions';

export function Register(){
  const dispatch = useDispatch();

  const [emailValue, setEmail] = useState('cc');
  const [password, setPassword] = useState('123');
  const [nameValue, setName] = useState('sos');

  const changeEmail = (e) => {
    setEmail(e.target.value)
  }

  const changePassword = (e) => {
    setPassword(e.target.value);
  }

  const changeName = (e) => {
    setName(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(getRegistrationData(nameValue, emailValue, password));
  }

  return(
    <form className={style.container}>
      <h1 className={'mb-6 text text_type_main-medium '}>Регистрация</h1>
      <Input extraClass={'mb-6'} onChange={changeName} value={nameValue} placeholder='Имя' />
      <EmailInput extraClass='mb-6' name='email' placeholder='E-mail' value={emailValue} onChange={changeEmail} />
      <PasswordInput extraClass='mb-6' onChange={changePassword} name='password' value={password}  />
      <Button onClick={onSubmit} extraClass='mb-20' htmlType="submit" type="primary" size="medium">Регистрация</Button>
      <p className={"text text_type_main-default text_color_inactive"}>Уже зарегистрированы? <Link to='/sign-in' className={"text text_type_main-default " + style.link}>Войти</Link></p>
    </form>
  )
}