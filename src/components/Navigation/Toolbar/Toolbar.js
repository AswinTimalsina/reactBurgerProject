import React from 'react';
import classes from './Toolbar.module.css';
import Image from '../../Image/Image';
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div onClick={props.openSideDrawer} className={classes.DrawerToggle}>
            <div> </div>
            <div> </div>
            <div> </div>
        </div>
        <Image />
        <nav className={classes.DesktopOnly}><NavigationItems isAuthenticated={props.isAuthenticated}/></nav>
    </header>

)
export default Toolbar;