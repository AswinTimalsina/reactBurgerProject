import React from 'react';
import burger from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
// main logic ????
    let transformedIngredients = Object.keys(props.ingredients).map(igKeys =>{
        return [...Array(props.ingredients[igKeys])].map((_,i)=> {
            return <BurgerIngredient keys={igKeys+i} type={igKeys} />
        })
    })
    .reduce((arr, el)=> {
        return arr.concat(el)
    }, [])
  
     if(transformedIngredients.length === 0){
         transformedIngredients = <p>Please Add Ingredient</p>
     }

return(
    <div className={burger.Burger}>
    <BurgerIngredient type="bread-top" />
    {transformedIngredients}
    <BurgerIngredient type="bread-bottom" />

    </div>
)
};

export default Burger;