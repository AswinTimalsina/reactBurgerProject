import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orderData: null,
    loading:false
}

const reducer = (state=initialState, action) => {
    switch (action.type){
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = { 
                ...action.orderData,
                id: action.orderId

            }
            return {
                ...state,
                loading: false,
                orderData: state.orderData.concat(newOrder)
            }

        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            }

        default: 
            return state;
    }
}

export default reducer;