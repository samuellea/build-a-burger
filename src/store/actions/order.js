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

export const purchaseBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json?auth=' + token, orderData)
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

export const fetchOrdersFailure = (error) => {
  return { type: actionTypes.FETCH_ORDERS_FAILURE, error: error }
};

export const fetchOrdersStart = () => {
  return { type: actionTypes.FETCH_ORDERS_START }
};

export const fetchOrders = (token, currentUserId) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + currentUserId + '"';
    axios.get(`/orders.json` + queryParams)
      .then(({ data }) => {
        const fetchedOrders = [];
        for (let key in data) {
          fetchedOrders.push({ ...data[key], id: key });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders))
      })
      .catch(err => {
        console.log(err, ' <--- err as logged in actions/order.js')
        dispatch(fetchOrdersFailure(err))
      })
  };
};