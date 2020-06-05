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
    }).catch(err=>{
        console.log(err);
        this.setState({loading: false})
    })
}

    render(){
        
        return(
            <div>
            <Order />
            <Order />
            </div>

        )
    }
}

export default withErrorHandler(Orders, axios);