import React from 'react';
import classes from './Toolbar.module.css';
import Image from '../Image/Image';

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div>Menu</div>
        <Image />
        <nav>...</nav>
    </header>

)
export default Toolbar;