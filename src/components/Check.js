import React from 'react';
import CheckItem from './CheckItem';

const Check=(props)=> (
    <div className="check">
        <h2 className="check__title">Your Order</h2>
        <h3 className="check-item" id="check__titles">
            <span>Item</span>
            <span>Price/Item</span>
            <span>Subtotal</span>
        </h3>
        {props.items.map((item)=> <CheckItem key={item.id} id={item.id} quantity={item.quantity} rate={props.rate} price={item.price} name={item.name} subtotal={item.subtotal} handleChangeQuantityItem={props.handleChangeQuantityItem} handleRemoveItem={props.handleRemoveItem}/>)}
        <h3 className="check__text">Delivery Costs: <span  className="check_prices"> € {props.delivery}</span>  <span className="check_prices">$ {(parseFloat(props.delivery)* parseFloat(props.rate)).toFixed(2)}</span></h3>
        <h2 className="check__text">Total: <span  className="check_prices">€ {props.total} </span>  <span  className="check_prices">$ {(parseFloat(props.total)* parseFloat(props.rate)).toFixed(2)}</span></h2>
        <h3 className="check__text">Contact Details</h3>
        <div className="check_input">
            <label htmlFor="name">Name:</label>
            <input type="text" required name="name" id="name" value={props.name} onChange={(event)=>props.handleInputChange(event)} />
        </div>
        <div className="check_input">
            <label htmlFor="phone">Phone:</label>
            <input type="number" required name="phone" id="phone" value={props.phone} onChange={(event)=>props.handleInputChange(event)} />
        </div>
        <div className="check_input">
            <label htmlFor="address">Address:</label>
            <input type="text" required name="address" id="address" value={props.address} onChange={(event)=>props.handleInputChange(event)} />
        </div>
        <div className="check__errors">
            {props.errors.map((error)=> <div key={error}>{error}</div>)}
        </div>
        <button type="submit" className="check__submit-button" onClick={()=>props.submitOrder() }>Order Ready</button>
    </div>
);

export default Check;
