import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import './Burger.css';

const Burger = ({ ingredients }) => {

  let transformedIngredients = Object.entries(ingredients).reduce((acc, [key, value], i) => {
    for (let i = 0; i < value; i++) acc.push(key);
    return acc;
  }, []).map((e, i) => <BurgerIngredient key={e + i} type={e} />)

  if (!transformedIngredients.length) {
    transformedIngredients = <p>Add some ingredients!</p>
  }

  return (
    <div className="Burger">
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;