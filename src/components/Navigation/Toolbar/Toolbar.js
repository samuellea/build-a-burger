import React from 'react';
import './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Button from '../../UI/Button/Button';

const Toolbar = ({ sideDrawerActionHandler, isAuth }) => (
  <header className="Toolbar">
    <Button
      buttonAction={sideDrawerActionHandler}
      btnType="Menu">
      <span className="menuIcon"><i className="fa fa-bars fa-2x"></i></span>
    </Button>
    <div className="LogoTB">
      <Logo style={{ height: '20px' }} />
    </div>
    <nav className="DesktopOnly">
      <NavigationItems isAuthenticated={isAuth} />
    </nav>
  </header>
);

export default Toolbar;
