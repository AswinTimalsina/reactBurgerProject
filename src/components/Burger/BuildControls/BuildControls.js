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
key={ctrl.label} 
Less={()=>props.Less(ctrl.type)}
More={()=>props.More(ctrl.type)}
disabled={props.disabled[ctrl.type]}
/>

})}
</div>
)
}

export default buildControls;