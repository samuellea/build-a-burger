import React from 'react';
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const BuildControls = ({ ingredients, addIngredientHandler, removeIngredientHandler, price, purchasable, purchaseHandler, isAuth }) => {
  return (
    <div className="BuildControls">
      <p>Current Price: <strong>£{price.toFixed(2)}</strong></p>

      {Object.keys(ingredients).map(ingredient => {
        const label = ingredient[0].toUpperCase() + ingredient.slice(1);
        return <BuildControl
          key={ingredient}
          label={label}
          addIngredientHandler={() => addIngredientHandler(ingredient)}
          removeIngredientHandler={() => removeIngredientHandler(ingredient)}
          removeDisabled={ingredients[ingredient] === 0}
        />
      })}
      <button
        className="OrderButton"
        disabled={!purchasable}
        onClick={purchaseHandler}
      >{isAuth ? 'ORDER NOW' : 'LOGIN / SIGNUP TO ORDER'}</button>
    </div>
  )
}

export default BuildControls;
