import React from 'react';
import MenuItem from './MenuItem';

const Menu= (props) => (
    <div className="menu">
        <h2 className="menu__title">Menu</h2>
        <h3 className="menu__subtitle">Pizzas</h3>
        <div className="menu_category">
                {props.pizzas.map((item)=><MenuItem key={item.id} id={item.id} rate={props.rate} price={item.price} name={item.name} handleAddItem={props.handleAddItem} />)}
        </div>
        <h3 className="menu__subtitle">Miscelaneous</h3>
        <div className="menu_category">
            {props.misc.map((item)=><MenuItem key={item.id} id={item.id} rate={props.rate} price={item.price} name={item.name} handleAddItem={props.handleAddItem} />)}
        </div>
    </div>
  );

export default Menu;
