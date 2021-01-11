import React from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = ({ ingredients, cancelPurchaseHandler, continuePurchaseHandler, totalPrice }) => {
  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {Object.entries(ingredients).map((ingredient, i) => {
          return (
            <li key={ingredient + 1}>
              <strong>{ingredient[1]}</strong> x  <span style={{ textTransform: 'capitalize' }}>{ingredient[0]}</span>
            </li>
          )
        })}
      </ul>
      <p>Total Price: <strong>£{totalPrice.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button
        buttonAction={cancelPurchaseHandler}
        btnType="Danger">CANCEL</Button>
      <Button
        buttonAction={continuePurchaseHandler}
        btnType="Success">CONTINUE</Button>
    </>
  )
};

export default OrderSummary;