import React from 'react';

const CheckItem = (props)=>(
    <div className="check-item">
        <li>
            <p className="check-item__text">{props.quantity}</p>
            <p className="check-item__text">{props.name}</p>
            <p className="check-item__text">{props.price}</p>
            <p className="check-item__text">{props.subtotal}</p>
        </li>
    </div>
);

export default CheckItem;
