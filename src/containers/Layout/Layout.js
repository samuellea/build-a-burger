import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import './Layout.css';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerActionHandler = () => {
    console.log('sideDrawerActionHandler!')
    const { showSideDrawer } = this.state;
    if (showSideDrawer) {
      this.setState({
        showSideDrawer: false
      });
    } else {
      this.setState({
        showSideDrawer: true
      });
    }
  };

  render() {
    const { children } = this.props;
    const { showSideDrawer } = this.state;
    return (
      <Aux>
        <Toolbar sideDrawerActionHandler={this.sideDrawerActionHandler} />
        <SideDrawer show={showSideDrawer} closed={this.sideDrawerActionHandler} />
        <div>SideDrawer, Backdrop</div>
        <main className="Content">
          {children}
        </main>
      </Aux>
    )
  }
}


export default Layout;