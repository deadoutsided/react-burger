import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './reset-password.module.css';
import { resetPassword } from '../../services/actions';

export function ResetPassword(){
  const dispatch = useDispatch();
  const { resetPasswordSuccess } = useSelector((store) => store.root);
  const [newPassword, setNewPassword] = useState('');
  const [emailToken, setEmailToken] = useState('');

  const changeNewPassword = (e) => {
    setNewPassword(e.target.value);
  }

  const changeEmailToken = (e) => {
    setEmailToken(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(newPassword, emailToken));
  }

  if(resetPasswordSuccess){
    return <Navigate to='/sign-in' />
  }

  return (
    <form className={style.container} onSubmit={onSubmit}>
      <h1 className='mb-6 text text_type_main-medium'>Восстановление пароля</h1>
      <PasswordInput placeholder='Введите новый пароль' extraClass="mb-6" name="newPassword" value={newPassword} onChange={changeNewPassword} />
      <Input placeholder='Введите код из письма' extraClass="mb-6" value={emailToken} onChange={changeEmailToken} />
      <Button extraClass="mb-20" htmlType="submit" type="primary" size="medium" >Сохранить</Button>
      <p className='text text_type_main-default text_color_inactive'>Вспомнили пароль? <Link to='/sign-in' className={'text text_type_main-default ' + style.link}>Войти</Link></p>
    </form>
  )
}