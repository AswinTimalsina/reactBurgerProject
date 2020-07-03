import React, {Component} from 'react';
import classes from './Orders.module.css';
import Order from '../Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component{
// state={
//     orders:[],
//     loading: true
// }

componentDidMount(){
    this.props.onFetchOrders(this.props.token, this.props.userId);
}

    render(){
        let orders = <Spinner />

        if(!this.props.loading){
            orders = <div>
            {this.props.orders.map(order=>(
                <Order 
                key={order.id}
                ingredients={order.ingredients} 
                price={order.price}
                />
            )
           )}
            </div>
        }

        return orders;
    }
}

const mapStateToProps = state => {
    return{
        token: state.auth.token,
        orders:  state.ord.orderData,
        loading: state.ord.loading,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));