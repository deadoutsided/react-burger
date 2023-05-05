import React, { FC, ReactElement } from 'react';
import propTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/types/index';

type TProtectedProps = {
  element: ReactElement;
}

export const ProtectedRouteElement: FC<TProtectedProps> = ({ element }) => {
  const { authorized } = useSelector((store) => store.root);
  const {pathname} = useLocation();
  const url = window.location.href;
  return authorized ? element : <Navigate to='/login' replace state={{path: pathname, url, title: 'destination'}}  />
}