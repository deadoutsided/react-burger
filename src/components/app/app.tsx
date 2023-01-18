import React from "react";
import logo from "../../logo.svg";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import style from "./app.module.css";
import dataApi from "../../utils/data";
import Modal from "../modal/modal";
import ModalOverlay from "../modal-overlay/modal-overlay";

function App() {

  const [state, setState] = React.useState({
    ingredientData: [],
    loading: false,
    error: false,
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
        <BurgerIngredients data={state.ingredientData} />
        <BurgerConstructor />
    </div>
  );
}

export default App;
