import React from 'react';
import classes from './NavigationItem.module.css';
import {NavLink} from 'react-router-dom';


const NavigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink to={props.link}
            className={props.active ? classes.active : null} >
            {props.children}
            </NavLink>
    </li>
    
)



export default NavigationItem;