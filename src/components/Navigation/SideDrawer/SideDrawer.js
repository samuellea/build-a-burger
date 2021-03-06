import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = ({ show, closed, isAuth }) => {
  let attachedClasses = ['SideDrawer', 'Close'];
  if (show) {
    attachedClasses = ['SideDrawer', 'Open']
  };

  console.log(isAuth, ' * * * * * *')

  return (
    <>
      <Backdrop show={show} clicked={closed} />
      <div className={attachedClasses.join(' ')}>
        <div className="LogoSD">
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={isAuth} />
        </nav>
      </div>
    </>
  )
};

export default SideDrawer;
