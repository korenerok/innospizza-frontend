import React from 'react';
import ReactModal from 'react-modal';
ReactModal.setAppElement('body');

class LoginPanel extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showModalLogin:false,
            showModalRegister:false,
            email:'',
            password:'',
            confirm_password:'',
            name:'',

        };
        this.handleOpenModal=this.handleOpenModal.bind(this);
        this.handleCloseModal=this.handleCloseModal.bind(this);
    }

    handleOpenModal(type){
        if(type==='login'){
            this.setState({showModalLogin:true});
        }
        if(type==='register'){
            this.setState({showModalRegister:true});
        }
    }

    handleCloseModal(type){
        if(type==='login'){
            this.setState({showModalLogin:false});
        }
        if(type==='register'){
            this.setState({showModalRegister:false});
        }
    }


    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
          [name]: value
        });
    }
    
    render(){
        return (
        <div className="login-panel navbar">
            <a href="#login" className="login-panel__button" onClick={()=>this.handleOpenModal('login')}>Login</a>
            <ReactModal isOpen={this.state.showModalLogin} onRequestClose={()=>this.handleCloseModal('login')} shouldCloseOnOverlayClick={true} >
                <div className="modal-panel">
                    <form onSubmit={(event)=> this.props.login(event,this.state.email,this.state.password)}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" onChange={(event)=>this.handleInputChange(event)} />
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" onChange={(event)=>this.handleInputChange(event)} />
                        <button type='submit'>Login</button>
                        {this.props.loginError && <p className="login-error">{this.props.loginError} </p>}
                    </form>
                </div>
            </ReactModal>
            <a href="#register" className="login-panel__button" onClick={()=>this.handleOpenModal('register')}>Register</a>
            <ReactModal isOpen={this.state.showModalRegister} onRequestClose={()=>this.handleCloseModal('register')} shouldCloseOnOverlayClick={true} >
                <div className="modal-panel">
                    <form onSubmit={(event)=> this.props.register(event,this.state.name, this.state.email,this.state.password,this.state.confirm_password)}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" onChange={(event)=>this.handleInputChange(event)} />
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" onChange={(event)=>this.handleInputChange(event)} />
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" onChange={(event)=>this.handleInputChange(event)} />
                        <label htmlFor="confirm_password">Confirm Password</label>
                        <input type="password" name="confirm_password" onChange={(event)=>this.handleInputChange(event)} />
                        <button type='submit'>Login</button>
                        {this.props.registerError.map((error)=> <p className="login-error" key={error} >{error}</p>)}
                    </form>
                </div>
            </ReactModal>
        </div>    
        );
    }

}

export default LoginPanel;
