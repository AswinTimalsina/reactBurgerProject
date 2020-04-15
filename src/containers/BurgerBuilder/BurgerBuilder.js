import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from './../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component{
    state= {
        ingredients: {
            salad: 0,
            cheese: 0,
            meat: 0,
            bacon:0
        }  
    }


    moreHandler = () =>{
        this.setState((prevState, props)=>{
            return{
                
            }
        })
    }

    lessHandler=()=>{
        this.setState((prevState, props)=>{
            return{

            }
        })
    }

    render(){
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls Less={this.lessHandler} More={this.moreHandler}/>
            </Aux>

        );

    }

}

export default BurgerBuilder;