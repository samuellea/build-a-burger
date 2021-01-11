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

// render() {
//   const { loggedIn } = this.state;
//   return (
//     <div className="App">
//       {loggedIn
//         ? <Site path="/" token={this.state.token} handleLogout={this.handleLogout} />
//         : <Auth path="/" updateLoggedIn={this.updateLoggedIn} />}
//     </div >
//   );
// };

class App extends Component {
  render() {
    let routes;
    if (!this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route exact path="/">
            <Redirect to="/auth" />
          </Route>
        </Switch>
      )
    } else {
      routes = (
        <Switch>
          <Route exact path="/">
            <Redirect to="/burgerbuilder" />
          </Route>
          <Route exact path="/auth">
            <Redirect to="/" />
          </Route>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/burgerbuilder" component={BurgerBuilder} />
        </Switch>
      )
    }

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
