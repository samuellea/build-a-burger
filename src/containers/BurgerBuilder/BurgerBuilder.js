import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

class BurgerBuilder extends Component {

  state = {
    purchasing: false
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients).map(key => {
      return ingredients[key];
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true })
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push({
        pathname: '/auth'
      });
    };
  }

  cancelPurchaseHandler = () => {
    if (this.state.purchasing) {
      this.setState({ purchasing: false })
    }
  }

  continuePurchaseHandler = () => {
    this.props.onInitPurchase()
    this.props.history.push({
      pathname: '/checkout'
    });
  }

  render() {
    const { purchasable, purchasing } = this.state;
    const { ings, onAddIngredient, onRemoveIngredient, totPri, error } = this.props;
    return (
      <Aux>
        <Modal show={purchasing} modalClosed={this.cancelPurchaseHandler}>
          {
            ings == null ? null : <OrderSummary
              ingredients={ings}
              cancelPurchaseHandler={this.cancelPurchaseHandler}
              continuePurchaseHandler={this.continuePurchaseHandler}
              totalPrice={totPri} />}
        </Modal>
        {error ? <p style={{ textAlign: 'center', color: 'red' }}>Ingredients can't be loaded!</p>
          : ings == null ? <Spinner /> : <>
            <Burger ingredients={ings} />
            <BuildControls
              ingredients={ings}
              addIngredientHandler={onAddIngredient}
              removeIngredientHandler={onRemoveIngredient}
              price={totPri}
              purchasable={this.updatePurchaseState(ings)}
              purchaseHandler={this.purchaseHandler}
              isAuth={this.props.isAuthenticated} />
          </>
        }
      </Aux>
    )
  }

  componentDidMount() {
    const { onIngredientsInit } = this.props;
    onIngredientsInit();
  };
};

const mapStateToProps = state => {
  return {
    // ings: state.brgr.ingredients,
    // totPri: state.brgr.totalPrice
    ings: state.brgr.ingredients,
    totPri: state.brgr.totalPrice,
    error: state.brgr.error,
    isAuthenticated: state.auth.token !== null
  };
};


const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: (ingName) => dispatch(actionCreators.addIngredient(ingName)),
    onRemoveIngredient: (ingName) => dispatch(actionCreators.removeIngredient(ingName)),
    onIngredientsInit: () => dispatch(actionCreators.initIngredients()),
    onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, axios));