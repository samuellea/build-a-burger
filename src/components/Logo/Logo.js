import React from 'react';
import BurgerLogo from '../../assets/images/burger-logo.png';
import './Logo.css';

const Logo = props => (
  <div className="Logo" style={{ height: props.height }}>
    <img src={BurgerLogo} alt="BurgerBuilder" />
  </div >
);

export default Logo;