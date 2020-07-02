import React, { Component } from 'react';
import styles from './App.module.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Orders from './components/Orders/Orders';
import Authenticate from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/index';


class App extends Component {
  componentDidMount() {
    this.props.authCheckState();
  }


  render() {
    let routes = (<Switch>
      <Route path='/' exact component={BurgerBuilder} />
      <Route path='/authenticate' component={Authenticate} />
      <Redirect to='/'></Redirect>
    </Switch>);

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/logout' component={Logout} />
          <Redirect to='/'></Redirect>
        </Switch>
      )
    }


    return (


      <div>
        <Layout>

          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authCheckState: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
