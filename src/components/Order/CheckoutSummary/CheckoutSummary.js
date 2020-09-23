import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import './CheckoutSummary.css';
import { withRouter } from 'react-router-dom';


const checkoutSummary = (props) => {
  console.log(props.location.search, '< - - - props.location.search');

  const { ingredients, checkoutCancelled, checkoutContinued } = props;
  return (
    <div className="CheckoutSummary">
      <h1>Review your order</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={ingredients} />
      </div>
      <Button btnType="Danger" buttonAction={checkoutCancelled}>CANCEL</Button>
      <Button btnType="Success" buttonAction={checkoutContinued}>CONTINUE</Button>
    </div>
  );
};

export default withRouter(checkoutSummary);