import * as actionTypes from './action';

const initialState ={
    ingredients: null
}

const reducer = (state=initialState, action) => {
    
        switch (action.type){
            case actionTypes.LESSHANDLER:
                return{
                    ...state,
                    ingredients: {
                        ...state.ingredients,
                        [action.ingredientName]: state.ingredients[action.ingredientName] -1
                    }
                }

            case actionTypes.MOREHANDLER:
                return{
                    ...state,
                    ingredients:{
                        ...state.ingredients,
                        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                    }

                }

            default:
                return state;
        }
        
    
}

export default reducer;