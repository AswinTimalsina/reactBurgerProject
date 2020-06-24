import React from 'react';
import styles from './App.module.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route, Switch} from 'react-router-dom';
import Orders from './components/Orders/Orders';
import Authenticate from './containers/Auth/Auth';


function App() {
  return (
    <div>
      <Layout>
        <Switch>
        <Route path='/' exact component={BurgerBuilder}/>
        <Route path='/checkout' component={Checkout} />
        <Route path='/orders' component={Orders} />
        <Route path='/authenticate' component={Authenticate} />
        </Switch>
        
        </Layout>
    </div>
  );
}

export default App;
 