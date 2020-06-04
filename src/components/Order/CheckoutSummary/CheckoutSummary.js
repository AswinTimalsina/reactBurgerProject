import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props)=>{
return(
    <div className={classes.checkoutSummary}>
        <h1>Hope it tastes well!!</h1>
        <div style={{width: '100%', margin: 'auto'}}>
            <Burger ingredients={props.ingredients}/></div>
    <Button btnType="Danger" clicked={props.cancelCheckoutHandler}>Cancel</Button>
    <Button btnType="Success" clicked={props.continueCheckoutHandler}>Continue</Button>

    </div>
)
}

export default checkoutSummary;