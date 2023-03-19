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
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { SignIn } from "../../pages/sign-in/sign-in";
import { Register } from "../../pages/register/register";
import { ForgotPassword } from "../../pages/forgot-password/forgot-password";
import { ResetPassword } from "../../pages/reset-password/reset-password";
import { Profile } from "../../pages/profile/profile";

function App() {
  const [orderState, setOrderState] = React.useState({
    loading: false,
    error: false,
    orderData: {},
  });

  return (
    <div className={style.App}>
      <AppHeader />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
              </DndProvider>
            }
          ></Route>
          <Route path="/sign-in" element={ <SignIn />} />
          <Route path="/register" element={ <Register />} />
          <Route path="/forgot-password" element={ <ForgotPassword /> } />
          <Route path="/reset-password" element={ <ResetPassword /> } />
          <Route path="/profile" element ={ <Profile /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
