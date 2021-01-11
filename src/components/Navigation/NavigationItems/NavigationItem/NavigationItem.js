import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationItem.css';

const NavigationItem = ({ link, children }) => {
  return (
    <li className="NavigationItem">
      <NavLink to={`${link}`} >{children}</NavLink>
    </li>
  );
};

export default NavigationItem;



