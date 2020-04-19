import React from 'react';

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
</div>)
}

export default OrderSummary;