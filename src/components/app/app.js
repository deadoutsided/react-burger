import React, { useEffect } from "react";
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
import { getCookie } from "../../utils/cookie";
import { useDispatch, useSelector } from "react-redux";
import { SET_AUTHORIZED } from "../../services/actions";
import { ProtectedRouteElement } from "../protected-route-element/protected-route-element";

function App() {
  const dispatch = useDispatch();
  const { authData, modalState } = useSelector((store) => store.root);

  useEffect(() => {
    if (getCookie("token") !== undefined) {
      dispatch({ type: SET_AUTHORIZED, bool: true });
      console.log(getCookie("token"));
    } else {
      dispatch({ type: SET_AUTHORIZED, bool: false });
    }
  }, [authData]);

  return (
    <div className={style.App}>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route
            path="/ingredients?/:id?"
            element={
              <>
                {/*<AppHeader />*/}
                <DndProvider backend={HTML5Backend}>
                  <BurgerIngredients />
                  {modalState && (<BurgerConstructor />)}
                </DndProvider>
              </>
            }
          ></Route>
          {/*<Route path="/ingredients/:id" element={} />*/}
          <Route
            path="/sign-in"
            element={
              <>
                {/*<AppHeader />*/}
                <SignIn />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                {/*<AppHeader />*/}
                <Register />
              </>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <>
                {/*<AppHeader />*/}
                <ForgotPassword />
              </>
            }
          />
          <Route
            path="/reset-password"
            element={
              <>
                {/*<AppHeader />*/}
                <ResetPassword />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                element={
                  <>
                    {/*  <AppHeader />*/}
                    <Profile />
                  </>
                }
              ></ProtectedRouteElement>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
