import * as actionTypes from './actionTypes';
import axios from 'axios';

export const purchaseBurgerSuccess = (id, orderData) => {
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return{
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return{
        type: actionTypes.PURCHASE_BURGER_START
    }
}


export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const purchaseBurger= (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('https://react-burger-app-3e7e3.firebaseio.com/orders.json?auth=aIrNM8gLHmMDZp9juXI4Ghm5umBDzRXa4JNGf5tX', orderData)
        .then(response=>{
            console.log(response)
           dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        })
        .catch(error=>{
            dispatch(purchaseBurgerFail(error))
        })

    }
}

export const fetchOrdersSuccess = (orders) => {
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return{
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return{
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {

        dispatch(fetchOrdersStart())

        const queryParams = '?auth=aIrNM8gLHmMDZp9juXI4Ghm5umBDzRXa4JNGf5tX&orderBy="userId"&equalTo="'+ userId + '"';

        axios.get('https://react-burger-app-3e7e3.firebaseio.com/orders.json'+queryParams).then(res=>{
            let orderData = [];
            for(let key in res.data){
                orderData.push({
                    ...res.data[key],
                    id: key
                })
            }
            
            dispatch(fetchOrdersSuccess(orderData));
            // this.setState({orders:orderData, loading:false})
            // console.log(this.state.orders)
        }).catch(err=>{
            // console.log(err);
            // this.setState({loading: false})
            dispatch(fetchOrdersFail(err));
        })
    }
}