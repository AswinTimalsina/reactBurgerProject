import * as actionTypes from '../actions/actionTypes';

const initialState = {
    
}

const reducer = (state, action) => {
    switch(action.type){
        case actionTypes.AUTH_START:
            return

        case actionTypes.AUTH_SUCCESS:
            return

        case actionTypes.AUTH_FAIL:
            return

        default:
            return state;
    }
}


export default reducer;