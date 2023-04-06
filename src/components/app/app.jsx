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
import { getUserData, SET_AUTHORIZED } from "../../services/actions";
import { ProtectedRouteElement } from "../protected-route-element/protected-route-element";
import { Feed } from "../../pages/feed/feed";
import { FeedFull } from "../../pages/feed-full/feed-full";
import { getIngredientData } from "../../services/actions/ingredients";

function App() {
  const dispatch = useDispatch();
  const { authData } = useSelector((store) => store.root);
  const { modalState } = useSelector((store) => store.modal);

  useEffect(() => {
    dispatch(getUserData());
    dispatch(getIngredientData());
  }, [dispatch])

  useEffect(() => {
    dispatch({ type: SET_AUTHORIZED, bool: !!getCookie("token") });
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
                <DndProvider backend={HTML5Backend}>
                  <BurgerIngredients />
                  {modalState && <BurgerConstructor />}
                </DndProvider>
              </>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <>
                <SignIn />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Register />
              </>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <>
                <ForgotPassword />
              </>
            }
          />
          <Route
            path="/reset-password"
            element={
              <>
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
                    <Profile />
                  </>
                }
              ></ProtectedRouteElement>
            }
          >
          <Route path="/profile/orders" element={
              <ProtectedRouteElement
                element={
                  <>
                    <Profile />
                  </>
                }
              ></ProtectedRouteElement>} 
          /></Route>
          <Route path="/profile/orders/:id" element={<FeedFull />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/feed/:id" element={<FeedFull />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
