import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from '../BuildControl/BuildControl';

const ingredients = [
    {label: "Salad", type: "salad"},
    {label: "Bacon", type: "bacon"},
    {label: "Meat", type: "meat"},
    {label: "Cheese", type: "cheese"}
];


const buildControls = (props) => {
return(
<div className={classes.BuildControls}>
{ingredients.map(ctrl=> {

return <BuildControl 
label={ctrl.label} 
type={ctrl.type}
key={ctrl.label} 
Less={props.Less}
More={props.More}
/>

})}
</div>
)
}

export default buildControls;