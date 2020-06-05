import React, {Component} from 'react';
import classes from './Orders.module.css';
import Order from '../Order/Order';

class Orders extends Component{
    render(){
        return(
            <div>
            <Order />
            <Order />
            </div>

        )
    }
}

export default Orders;