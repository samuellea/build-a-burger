import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFailure = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILURE,
    error: error
  };
};

export const purchaseBurgerStart = (orderData) => {
  return (dispatch) => {
    axios.post('/orders.json', orderData)
      .then(({ data }) => {
        console.log(data)
        dispatch(purchaseBurgerSuccess(data, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFailure(error));
        console.log(error);
      });
  }
};