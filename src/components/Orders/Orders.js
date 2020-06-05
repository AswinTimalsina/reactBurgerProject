import React, {Component} from 'react';
import classes from './Orders.module.css';
import Order from '../Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{
state={
    orders:[],
    loading: true
}

componentDidMount(){
    axios.get('/orders.json').then(res=>{
        let orderData = [];
        for(let key in res.data){
            orderData.push({
                ...res.data[key],
                id: key
            })
        }
        this.setState({orders:orderData, loading:false})
        console.log(this.state.orders)
    }).catch(err=>{
        console.log(err);
        this.setState({loading: false})
    })
}

    render(){
        return(
            <div>
            {this.state.orders.map(order=>(
                <Order 
                key={order.id}
                ingredients={order.ingredients} 
                price={order.price}
                />
            )
           )}
            </div>

        )
    }
}

export default withErrorHandler(Orders, axios);