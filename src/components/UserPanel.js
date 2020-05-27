import React from 'react';
import ReactModal from 'react-modal';
import HistoryOrder from './HistoryOrder';

ReactModal.setAppElement('body');

class UserPanel extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showModal:false,
        };
        this.handleOpenModal=this.handleOpenModal.bind(this);
        this.handleCloseModal=this.handleCloseModal.bind(this);
    }

    handleOpenModal(){
        this.setState({showModal:true});
    }

    handleCloseModal(){
        this.setState({showModal:false});
    }

    render(){
        return(
            <div className="user-panel navbar">
                <div className="dropdown">
                    <button className="user-panel__item dropbtn"> {this.props.username}<i className="fa fa-caret-down"></i></button>
                    <div className="dropdown-content">
                        <span href="#order-history" onClick={()=> this.handleOpenModal()}>Order History</span>
                        <span href="#logout" onClick={()=>this.props.logout()} >Logout</span>
                    </div>
                </div>
                <ReactModal isOpen={this.state.showModal} onRequestClose={this.handleCloseModal} shouldCloseOnOverlayClick={true}>
                <div className="modal-panel">
                    <h2>Order History</h2>
                    {this.props.orderHistory.map((order)=> <HistoryOrder key={order.id} id={order.id} phone={order.contact_phone} address={order.address} name={order.contact_name} orderItems={order.items} />)}
                </div>

                </ReactModal>
            </div>    

        );
    }


}


UserPanel.defaultProps={
    username:'',
    orderHistory:[]
};
  

export default UserPanel;