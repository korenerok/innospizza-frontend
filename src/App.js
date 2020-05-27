import React from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Menu from './components/Menu';
import Check from './components/Check';
import UserPanel from './components/UserPanel';
import LoginPanel from './components/LoginPanel';
import Cookies from 'universal-cookie';

class App extends React.Component {
  constructor(props){
    super(props);
    this.handleAddItem=this.handleAddItem.bind(this);
    this.handleChangeQuantityItem=this.handleChangeQuantityItem.bind(this);
    this.handleRemoveItem=this.handleRemoveItem.bind(this);
    this.handleInputChange=this.handleInputChange.bind(this);
    this.submitOrder=this.submitOrder.bind(this);
    this.register=this.register.bind(this);
    this.login=this.login.bind(this);
    this.logout=this.logout.bind(this);
    this.state={
      misc_items:[],
      pizzas:[],
      order:[],
      orderHistory:[],
      address:'',
      phone:'',
      name:'',
      usd_rate:'',
      delivery:process.env.REACT_APP_DELIVERY_COST,
      order_total:process.env.REACT_APP_DELIVERY_COST,
      username:'',
      usertoken:'',
      loginError:'',
      registerError:[],
      errors:[]
    };
  }

  componentDidMount(){
    axios.get(process.env.REACT_APP_API_URL+'api/items')
    .then((response) =>{
      this.setState({
        pizzas:response.data.pizzas,
        misc_items:response.data.misc
      });
    })
    .catch((error)=>(console.log(error)));
    axios.get(process.env.REACT_APP_RATE_API_URL)
    .then((response) =>{
      this.setState({
        usd_rate:response.data.rates.USD
      });
    })
    .catch((error)=>(console.log(error)));
    const cookie=new Cookies().get('userToken');
    if(cookie!=null){
      this.getUserDetails(cookie);
    }
  }

  getUserDetails(token=this.state.usertoken){
    let request= axios.create({
      baseURL:process.env.REACT_APP_API_URL,
      url:'api/details',
      headers:{'Accept':'application/json','Authorization':'Bearer '+token}
    });
    request.post()
    .then((response) =>{
      this.setState({
        username:response.data.success.name
      });
    })
    .catch((error)=>(console.log(error)));
    //get history order from user
    request= axios.create({
      baseURL:process.env.REACT_APP_API_URL,
      url:'api/orders',
      headers:{'Accept':'application/json','Authorization':'Bearer '+token}
    });
    request.get()
    .then((response) =>{
      this.setState({
        orderHistory:response.data.orders
      });
    })
    .catch((error)=>(console.log(error)));
  }

  login(event,email,password){
    event.preventDefault();
    axios.post(process.env.REACT_APP_API_URL+'api/login',{
      email:email,
      password:password
    })
    .then((response) =>{
      new Cookies().set('userToken',response.data.success.token,{maxAge:3600});
      this.setState({
        usertoken:response.data.success.token,
        loginError:''
      },()=>this.getUserDetails());
    })
    .catch((error)=>{this.setState({loginError:error.response.data.error})});
  }

  logout(){
    this.setState({
      usertoken:'',
      username:'',
      orderHistory:[]
    });
    new Cookies().remove('userToken');
  }

  register(event, name,email,password,confirm_password){
    event.preventDefault();
    axios.post(process.env.REACT_APP_API_URL+'api/users',{
        name:name,            
        email:email,
        password:password,
        confirm_password:confirm_password
    })
    .then((response) =>{
      this.setState({
        usertoken:response.data.success.token,
        username:response.data.success.name,
        registerError:[]
      });
      new Cookies().set('userToken',response.data.success.token,{maxAge:3600});
    })
    .catch((error)=>{
      //this.setState({registerError:error.response.data.error})
      console.log(error)
      //console.log(Array.from(error.response.data.error));
    });
  }

  updateOrderTotal(){
    this.setState((prevstate)=>({order_total:prevstate.order.reduce((accumulator,current)=> accumulator+current.subtotal,parseFloat(this.state.delivery))}));
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

  orderCreated(id){
    this.setState({
      order:[],
      address:'',
      phone:'',
      name:'',
    });
    alert('Your order number is '+id+'. Soon it will arrive to the address you entered. Buon appetito!');
    this.updateOrderTotal();
  }

  submitOrder(){
    let errors=[];
    if(this.state.name.length===0){
      errors.push('Field Name is required');
    }
    if(this.state.phone.length===0){
      errors.push('Field Phone is required');
    }
    if(this.state.address.length===0){
      errors.push('Field Address is required');
    }
    if(this.state.order.length===0){
      errors.push('Order must have at least one Item');
    }
    this.setState({errors});
    if(errors.length===0){
      let headers=[];
      if(this.state.username===''){
        headers={'Accept':'application/json','Authorization':'Bearer '+this.state.usertoken}
      }
      const request= axios.create({
        baseURL:process.env.REACT_APP_API_URL,
        url:'api/orders',
        headers:headers,
        data:{
          items:this.state.order,
          name:this.state.name,
          phone:this.state.phone,
          address:this.state.address,
          price:this.state.order_total
        }
      });
  
      request.post()
      .then((response)=>(
        //console.log(response.data)))
        this.orderCreated(response.data)))
      .catch((error)=>(console.log(error)));
    }
  }

  render(){
    return (
      <div className="App">
        <Header/>
        {this.state.username==='' ? <LoginPanel login={this.login} register={this.register} loginError={this.state.loginError} registerError={this.state.registerError} />:<UserPanel username={this.state.username} orderHistory={this.state.orderHistory} logout={this.logout} />}
        <Menu pizzas={this.state.pizzas} misc={this.state.misc_items} rate={this.state.usd_rate} handleAddItem={this.handleAddItem} />
        <Check items={this.state.order} total={this.state.order_total} rate={this.state.usd_rate} errors={this.state.errors} address={this.state.address} phone={this.state.phone} name={this.state.name} delivery={this.state.delivery} handleChangeQuantityItem= {this.handleChangeQuantityItem} handleRemoveItem={this.handleRemoveItem} handleInputChange={this.handleInputChange} submitOrder={this.submitOrder}/>
      </div>
    );
  }
}


export default App;
