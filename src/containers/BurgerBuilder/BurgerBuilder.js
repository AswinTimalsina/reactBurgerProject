import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from './../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}



class BurgerBuilder extends Component{
    state= {
        ingredients: {
            salad: 0,
            cheese: 0,
            meat: 0,
            bacon:0
        },
        totalPrice: 4
    }


    moreHandler = (type) =>{
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = this.state.ingredients[type] +1;
        
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.setState(
            {ingredients:updatedIngredients, 
            totalPrice:newPrice
            }
        )
    }

    lessHandler=(type)=>{
        let newIngredients = {...this.state.ingredients};
        newIngredients[type] = this.state.ingredients[type] -1;

        let newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState(
            {ingredients: newIngredients, totalPrice: newPrice}
        )
    }

    render(){
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                Total Price: {this.state.totalPrice}
                <BuildControls Less={this.lessHandler} More={this.moreHandler}/>
            </Aux>

        );

    }

}

export default BurgerBuilder;