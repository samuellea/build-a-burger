import React from 'react';
import './Order.css';

const order = ({ ingredients, price }) => {
  return (
    <div className='Order'>
      <p>Ingredients: </p>
      {
        Object.entries(ingredients).map(([key, value]) => (<span id="ingSpan" key={key} style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px',
          width: '75px'
        }}>{key}: <strong>{value}</strong> </span>))
      }
      <p> Price: <strong>£{price}</strong></p>
    </div >
  )
};

export default order;