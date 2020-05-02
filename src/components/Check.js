import React from 'react';
import CheckItem from './CheckItem';

const Check=(props)=> (
    <div className="check">
        <h2 className="check__title">Your Order</h2>
        <ul>
            {props.items.map((item)=> <CheckItem key={item.id} id={item.id} quantity={item.quantity} price={item.price} name={item.name} subtotal={item.subtotal} handleChangeQuantityItem={props.handleChangeQuantityItem} handleRemoveItem={props.handleRemoveItem}/>)}
        </ul>
        <h3 className="check__text">Total: {props.total}</h3>
        <h3 className="check__text">Contact Details</h3>
        <div className="check_input">
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" value={props.name} onChange={(event)=>props.handleInputChange(event)} />
        </div>
        <div className="check_input">
            <label htmlFor="phone">Phone:</label>
            <input type="number" name="phone" id="phone" value={props.phone} onChange={(event)=>props.handleInputChange(event)} />
        </div>
        <div className="check_input">
            <label htmlFor="address">Address:</label>
            <input type="text-area" name="address" id="address" value={props.address} onChange={(event)=>props.handleInputChange(event)} />
        </div>
        <button onClick={()=>props.submitOrder()}>Done!</button>
    </div>
);

export default Check;
