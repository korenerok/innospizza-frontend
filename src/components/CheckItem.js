import React from 'react';

const CheckItem = (props)=>(
    <div className="check-item">
        <li>
            <input type="number" id={"quantity_"+props.id} className="check-item__text" value={props.quantity} min="1" onChange={(event)=>props.handleChangeQuantityItem(event,props.id)} />
            <p className="check-item__text">{props.name}</p>
            <p className="check-item__text">{props.price}</p>
            <p className="check-item__text">{props.subtotal}</p>
        </li>
    </div>
);

export default CheckItem;
