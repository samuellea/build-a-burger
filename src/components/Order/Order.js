import React from 'react';
import './Order.css';

const order = ({ ingredients, price }) => {
  return (
    <div className='Order'>
      <p>Ingredients: {
        Object.entries(ingredients).map(([key, value]) => (<span key={key} style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px'
        }}>{key}: <strong>{value}</strong> </span>))
      }</p>
      <p> Price: <strong>£{price}</strong></p>
    </div>
  )
};

export default order;