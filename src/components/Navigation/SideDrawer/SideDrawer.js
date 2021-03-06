import classes from './SideDrawer.module.css';
import React, {Component} from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Image/Image'
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

class SideDrawer extends Component{
    

    render(){
        let attachedClasses = [classes.SideDrawer, classes.Close];

        if(this.props.backdropShow){
            attachedClasses = [classes.SideDrawer, classes.Open];
        }
        else{
            attachedClasses = [classes.SideDrawer, classes.Close];
        }
    return(
        <Aux>
            <Backdrop removeBackdrop={this.props.backdropHandler} show={this.props.backdropShow} />
            <div className={attachedClasses.join(' ')}>
            <div className={classes.logo}>
                <Logo />
            </div>
            <nav>
            <NavigationItems isAuthenticated={this.props.isAuthenticated} />
            </nav>
            
        </div>
        </Aux>
    ) 
    }
}

export default SideDrawer;