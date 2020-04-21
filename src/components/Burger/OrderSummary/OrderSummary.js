import React from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const summary = Object.keys(props.ingredients).map(ingKeys=>{
    return(<li key={ingKeys}>{ingKeys}: {props.ingredients[ingKeys]}</li>)
    })
return(
<div>
<h1>Order Summary</h1>
<ul>
{summary}
</ul>
<p>Continue to Checkout?</p>

<Button btnType="Danger" clicked={props.cancelPurchaseHandler}>Cancel</Button>
<Button btnType="Success" clicked={props.successPurchaseHandler}>Continue</Button>
</div>)
}

export default OrderSummary;