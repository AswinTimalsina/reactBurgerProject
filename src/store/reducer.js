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

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LESSHANDLER:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: state.ingredients[action.ingredientType] - 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType]
            }

        case actionTypes.MOREHANDLER:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientTypes]: state.ingredients[action.ingredientTypes] + 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType]

            }

        default:
            return state;
    }
}


export default reducer;