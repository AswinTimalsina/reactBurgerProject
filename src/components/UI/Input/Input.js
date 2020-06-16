import React from 'react';
import classes from './Input.module.css';

const input = (props) => {

    let formInput = null;

    let inputClasses = [classes.InputElement];

    let validationError = null;

    if(props.validation && props.invalid && props.touched){
        inputClasses.push(classes.Invalid);
    validationError = <p>Please enter a valid {props.valued}!</p>
    }

    switch (props.elementType) {
        case 'input':
            formInput = <input onChange={props.changed} className={inputClasses.join(' ')}  {...props.elementConfig}/>
            break;
        case 'textarea':
            formInput = <textarea onChange={props.changed} className={classes.InputElement} {...props.elementConfig}/>
            break;

        case 'select':
            formInput = (
            <select onChange={props.changed} 
            className={classes.InputElement}
            value={props.value}>
            {props.elementConfig.options.map(option=>(
                <option key={option.value} value={option.value}>{option.displayValue}</option>
            ))}

            </select>
                
                )
                break;
        default:
            formInput = <input className={classes.InputElement} {...props.elementConfig}/>

    }

    return (<div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {formInput}
        {validationError}
    </div>)


};

export default input;