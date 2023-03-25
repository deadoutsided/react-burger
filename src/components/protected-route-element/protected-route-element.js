import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRouteElement({ element }){
  const { authorized } = useSelector((store) => store.root);
  if(!authorized){
    return null;
  }
  return authorized ? element : <Navigate to='/login' replace />
}