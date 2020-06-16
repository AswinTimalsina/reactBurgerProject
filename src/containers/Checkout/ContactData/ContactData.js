import React, {Component} from 'react';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';

class ContactData extends Component{
state={
    orderForm:{
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation:{
                required: true,
                minLength: 3
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email'
            },
            value: '',
            validation:{
                required: true,
                minLength: 3
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation:{
                required: true,
                minLength: 3
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'Zip Code'
            },
            value: '',
            validation:{
                required: true,
                minLength: 3,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation:{
                required: true,
                minLength: 3
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [{value: 'fastest', displayValue: 'Fastest'},
                {value:'cheapest', displayValue: 'Cheapest'}]
            },
            value: 'fastest',
            validation:{
                required: false
            },
            valid: true
        }
    },
    loading: false,
    isFormValid: false
}


checkValidity(value, rules){
let isValid = true;

if(rules.required){
    isValid = value.trim() !== '' && isValid;
}

if(rules.minLength){
    isValid = value.length >= rules.minLength && isValid;
}

if(rules.maxLength){
    isValid = value.length <= rules.maxLength && isValid;
}
return isValid;
}

orderHandler=(event)=>{
    event.preventDefault();
    this.setState({loading: true})

    const formData = {};

    for(let elements in this.state.orderForm){
        formData[elements] = this.state.orderForm[elements].value
    }

    const order = {
            ingredients : this.props.ings,
            price: +this.props.price,
            orderData: formData
        }

        
        axios.post('/orders.json', order)
        .then(response=>{
            console.log(response)
            this.setState({loading: false})
            this.props.history.push('/');

        })
        .catch(error=>{
            console.log(error)
            this.setState({loading: false})
        })
}


changeHandler= (event, identifier)=>{
    const updatedOrderForm = {...this.state.orderForm};
    const updatedFormElement = {...updatedOrderForm[identifier]};
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[identifier] = updatedFormElement;

    let isFormValid= true;

    for(let elementValid in updatedOrderForm){
        isFormValid = updatedOrderForm[elementValid].valid && isFormValid
    }
    // console.log(updatedFormElement)
    this.setState({orderForm: updatedOrderForm, isFormValid: isFormValid})
}

render(){

let dummyForm = [];

for(let key in this.state.orderForm){
    dummyForm.push({
        id: key,
        config: this.state.orderForm[key]
    })
}

let form = (

    <form style={{width: '100%'}} onSubmit={this.orderHandler}>        
        {dummyForm.map(formElement=>(
            <Input 
            key={formElement.id}
            valued={formElement.id}
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            validation={formElement.config.validation}
            changed={(event)=>this.changeHandler(event, formElement.id)}
            touched={formElement.config.touched}
            /> 
        ))}               
        <Button disabled={!this.state.isFormValid} btnType='Success'>Submit</Button>
        </form>
)

if (this.state.loading){
    form = <Spinner />
}

return(
<div className={classes.form}>
<h1>Your Contact Information</h1>
    {form}
</div>
)
}

}

const mapStateToProps = state => {
    return{
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);