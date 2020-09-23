import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.3,
  bacon: 0.7,
  cheese: 0.5,
  meat: 1.3
};

class BurgerBuilder extends Component {

  state = {
    ingredients: null, // coming from firebase database /ingredients.json       // { salad: 0, bacon: 0, cheese: 0, meat: 0 }
    totalPrice: 0.5,
    purchasable: false,
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
    this.setState({ purchasable: sum > 0 })
  }

  addIngredientHandler = (type) => {
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type]++;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: this.state.totalPrice + INGREDIENT_PRICES[type]
    })
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] > 0) {
      const updatedIngredients = { ...this.state.ingredients };
      updatedIngredients[type]--;
      this.setState({
        ingredients: updatedIngredients,
        totalPrice: this.state.totalPrice - INGREDIENT_PRICES[type]
      });
      this.updatePurchaseState(updatedIngredients);
    };
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  cancelPurchaseHandler = () => {
    if (this.state.purchasing) {
      this.setState({ purchasing: false })
    }
  }

  continuePurchaseHandler = () => {
    // alert('Continuing to purchase...')
    const { ingredients, totalPrice } = this.state;
    // const { bacon, cheese, meat, salad } = this.state.ingredients;

    const queryParams = [];
    for (let i in ingredients) {
      queryParams.push(`${encodeURIComponent(i)}=${ingredients[i]}`);
    };
    queryParams.push('price=' + totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: `/Checkout`,
      search: `?${queryString}`
    });

  }

  render() {
    const { ingredients, totalPrice, purchasable, purchasing, loading, error } = this.state;
    return (
      <Aux>
        <Modal show={purchasing} modalClosed={this.cancelPurchaseHandler}>
          {loading ? <Spinner />
            : ingredients == null ? null : <OrderSummary
              ingredients={ingredients}
              cancelPurchaseHandler={this.cancelPurchaseHandler}
              continuePurchaseHandler={this.continuePurchaseHandler}
              totalPrice={totalPrice} />}
        </Modal>
        {error ? <p style={{ textAlign: 'center', color: 'red' }}>Ingredients can't be loaded!</p>
          : ingredients == null ? <Spinner /> : <>
            <Burger ingredients={ingredients} />
            <BuildControls
              ingredients={ingredients}
              addIngredientHandler={this.addIngredientHandler}
              removeIngredientHandler={this.removeIngredientHandler}
              price={totalPrice}
              purchasable={purchasable}
              purchaseHandler={this.purchaseHandler} />
          </>
        }
      </Aux>
    )
  }

  componentDidMount() {
    // setTimeout(() => { //

    axios.get('/ingredients.json')
      .then(({ data }) => {
        this.setState({
          ingredients: data
        });
      })
      .catch(error => {
        this.setState({
          error: true
        })
      });

    // }, 2000); // 

  };
};

export default ErrorHandler(BurgerBuilder, axios);