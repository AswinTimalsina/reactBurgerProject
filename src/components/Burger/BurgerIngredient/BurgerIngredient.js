import React from 'react';
import burgerIng from './BurgerIngredient.module.css';

const BurgerIngredient = (props) => {
    let ingredient = null;

    switch(props.type){
        case ('bread-bottom'):
            ingredient = <div className={burgerIng.BreadBottom}></div>
            break;

        case ('bread-top'):
            ingredient = (
                <div className={burgerIng.BreadTop}>
                    <div className={burgerIng.Seeds1}></div>
                    <div className={burgerIng.Seeds2}></div>
                </div>
            );
            break;

        case ('meat'):
            ingredient = <div className={burgerIng.Meat}></div>
            break;

        case ('cheese'):
            ingredient = <div className={burgerIng.Cheese}></div>
            break;

        case ('salad'):
            ingredient = <div className={burgerIng.Salad}></div>
            break;

        case ('bacon'):
            ingredient = <div className={burgerIng.Bacon}></div>
            break;

        default:
            ingredient= null;
    }
    return ingredient;
}

export default BurgerIngredient;