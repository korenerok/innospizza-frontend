import React from 'react';
import './App.css';
import Header from './components/Header';
import Menu from './components/Menu';
import Check from './components/Check';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      misc_items:[],
      pizzas:[],
      order:[],
      order_total:0
    };
  }

  render(){
    return (
      <div className="App">
        <Header />
        <Menu />
        <Check />
      </div>
    );
  }
}


export default App;
