import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './reset-password.module.css';

export function ResetPassword(){
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const changeNewPassword = (e) => {
    setNewPassword(e.target.value);
  }

  const changeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  }

  return (
    <div className={style.container}>
      <h1 className='mb-6 text text_type_main-medium'>Восстановление пароля</h1>
      <PasswordInput extraClass="mb-6" name="newPassword" value={newPassword} onChange={changeNewPassword} />
      <PasswordInput extraClass="mb-6" name="confirmPassword" value={confirmPassword} onChange={changeConfirmPassword} />
      <Button extraClass="mb-20" htmlType="submit" type="primary" size="medium" >Сохранить</Button>
      <p className='text text_type_main-default text_color_inactive'>Вспомнили пароль? <Link to='/sign-in' className={'text text_type_main-default ' + style.link}>Войти</Link></p>
    </div>
  )
}