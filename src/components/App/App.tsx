import React from 'react';
import logo from '../../logo.svg';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import './App.css';
import Data from '../utils/data';



function App() {
  return (
    <div className="App">
      <AppHeader />
      <BurgerIngredients data={Data} />
      <BurgerConstructor />
    </div>
  );
}

export default App;
