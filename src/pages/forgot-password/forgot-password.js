import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './forgot-password.module.css';

export function ForgotPassword(){
  const [email, setEmail] = useState('');

  const changeEmail = (e) => {
    setEmail(e.target.value);
  }

  return (
    <div className={style.container}>
      <h1 className='mb-6 text text_type_main-medium'>Восстановление пароля</h1>
      <EmailInput extraClass={"mb-6 "} name="email" placeholder="Login" value={email} isIcon={false} onChange={changeEmail} />
      <Button extraClass="mb-20" htmlType="submit" type="primary" size="medium" >Восстановить</Button>
      <p className='text text_type_main-default text_color_inactive'>Вспомнили пароль? <Link to="/sign-in" className={'text text_type_main-default ' + style.link}>Войти</Link></p>
    </div>
  )
}