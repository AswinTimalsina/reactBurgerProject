import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import * as actions from '../../store/index';

class Checkout extends Component {
    // state={ingredients:null,
    //     totalPrice: null
    // }



    componentWillMount() {
        //get the url and separates the params from url
        const query = new URLSearchParams(this.props.location.search);

        const ingrediente = {};
        let price = 0;
        for (let param of query.entries()) {
            // ['salad', '1']
            if (param[0] === 'price') {
                price = param[1];
            }
            else {
                ingrediente[param[0]] = +param[1];
            }
        }
        this.setState({ ingredients: ingrediente, totalPrice: price })

       
    }

    cancelCheckoutHandler = () => {
        console.log('cancel')
        this.props.history.goBack();
    }

    continueCheckoutHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }



    render() {
        let summary = <Redirect to='/' />
        
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
            summary = (<div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={this.props.ings}
                    cancelCheckoutHandler={this.cancelCheckoutHandler}
                    continueCheckoutHandler={this.continueCheckoutHandler} />

                <Route path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData ingredients={this.props.ings} price={this.props.price} {...props} />)} />
            </div>)
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burg.ingredients,
        price: state.burg.totalPrice,
        purchased: state.ord.purchased
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);