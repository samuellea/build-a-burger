import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData'
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

class Checkout extends Component {
  // state = {
  //   ingredients: {},
  //   price: null
  // };

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/Checkout/contact-data');
  };

  render() {
    const { ings, totPri, prchsd } = this.props;
    let summary = <Redirect to="/BurgerBuilder" />
    if (this.props.ings) {
      const purchasedRedirect = prchsd ? <Redirect to="/" /> : null;
      summary = (
        <div className="Checkout">
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler} />
          <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
        </div>
      )
    }

    return summary;
  };

  // componentDidMount() { // former means of extracting the ingredients that had been passed from BurgerBuilder to this component via query params
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price;
  //   for (let param of query.entries()) {
  //     if (param[0] === 'price') {
  //       price = param[1]
  //     } else {
  //       ingredients[param[0]] = +param[1]; // convert to number using a plus
  //     }
  //   };
  //   this.setState({
  //     ingredients: ingredients,
  //     price: price
  //   });
  // };

};

const mapStateToProps = state => {
  return {
    ings: state.brgr.ingredients,
    prchsd: state.ordr.purchased
  }
};


export default connect(mapStateToProps)(Checkout);