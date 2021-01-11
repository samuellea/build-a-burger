import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  totalPrice: 0.5,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  salad: 0.3,
  bacon: 0.7,
  cheese: 0.5,
  meat: 1.3
};

const burgerBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: { ...state.ingredients, [action.ingredientName]: state.ingredients[action.ingredientName] + 1 },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
      }
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: { ...state.ingredients, [action.ingredientName]: state.ingredients[action.ingredientName] - 1 },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
      }
    case actionTypes.SET_INGREDIENTS:
      const { salad, bacon, cheese, meat } = action.payload;
      return {
        ...state,
        ingredients: { salad, bacon, cheese, meat },
        totalPrice: 0.5,
        building: false
      }
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
        building: false
      }
    default: return state;
  }
};

export default burgerBuilderReducer;
