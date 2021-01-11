import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider, } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';


const rootReducer = combineReducers({
  brgr: burgerBuilderReducer,
  ordr: orderReducer,
  auth: authReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));