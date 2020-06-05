import React, {Component} from 'react';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{
state={
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
    console.log(this.props.ingredients);

    const order = {
            ingredients : this.state.ingredients,
            price: this.props.price,
            customer: {
                name: this.state.name,
                address: this.state.address,
                email: this.state.email,
            },
            phoneNum: this.state.phoneNum,
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

    <form>
        <input type='text' placeholder="Your Name" value={this.state.name} onChange={(event)=>this.setState({name:event.target.value})} />
        
        <input type='email' placeholder="Your Email" value={this.state.email} onChange={(event)=>this.setState({email:event.target.value})} />
     
        <input type='text' placeholder="Street Address" value={this.state.address.street} onChange={(event)=>this.setState({address:{street:event.target.value}})} />
       
        <input type='text' placeholder="City" value={this.state.address.city} onChange={(event)=>this.setState({address:{city:event.target.value}})} />
       
       <input type='number' placeholder="Postal Code" value={this.state.address.postal} onChange={(event)=>this.setState({address:{postal:event.target.value}})} />
       <input type='number' placeholder="Contact Number" value={this.state.phoneNum} onChange={(event)=>this.setState({phoneNum:event.target.value})} />
        
        <button onClick={this.orderHandler}>Submit</button>
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

export default ContactData;