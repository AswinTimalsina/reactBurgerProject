import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    orderData: [],
    loading:false,
    purchased: false
}

const reducer = (state=initialState, action) => {
    switch (action.type){
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = { 
                ...action.orderData,
                id: action.orderId      //it is getting from the action 
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                orderData: state.orderData.concat(newOrder)     //??? why concat
            }

        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            }

        case actionTypes.PURCHASE_BURGER_START:
            return{
                ...state,
                loading: true
            }

        case actionTypes.PURCHASE_INIT:
            return updateObject(state, {purchased:false});

        case actionTypes.FETCH_ORDERS_START:
            return updateObject(state, {loading: true});
        
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state, {orderData: action.orders,
                loading: false})
            

        case actionTypes.FETCH_ORDERS_FAIL:
            return{
                ...state,
                loading: false
            }

        default: 
            return state;
    }
}

export default reducer;