import React from 'react';
import MenuItem from './MenuItem';

const Menu= (props) => (
    <div className="menu">
        <h2 className="menu__title">Menu</h2>
        <h3 className="menu__subtitle">Pizzas</h3>
        <ul>
            {props.pizzas.map((item)=><MenuItem key={item.id} id={item.id} price={item.price} name={item.name} handleAddItem={props.handleAddItem} />)}
        </ul>
        <h3 className="menu__subtitle">Miscelaneous</h3>
        <ul>
            {props.misc.map((item)=><MenuItem key={item.id} id={item.id} price={item.price} name={item.name} handleAddItem={props.handleAddItem} />)}
        </ul>
    </div>
  );

export default Menu;
