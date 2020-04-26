import classes from './SideDrawer.module.css';
import React, {Component} from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Image/Image'
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary';

class SideDrawer extends Component{
    state={
        backdropShow: true
    }

    backdropHandler=()=>{
        this.setState({backdropShow: false})
    }

    render(){
        let attachedClasses = [classes.SideDrawer, classes.Close];

        if(this.state.backdropShow){
            attachedClasses = [classes.SideDrawer, classes.Open]
        }
    return(
        <Aux>
            <Backdrop removeBackdrop={this.backdropHandler} show={this.state.backdropShow} />
            <div className={attachedClasses.join(' ')}>
            <div className={classes.logo}>
                <Logo />
            </div>
            <nav>
            <NavigationItems />
            </nav>
        </div>
        </Aux>
    ) 
    }
}

export default SideDrawer;