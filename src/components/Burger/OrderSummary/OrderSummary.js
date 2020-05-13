import React, {Component} from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
    componentWillUpdate(){
        console.log('[OrderSummary] WillUpdate');
    }

    render(){
        const summary = Object.keys(this.props.ingredients).map(ingKeys=>{
            return(<li key={ingKeys}>{ingKeys}: {this.props.ingredients[ingKeys]}</li>)
            })
        return(
            <div>
            <h1>Order Summary</h1>
            <ul>
            {summary}
            </ul> 
            <p><strong>Total Price: {this.props.total.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            
            <Button btnType="Danger" clicked={this.props.cancelPurchaseHandler}>Cancel</Button>
            <Button btnType="Success" clicked={this.props.successPurchaseHandler}>Continue</Button>
            </div>)
    }
   

}

export default OrderSummary;