import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
    loading: false
  };
};

export const purchaseBurgerFailure = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILURE,
    error: error,
    loading: true
  };
};

export const purchaseBurgerStart = () => {
  return { type: actionTypes.PURCHASE_BURGER_START };
};

export const purchaseBurger = (orderData) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json', orderData)
      .then(({ data }) => {
        console.log(data)
        dispatch(purchaseBurgerSuccess(data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFailure(error));
        console.log(error);
      });
  }
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
};

export const fetchOrdersSuccess = (fetchedOrders) => {
  return { type: actionTypes.FETCH_ORDERS_SUCCESS, fetchedOrders: fetchedOrders }
};

export const fetchOrdersFailure = () => {
  return { type: actionTypes.FETCH_ORDERS_FAILURE }
};

export const fetchOrdersStart = () => {
  return { type: actionTypes.FETCH_ORDERS_START }
};

export const fetchOrders = () => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    axios.get('/orders.json')
      .then(({ data }) => {
        const fetchedOrders = [];
        for (let key in data) {
          fetchedOrders.push({ ...data[key], id: key });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders))
      })
      .catch(err => {
        dispatch(fetchOrdersFailure(err))
      })
  };
};