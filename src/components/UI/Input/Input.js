import React from 'react';
import classes from './Input.module.css';

const input = (props) => {

    let formInput = null;

    switch (props.elementType) {
        case 'input':
            formInput = <input className={classes.InputElement}  {...props.elementConfig}/>
            break;
        case 'textarea':
            formInput = <textarea className={classes.InputElement} {...props.elementConfig}/>
            break;

        default:
            formInput = <input className={classes.InputElement} {...props.elementConfig}/>

    }

    return (<div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {formInput}
    </div>)


};

export default input;