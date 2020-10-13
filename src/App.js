import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as authActionCreators from './store/actions/index';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route exact path="/">
          <Redirect to="/burgerbuilder" />
        </Route>
      </Switch>
    );
    if (this.props.isAuthenticated) (
      <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/logout" component={Logout} />
        <Route exact path="/">
          <Redirect to="/burgerbuilder" />
        </Route>
      </Switch>
    );
    return (
      <BrowserRouter>
        <div>
          <Layout>
            {routes}
          </Layout>
        </div>
      </BrowserRouter>
    );
  };

  componentDidMount() {
    this.props.onBrowserRefresh();
  }
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onBrowserRefresh: () => dispatch(authActionCreators.authCheckState())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
