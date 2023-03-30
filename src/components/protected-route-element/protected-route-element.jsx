import React, {useEffect} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function ProtectedRouteElement({ element }){
  const { authorized } = useSelector((store) => store.root);
  const {state, pathname} = useLocation();
  const url = window.location.href;
  return authorized ? element : <Navigate to='/sign-in' reaplace state={{path: pathname, url, title: 'destination'}}  />
}