import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{
    state={ingredients:{
        salad: 1,
        cheese: 3,
        meat: 1,
        bacon: 1}
    }

    componentDidMount(){
        //get the url and separates the params from url
        const query = new URLSearchParams(this.props.location.search);

        const ingrediente = {};
        for(let param of query.entries()){
            // ['salad', '1']
            ingrediente[param[0]] = +param[1];
        }
        this.setState({ingredients:ingrediente})
    }

    cancelCheckoutHandler=()=>{
        console.log('cancel')
        this.props.history.goBack();
    }

    continueCheckoutHandler=()=>{
        this.props.history.replace('/checkout/contact-data')
    }



    render(){
        return <div>
            <CheckoutSummary 
            ingredients={this.state.ingredients} 
            cancelCheckoutHandler={this.cancelCheckoutHandler} 
            continueCheckoutHandler={this.continueCheckoutHandler}/>
            <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>
    }
}

export default Checkout;