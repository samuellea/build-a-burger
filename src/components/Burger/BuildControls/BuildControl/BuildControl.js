import React from 'react';
import './BuildControl.css';

const BuildControl = ({ label, type, addIngredientHandler, removeIngredientHandler, removeDisabled }) => {
  return (
    <div className="BuildControl">
      <div className="Label">{label}</div>
      <button className="Less" onClick={removeIngredientHandler} disabled={removeDisabled}>Less</button>
      <button className="More" onClick={addIngredientHandler}>More</button>
    </div>
  )
}

export default BuildControl;
