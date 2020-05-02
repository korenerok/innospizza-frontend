import React from 'react';

const Check=(props)=> (
    <div className="check">
        <h2 className="check__title">Your Order</h2>
        <h3 className="check__text">Total: {props.total}</h3>
    </div>
);

export default Check;
