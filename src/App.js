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
    // let routes = (
    //   <Switch>
    //     <Route exact path="/">
    //       <Redirect to="/burgerbuilder" />
    //     </Route>
    //     <Route path="/burgerbuilder" component={BurgerBuilder} />
    //     <Route path="/auth" component={Auth} />
    //     <Redirect to="/" />
    //     <Route path="/checkout" component={Checkout} />
    //     <Route path="/orders" component={Orders} />
    //     <Route path="/logout" component={Logout} />
    //     {/* <Redirect to="/" /> */}
    //   </Switch>
    // );
    // if (this.props.isAuthenticated) {
    //   routes = (

    //   );
    // }
    return (
      <BrowserRouter>
        <div>
          <Layout>
            <Switch>
              <Route exact path="/">
                <Redirect to="/burgerbuilder" />
              </Route>
              <Route path="/burgerbuilder" component={BurgerBuilder} />
              <Route path="/auth" component={Auth} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" component={Orders} />
              <Route path="/logout" component={Logout} />
              {/* <Redirect to="/" /> */}
            </Switch>
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
