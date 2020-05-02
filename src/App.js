import React from 'react';
import axios from 'axios';
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

  componentDidMount(){
    axios.get('http://localhost:8000/api/items').then((response) =>{
      this.setState({
        pizzas:response.data.pizzas,
        misc_items:response.data.misc
      });
    });
  }

  render(){
    return (
      <div className="App">
        <Header />
        <Menu pizzas={this.state.pizzas} misc={this.state.misc_items} />
        <Check />
      </div>
    );
  }
}


export default App;
