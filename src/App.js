import React from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Redirect to="/burgerbuilder" />
            </Route>
            <Route path="/burgerbuilder" component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            {/* <Route path="/checkout/contact-data" component={} /> */}
          </Switch>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
