import React from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
return(<Aux>
<Backdrop show={props.modalShow} removeBackdrop={props.removeBackdrop}/>
<div className={classes.Modal}
    style={{transform: props.modalShow ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.modalShow ? '1' : '0'
    }}
>

    {props.children}
</div>
</Aux>)
}

export default Modal;