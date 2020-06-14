import * as actionTypes from './action';

const initialState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        meat: 0,
        bacon: 0
    },
    totalPrice: 4
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LESSHANDLER:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: state.ingredients[action.ingredientType] - 1
                }
            }

        case actionTypes.MOREHANDLER:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientTypes]: state.ingredients[action.ingredientTypes] + 1
                }
            }

        default:
            return state;
    }
}


export default reducer;