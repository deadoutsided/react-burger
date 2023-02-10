import React from "react";
import logo from "../../logo.svg";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import style from "./app.module.css";
import dataApi from "../../utils/data";
import Modal from "../modal/modal";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { BurgerIngredientsContext } from '../../services/burger-ingredients-context';
import { OrderContext } from '../../services/order-context';

function App() {

  const [state, setState] = React.useState({
    ingredientData: [],
    loading: false,
    error: false
  });

  const [orderState, setOrderState] = React.useState({
    loading: false,
    error: false,
    orderData: {}
  });

  React.useEffect(() => {
    const getIngredientData = async () => {
       setState({
        ...state,
        loading: true,
      });
      await fetch(dataApi)
      .then(res => {
        if(res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then(async (data) => {
        setState({
          ...state,
          ingredientData: data.data,
          loading: false,
        })
      })
      .catch((err) => {
        console.log(err);
      });
    }
    getIngredientData();
  }, []);

  return (
    <div className={style.App}>
        <AppHeader />
        <BurgerIngredientsContext.Provider value={[state, setState]}>
          <OrderContext.Provider value={[orderState, setOrderState]}>
            <BurgerIngredients />
            <BurgerConstructor />
          </OrderContext.Provider>
        </BurgerIngredientsContext.Provider>
    </div>
  );
}

export default App;
