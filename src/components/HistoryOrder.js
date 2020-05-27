import React from 'react';

const HistoryOrder = (props)=>(
        <div className="history-order">
            <h3 className="history-order__title"><strong> Order Number: {props.id}</strong></h3>
            <p className="history-order__text">Contact Name: {props.name}</p>
            <p className="history-order__text">Contact Phone: {props.phone}</p>
            <p className="history-order__text">Delivery Address: {props.address} </p>
            <p>Items:</p>
            <ul>
                {props.orderItems.map((item)=> <li key={item.id} className="history-item__text">{item.pivot.quantity} {item.name}</li>)}
            </ul>
            
        </div>
);

export default HistoryOrder;
