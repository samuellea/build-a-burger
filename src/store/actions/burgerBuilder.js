import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingName) => {
  return { type: actionTypes.ADD_INGREDIENT, ingredientName: ingName };
};

export const removeIngredient = (ingName) => {
  return { type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName };
};

export const setIngredients = (fetchedIngredients) => {
  return { type: actionTypes.SET_INGREDIENTS, payload: fetchedIngredients };
}

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios.get('/ingredients.json')
      .then(({ data }) => {
        dispatch(setIngredients(data))
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed())
      });
  };
};