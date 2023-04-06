import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/root-reducer';
import thunk from 'redux-thunk';
import { initStore } from './services/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
/* 
const wsUrl = 'wss://norma.nomoreparties.space/orders';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk), applyMiddleware(socketMiddleware()));

const store = createStore(rootReducer, enhancer); */
const store = initStore();

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

const modalRoot = ReactDOM.createRoot(
  document.getElementById('modal-root') as HTMLElement
)
modalRoot.render(
  <React.StrictMode>
    
  </React.StrictMode>
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
