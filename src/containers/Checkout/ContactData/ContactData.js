import React, {Component} from 'react';
import classes from './ContactData.module.css'

class ContactData extends Component{
state={
    name: '',
    email: '',
    address:{
        street:'',
        city: '',
        postal:''
    },
    phoneNum: 0
}

render(){
return(
<div className={classes.form}>
    <h1>Your Contact Information</h1>
        <input type='text' placeholder="Your Name" value={this.state.name} onChange={(event)=>this.setState({name:event.target.value})} />
        
        <input type='email' placeholder="Your Email" value={this.state.email} onChange={(event)=>this.setState({email:event.target.value})} />
     
        <input type='text' placeholder="Street Address" value={this.state.address.street} onChange={(event)=>this.setState({address:{street:event.target.value}})} />
       
        <input type='text' placeholder="City" value={this.state.address.city} onChange={(event)=>this.setState({address:{city:event.target.value}})} />
       
       <input type='number' placeholder="Postal Code" value={this.state.address.postal} onChange={(event)=>this.setState({address:{postal:event.target.value}})} />
       <input type='number' placeholder="Contact Number" value={this.state.phoneNum} onChange={(event)=>this.setState({phoneNum:event.target.value})} />
        
        <button>Submit</button>

</div>
)
}

}

export default ContactData;