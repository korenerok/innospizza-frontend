import React from 'react';
import CheckItem from './CheckItem';

const Check=(props)=> (
    <div className="check">
        <h2 className="check__title">Your Order</h2>
        <ul>
            {props.items.map((item)=> <CheckItem key={item.id} id={item.id} quantity={item.quantity} price={item.price} name={item.name} subtotal={item.subtotal} handleChangeQuantityItem={props.handleChangeQuantityItem} />)}
        </ul>
        <h3 className="check__text">Total: {props.total}</h3>
    </div>
);

export default Check;
