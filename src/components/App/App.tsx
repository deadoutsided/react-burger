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

  const modalPlace = React.useRef(null);

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
      .then(res => res.json())
      .then(async (data) => {
        setState({
          ...state,
          ingredientData: data.data,
          loading: false,
        });
      })
    }
    getIngredientData();
  }, []);

  return (
    <div ref={modalPlace} className={style.App}>
        <AppHeader />
        <BurgerIngredients modal={modalPlace} data={state.ingredientData} />
        <BurgerConstructor modal={modalPlace} />
    </div>
  );
}

export default App;
