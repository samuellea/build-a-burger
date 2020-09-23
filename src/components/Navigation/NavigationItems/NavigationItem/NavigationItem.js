import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationItem.css';

const NavigationItem = ({ children, active }) => (
  <li className="NavigationItem">
    <NavLink to={`/${children}`} >{children}</NavLink>
  </li>
);

export default NavigationItem;



