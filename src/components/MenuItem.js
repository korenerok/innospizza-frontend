import React from 'react';

const MenuItem=(props) => (
    <div className="menu-item">
            <div><span className="menu-item__title">{props.name}</span></div>
            <div><span className="menu-item__text">€ {props.price}</span></div>
            <div><span className="menu-item__text">$ {(parseFloat(props.price)* parseFloat(props.rate)).toFixed(2)}</span></div>
            <button onClick={()=>props.handleAddItem({id:props.id,name:props.name,quantity:1, price:props.price, subtotal:props.price})}>Add</button>
    </div>
  );


export default MenuItem;
