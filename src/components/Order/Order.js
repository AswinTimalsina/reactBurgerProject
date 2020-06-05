import React from 'react';
import classes from './Order.module.css';

const Order = (props) => {
    let ingredients = [];

    for (let key in props.ingredients) {
        ingredients.push({ id: key, name: key, value: props.ingredients[key] })
    }

    let ingrediente = ingredients.map(ing =>
        <div key={ing.name}
            style={{
                textTransform: 'capitalize',
                margin: '0 8px',
                display: 'inline-block',
                border: '1px solid #ccc',
                padding: '5px'
            }}>
            <span>{ing.name} ({ing.value})</span>
        </div>)

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingrediente}
            </p>
            <p>Price: <strong>USD {parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
}

export default Order;