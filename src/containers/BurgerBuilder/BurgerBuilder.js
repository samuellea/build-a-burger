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
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {

  state = {
    purchasing: false,
    loading: false,
    error: false
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients).map(key => {
      return ingredients[key];
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);
    return sum > 0;
  }

  // addIngredientHandler = (type) => {
  // const updatedIngredients = { ...this.state.ingredients };
  // updatedIngredients[type]++;
  // this.setState({
  //   ingredients: updatedIngredients,
  //   totalPrice: this.state.totalPrice + INGREDIENT_PRICES[type]
  // })
  // this.updatePurchaseState(updatedIngredients);
  // };

  // removeIngredientHandler = (type) => {
  // if (this.state.ingredients[type] > 0) {
  //   const updatedIngredients = { ...this.state.ingredients };
  //   updatedIngredients[type]--;
  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: this.state.totalPrice - INGREDIENT_PRICES[type]
  //   });
  // this.updatePurchaseState(updatedIngredients);
  // };
  // };

  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  cancelPurchaseHandler = () => {
    if (this.state.purchasing) {
      this.setState({ purchasing: false })
    }
  }

  // continuePurchaseHandler = () => { // former means of passing the ingredients from the BurgerBuilder to the Checkout page, by encoding the ingredients in state to query params
  //   // alert('Continuing to purchase...')
  //   const { ingredients, totalPrice } = this.state;
  //   // const { bacon, cheese, meat, salad } = this.state.ingredients;

  //   const queryParams = [];
  //   for (let i in ingredients) {
  //     queryParams.push(`${encodeURIComponent(i)}=${ingredients[i]}`);
  //   };
  //   queryParams.push('price=' + totalPrice);
  //   const queryString = queryParams.join('&');
  //   this.props.history.push({
  //     pathname: `/Checkout`,
  //     search: `?${queryString}`
  //   });
  // }

  continuePurchaseHandler = () => {
    this.props.history.push({
      pathname: '/checkout'
    });
  }

  render() {
    const { purchasable, purchasing, loading, error } = this.state;
    const { ings, onAddIngredient, onRemoveIngredient, totPri } = this.props;
    return (
      <Aux>
        <Modal show={purchasing} modalClosed={this.cancelPurchaseHandler}>
          {loading ? <Spinner />
            : ings == null ? null : <OrderSummary
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
              purchaseHandler={this.purchaseHandler} />
          </>
        }
      </Aux>
    )
  }

  componentDidMount() {
    axios.get('/ingredients.json')
      .then(({ data }) => {
        // this.setState({
        //   ingredients: data
        // });
      })
      .catch(error => {
        this.setState({
          error: true
        })
      });
  };
};

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    totPri: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onRemoveIngredient: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, axios));