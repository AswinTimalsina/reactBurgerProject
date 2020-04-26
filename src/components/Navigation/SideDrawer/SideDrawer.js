import classes from './SideDrawer.module.css';
import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Image/Image'

const SideDrawer = () => {
    return(
        <div className={classes.SideDrawer}>
            <Logo />
            <nav>
            <NavigationItems />
            </nav>
        </div>
    ) 
}

export default SideDrawer;