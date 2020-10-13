import React from 'react';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => (
  <ul className="NavigationItems">
    <NavigationItem link="/burgerbuilder">BurgerBuilder</NavigationItem>
    {!props.isAuthenticated
      ? null
      : <NavigationItem link="/orders">Orders</NavigationItem>}
    {!props.isAuthenticated
      ? <NavigationItem link="/auth">Login/Signup</NavigationItem>
      : <NavigationItem link="/logout">Logout</NavigationItem>}
  </ul>
);

export default NavigationItems;
