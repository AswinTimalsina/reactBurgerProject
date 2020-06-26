import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component{
    // state={ingredients:null,
    //     totalPrice: null
    // }

    componentWillMount(){
        //get the url and separates the params from url
        const query = new URLSearchParams(this.props.location.search);

        const ingrediente = {};
        let price = 0;
        for(let param of query.entries()){
            // ['salad', '1']
            if(param[0]=== 'price'){
                price = param[1];
            }
            else{
            ingrediente[param[0]] = +param[1];}
        }
        this.setState({ingredients:ingrediente, totalPrice: price})
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
            ingredients={this.props.ings} 
            cancelCheckoutHandler={this.cancelCheckoutHandler} 
            continueCheckoutHandler={this.continueCheckoutHandler}/>
            
            <Route path={this.props.match.path + '/contact-data'} 
            render={(props)=>(<ContactData ingredients={this.props.ings} price={this.props.price} {...props}/>)} />
            </div>
    }
}

const mapStateToProps = state => {
    return{
        ings: state.ingredients,
        price: state.totalPrice
    }
}

// const mapDispatchToProps = dispatch => {
//     return{

//     }
// }

export default connect(mapStateToProps)(Checkout);