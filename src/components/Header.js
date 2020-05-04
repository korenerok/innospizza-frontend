import React from 'react';

const Header= (props)=> (
    <div className="header">
      <div className="header__background">
        <h1 className="header__title">{props.title}</h1>
        <h2 className="header__subtitle">{props.subtitle}</h2>
      </div>
    </div>
  );

Header.defaultProps={
  title: 'INNOSPIZZA',
  subtitle: 'Innovating the way you order pizza'
};

export default Header;
