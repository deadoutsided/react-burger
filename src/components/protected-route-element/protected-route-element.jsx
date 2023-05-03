import React from 'react';
import propTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function ProtectedRouteElement({ element }){
  const { authorized } = useSelector((store) => store.root);
  const {pathname} = useLocation();
  const url = window.location.href;
  return authorized ? element : <Navigate to='/login' reaplace state={{path: pathname, url, title: 'destination'}}  />
}

ProtectedRouteElement.propTypes = {
  element: propTypes.element
}.isRequired;