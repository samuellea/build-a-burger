import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData'
import { Route } from 'react-router-dom';

class Checkout extends Component {
  state = {
    ingredients: {},
    price: null
  };

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/Checkout/contact-data');
  };

  render() {
    const { ingredients, price } = this.state;
    return (
      <div className="Checkout">
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler} />
        <Route path={this.props.match.path + '/contact-data'} render={(props) => (<ContactData ingredients={ingredients} price={price} {...props} />)} />
      </div>
    )
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price;
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = param[1]
      } else {
        ingredients[param[0]] = +param[1]; // convert to number using a plus
      }
    };
    console.log(ingredients, ' <- ingredients in Checkout.js componentDidMount!')
    this.setState({
      ingredients: ingredients,
      price: price
    });
  };

};

export default Checkout;