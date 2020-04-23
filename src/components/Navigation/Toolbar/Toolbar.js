import React from 'react';
import classes from './Toolbar.module.css';
import Image from '../../Image/Image';
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div>Menu</div>
        <Image />
        <nav><NavigationItems/></nav>
    </header>

)
export default Toolbar;