import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import './Layout.css';
import { connect } from 'react-redux';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerActionHandler = () => {
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
    const { children, isAuthenticated } = this.props;
    const { showSideDrawer } = this.state;
    return (
      <Aux>
        <Toolbar sideDrawerActionHandler={this.sideDrawerActionHandler} isAuth={isAuthenticated} />
        <SideDrawer show={showSideDrawer} closed={this.sideDrawerActionHandler} isAuth={isAuthenticated} />
        <div>SideDrawer, Backdrop</div>
        <main className="Content">
          {children}
        </main>
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
};

export default connect(mapStateToProps)(Layout);