import React from 'react';
import './Button.css';

const Button = ({ children, btnType, buttonAction }) => (
  <button
    className={`Button ${btnType}`}
    onClick={() => buttonAction()}
  >{children}
  </button>
);

export default Button;
