import React from 'react';
import burger from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    const transformedIngredients = Object.keys(props.ingredients).map(igKeys =>{
        return [...Array(props.ingredients[igKeys])].map((_,i)=> {
            return <BurgerIngredient keys={igKeys+i} type={igKeys} />
        })
    })
  


return(
    <div className={burger.Burger}>
    <BurgerIngredient type="bread-top" />
    {transformedIngredients}
    <BurgerIngredient type="bread-bottom" />

    </div>
)
};

export default Burger;