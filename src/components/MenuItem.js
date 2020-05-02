import React from 'react';

const MenuItem=(props) => (
    <div className="menu-item">
        <li>
            <img src={"../img/item"+props.id} alt=""/>
            <p className="menu-item__title">{props.name}</p>
            <p className="menu-item__text">{props.price}</p>
            <button onClick={()=>props.handleAddItem({id:props.id,name:props.name,quantity:1, price:props.price, subtotal:props.price})}>Add</button>
        </li>
    </div>
  );


export default MenuItem;
