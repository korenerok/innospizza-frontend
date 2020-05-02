import React from 'react';

const MenuItem=(props) => (
    <div className="menu-item">
        <li>
            <img src={"../img/item"+props.id} alt=""/>
            <p className="menu-item__title">{props.name}</p>
            <p className="menu-item__text">{props.price}</p>
        </li>
    </div>
  );


export default MenuItem;
