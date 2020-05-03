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
    this.handleChangeQuantityItem=this.handleChangeQuantityItem.bind(this);
    this.handleRemoveItem=this.handleRemoveItem.bind(this);
    this.handleInputChange=this.handleInputChange.bind(this);
    this.submitOrder=this.submitOrder.bind(this);
    this.state={
      misc_items:[],
      pizzas:[],
      order:[],
      address:'',
      phone:'',
      name:'',
      order_total:0,
    };
  }

  componentDidMount(){
    axios.get(process.env.REACT_APP_API_URL+'api/items/')
    .then((response) =>{
      this.setState({
        pizzas:response.data.pizzas,
        misc_items:response.data.misc
      });
    })
    .catch((error)=>(console.log(error)));
  }

  updateOrderTotal(){
    this.setState((prevstate)=>({order_total:prevstate.order.reduce((accumulator,current)=> accumulator+current.subtotal,0)}));
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
    this.updateOrderTotal();
	}

  handleChangeQuantityItem(event,id){
    let index=this.state.order.findIndex((order_item)=> id===order_item.id);
    let order=this.state.order;
    let value=event.target.value;
    order[index].quantity=value;
    order[index].subtotal = parseFloat(order[index].price) * value;
    this.setState({order});
    this.updateOrderTotal();
  }

  handleRemoveItem(id){
    let index=this.state.order.findIndex((order_item)=> id===order_item.id);
    let order=this.state.order;
    order.splice(index,1);
    this.setState({order});
    this.updateOrderTotal();
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  }

  submitOrder(){
    axios.post(process.env.REACT_APP_API_URL+'api/orders',{
      items:this.state.order,
      name:this.state.name,
      phone:this.state.phone,
      address:this.state.address,
      price:this.state.order_total
    })
    .then((response)=>(
      console.log(response.data)))
    .catch((error)=>(console.log(error)));
  }

  render(){
    return (
      <div className="App">
        <Header />
        <Menu pizzas={this.state.pizzas} misc={this.state.misc_items} handleAddItem={this.handleAddItem} />
        <Check items={this.state.order} total={this.state.order_total} address={this.state.address} phone={this.state.phone} name={this.state.name} handleChangeQuantityItem= {this.handleChangeQuantityItem} handleRemoveItem={this.handleRemoveItem} handleInputChange={this.handleInputChange} submitOrder={this.submitOrder}/>
      </div>
    );
  }
}


export default App;
