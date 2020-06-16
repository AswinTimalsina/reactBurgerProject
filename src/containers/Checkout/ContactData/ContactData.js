import React, {Component} from 'react';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';

class ContactData extends Component{
state={
    ingredients: '',
    name: '',
    email: '',
    address:{
        street:'',
        city: '',
        postal:''
    },
    phoneNum: 0,
    loading: false
}

orderHandler=()=>{
    // event.preventDefault();

    const order = {
            ingredients : this.props.ings,
            price: +this.props.price,
            customer: {
                name: this.state.name,
                address: this.state.address,
                email: this.state.email,
            },
            phoneNum: +this.state.phoneNum,
            deliveryMethod: 'fastest'

        }

        this.setState({loading: true})
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

render(){
let form = (

    <form style={{width: '100%'}}>
        <Input inputtype='input' type='text' placeholder="Your Name" value={this.state.name} onChange={(event)=>this.setState({name:event.target.value})} />
        
        <Input inputtype='input' type='email' placeholder="Your Email" value={this.state.email} onChange={(event)=>this.setState({email:event.target.value})} />
     
        <Input inputtype='input' type='text' placeholder="Street Address" value={this.state.address.street} onChange={(event)=>this.setState({address:{street:event.target.value}})} />
              
       <Input inputtype='input' type='text' placeholder="Postal Code" value={this.state.address.postal} onChange={(event)=>this.setState({address:{postal:event.target.value}})} />
               
        <Button btnType='Success' onClick={this.orderHandler}>Submit</Button>
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