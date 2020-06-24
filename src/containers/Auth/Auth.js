import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/index';
import {connect} from 'react-redux';

class Auth extends Component{

    state={
        controls:{
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        }
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


        changeHandler= (event, controlName)=>{
            // const updatedOrderForm = {...this.state.controls};
            // const updatedFormElement = {...updatedOrderForm[identifier]};
            // updatedFormElement.value = event.target.value;
            // updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
            // updatedFormElement.touched = true;
            // updatedOrderForm[identifier] = updatedFormElement;
        
            // let isFormValid= true;
        
            // for(let elementValid in updatedOrderForm){
            //     isFormValid = updatedOrderForm[elementValid].valid && isFormValid
            // }
            // console.log(updatedFormElement)
            // this.setState({orderForm: updatedOrderForm, isFormValid: isFormValid})


            const updatedControls = {...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
            }
            this.setState({controls: updatedControls})
        }


        submitHandler=(event)=>{
            event.preventDefault();
            this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value)
        }
render(){
    const authForm = [];

    for(let key in this.state.controls){
        authForm.push({
            id: key,
            config: this.state.controls[key]
        })
    }

    let form = authForm.map(formElement=>(
                <Input 
                key={formElement.id}
                valued={formElement.id}    //label of the box
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}       //actual input of the user
                invalid={!formElement.config.valid}
                validation={formElement.config.validation}
                changed={(event)=>this.changeHandler(event, formElement.id)}
                touched={formElement.config.touched}
                />
    ))
       
    


    return(
        <div className={classes.Auth}>
            <form onSubmit={this.submitHandler}>
                {form}
                <Button btnType='Success'>Sign In</Button>
            </form>
        </div>
    )
}
    
}

const mapDispatchToProps = dispatch => {
    return{
        onAuth: (email, password)=> dispatch(actions.auth(email, password))
    }
}

export default connect(null, mapDispatchToProps)(Auth);