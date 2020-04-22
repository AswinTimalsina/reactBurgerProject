import React from 'react';
import classes from './Image.module.css';
import image from '../../assets/images/original.png';

const Image = (props) => (
    <div className={classes.Image}>
        <img src={image} alt='BurgerImage'/>
    </div>

)

export default Image;