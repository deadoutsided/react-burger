import React, {useState, FC, FormEvent} from 'react';
import { useDispatch, useSelector } from '../../services/types/index';
import { Link, Navigate } from 'react-router-dom';
import { PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './reset-password.module.css';
import { resetPassword } from '../../services/actions';

export const ResetPassword: FC = () => {
  const dispatch = useDispatch();
  const { resetPasswordSuccess, authorized, forgotPasswordSuccess } = useSelector((store) => store.root);
  const [newPassword, setNewPassword] = useState('');
  const [emailToken, setEmailToken] = useState('');

  const changeNewPassword = (e: {target: HTMLInputElement}) => {
    setNewPassword(e.target.value);
  }

  const changeEmailToken = (e: {target: HTMLInputElement}) => {
    setEmailToken(e.target.value);
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(resetPassword(newPassword, emailToken));
  }

  if (authorized) {
    return <Navigate to="/" replace={true}/>;
  }

  if(!forgotPasswordSuccess){
    return <Navigate to="/forgot-password" replace={true} />;
  }

  if(resetPasswordSuccess){
    return <Navigate to='/sign-in' replace={true} />
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