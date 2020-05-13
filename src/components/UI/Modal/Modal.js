import React, {Component} from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component{
    // updating the modal along with the props.children if the modal is shown
    shouldComponentUpdate(nextProps, nextState){
        return this.props.modalShow !== nextProps.modalShow;
    }

    componentWillUpdate(){
        console.log('[Modal] Will Update')
    }


    render(){
        return(<Aux>
            <Backdrop show={this.props.modalShow} removeBackdrop={this.props.removeBackdrop}/>
            <div className={classes.Modal}
                style={{transform: this.props.modalShow ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.modalShow ? '1' : '0'
                }}
            >
            
                {this.props.children}
            </div>
            </Aux>)
    }

}

export default Modal;