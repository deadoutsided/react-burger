import React from "react";
import thunk from "redux-thunk";
import logo from "../../logo.svg";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import style from "./app.module.css";
import dataApi from "../../utils/data";
import Modal from "../modal/modal";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { OrderContext } from "../../services/order-context";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

function App() {
  const [orderState, setOrderState] = React.useState({
    loading: false,
    error: false,
    orderData: {},
  });

  return (
    <div className={style.App}>
      <AppHeader />
      <OrderContext.Provider value={[orderState, setOrderState]}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </OrderContext.Provider>
    </div>
  );
}

export default App;
