import React from 'react';

const CheckItem = (props)=>(
        <div className="check-item">
            <input type="number" id={"quantity_"+props.id} className="check-item__number-input" value={props.quantity} min="1" onChange={(event)=>props.handleChangeQuantityItem(event,props.id)} />
            <span className="check-item__text check-item__name">{props.name}</span>
            <span className="check-item__text check-item__price">€ {props.price}</span>
            <span className="check-item__text check-item__price">$ {(parseFloat(props.price)* parseFloat(props.rate)).toFixed(2)}</span>

            <span className="check-item__text check-item__price">€ {props.subtotal}</span>
            <span className="check-item__text check-item__price">$ {(parseFloat(props.subtotal)* parseFloat(props.rate)).toFixed(2)}</span>
            <button onClick={()=>props.handleRemoveItem(props.id)}>Remove</button>
        </div>
);

export default CheckItem;
