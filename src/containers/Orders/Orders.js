import React, { Component } from 'react';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';

class Orders extends Component {

  state = {
    orders: [],
    loading: true
  }
  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.totalPrice} />
        ))}
      </div>
    );
  };

  componentDidMount() {
    axios.get('/orders.json')
      .then(({ data }) => {
        const fetchedOrders = [];
        for (let key in data) {
          fetchedOrders.push({ ...data[key], id: key });
        }
        this.setState({ orders: fetchedOrders, loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
      })
  };
};

export default ErrorHandler(Orders);