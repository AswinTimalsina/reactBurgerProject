import React from 'react';
import burger from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
return(
    <div className={burger.Burger}>
    <BurgerIngredient type="bread-top" />
    <BurgerIngredient type="meat" />
    <BurgerIngredient type="cheese" />
    <BurgerIngredient type="salad" />
    <BurgerIngredient type="bread-bottom" />

    </div>
)
};

export default Burger;