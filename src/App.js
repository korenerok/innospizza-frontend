import React from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Menu from './components/Menu';
import Check from './components/Check';

class App extends React.Component {
  constructor(props){
    super(props);
    this.handleAddItem=this.handleAddItem.bind(this);
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

  handleAddItem(item){
    let index=this.state.order.findIndex((order_item)=> item.id===order_item.id);
    if(index> -1){
      let order=this.state.order;
      order[index].quantity= parseInt(order[index].quantity) + parseInt(item.quantity);
      order[index].subtotal = parseFloat(order[index].subtotal) + parseFloat(item.price);
      this.setState({order});
    }else{
      this.setState((prevState)=>({ 
        order:prevState.order.concat({id:item.id,name:item.name,quantity:parseInt(item.quantity),price:parseFloat(item.price),subtotal:parseFloat(item.subtotal)})
       }));  
    }
    this.setState((prevstate)=>({order_total:prevstate.order.reduce((accumulator,current)=> accumulator+current.subtotal,0)}));
	}

  render(){
    return (
      <div className="App">
        <Header />
        <Menu pizzas={this.state.pizzas} misc={this.state.misc_items} handleAddItem={this.handleAddItem} />
        <Check items={this.state.order} total={this.state.order_total} />
      </div>
    );
  }
}


export default App;
