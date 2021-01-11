import React, { Component } from 'react';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

  // state = {
  //   orders: [],
  //   loading: true
  // };

  render() {
    const { ordrs, ldng } = this.props;

    let orders = <Spinner />;
    if (ldng) { orders = <Spinner /> } else {
      if (ordrs.length) {
        orders = ordrs.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.totalPrice} />
        ))
      } else {
        orders = <h1>No orders to see here!</h1>
      }
    };
    return (
      <div>
        {orders}
      </div>
    );
  };

  componentDidMount() {
    const { onFetchOrders, tkn, usr } = this.props;
    onFetchOrders(tkn, usr);
  };
};

const mapStateToProps = state => {
  return {
    ordrs: state.ordr.orders,
    ldng: state.ordr.loading,
    tkn: state.auth.token,
    usr: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, currentUserId) => dispatch(actionCreators.fetchOrders(token, currentUserId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(Orders, axios));