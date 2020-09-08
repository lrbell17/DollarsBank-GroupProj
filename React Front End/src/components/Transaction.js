import React from 'react';
import {Redirect} from 'react-router-dom';
import AccountService from '../services/AccountService.js';
import NavBar from './NavBar';
import TransactionService from '../services/TransactionService.js';



class Transaction extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            user: {},
            isLoggedIn: null,
            userAccounts: [],
            accountNo: 0,
            transactionType: "deposit",
            accountForTransfer: "",
            amount: 0,
            balance: 0, 
            success: "", 
            error: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount = () => {
  
        if (this.props.location.state !== undefined){
                
 
            const activeUser = this.props.location.state.activeUser;


            this.setState(() => ({
                user: this.props.location.state.activeUser,
                isLoggedIn: this.props.location.state.isLoggedIn
            }))

            AccountService.getUserAccounts(activeUser.id).then((response) => {
                this.setState(() => ({
                    userAccounts: response.data,
                    accountNo: response.data[0].id
                }));
            });
        }
    }

    handleSubmit = () => {
      
        AccountService.getAccount(this.state.accountNo).then((response) => {

            // Deposit
            if (this.state.transactionType === "deposit"){
                
                TransactionService.createTransaction("DEPOSIT", this.state.user.id, this.state.accountNo, this.state.amount,
                response.data.balance, parseFloat(response.data.balance) + parseFloat(this.state.amount))
  
                AccountService.updateAccount(this.state.accountNo, this.state.user.id, parseFloat(response.data.balance) 
                + parseFloat(this.state.amount));

                this.setState(() => ({
                    success: "Deposit successful"
                }));
            }

            // withdraw
            else if (this.state.transactionType === "withdraw"){

                if (response.data.balance < this.state.amount){
                    this.setState(() => ({
                        error: "Insufficient Funds"
                    }));
                }
                else {
                    TransactionService.createTransaction("WITHDRAW", this.state.user.id, this.state.accountNo, this.state.amount,
                    response.data.balance, parseFloat(response.data.balance) - parseFloat(this.state.amount))
 
                    AccountService.updateAccount(this.state.accountNo, this.state.user.id, parseFloat(response.data.balance) 
                    - parseFloat(this.state.amount));

                    this.setState(() => ({
                        success: "Withdraw successful"
                    }));
                }
            }
            // transfer
            else {
                if (response.data.balance < this.state.amount){
                    this.setState(() => ({
                        error: "Insufficient Funds"
                    }));
                }
                else {

                    AccountService.getAccount(this.state.accountForTransfer).then((responseTrans) => {

                        // Remove funds from active account
                        TransactionService.createTransaction(`Transfer to ${this.state.accountForTransfer}`, 
                            this.state.user.id, this.state.accountNo, this.state.amount, response.data.balance, 
                            parseFloat(response.data.balance) - parseFloat(this.state.amount));
    
                        AccountService.updateAccount(this.state.accountNo, this.state.user.id, 
                            parseFloat(response.data.balance) - parseFloat(this.state.amount));

                        // add funds to recipient
                        TransactionService.createTransaction(`Transfer from ${this.state.accountNo}`, 
                            responseTrans.data.userId, this.state.accountForTransfer, this.state.amount,
                            responseTrans.data.balance,
                            parseFloat(responseTrans.data.balance) + parseFloat(this.state.amount));
                        
                        AccountService.updateAccount(this.state.accountForTransfer, responseTrans.data.userId, 
                            parseFloat(responseTrans.data.balance) + parseFloat(this.state.amount));
                        
                        this.setState(() => ({
                            success: "Transfer Sucessful"
                        }))
                    })
                    .catch((error) => {
                        console.log(error);
                        this.setState(() => ({
                            error: "Unable to process transfer"
                        }))
                    });
                }
            }

            
        })

        
        
        
    }

    render() {

        // checks if user is logged in
        if (!this.props.location.state || this.state.isLoggedIn===false){
            return <Redirect to="/login" />
        }
 
        const userAccounts = this.state.userAccounts;

        const errorStyle = {
            color: 'red'
        }
        const sucessStyle = {
            color: 'blue'
        }

        return(

            
            <div>
                <NavBar activeUser={this.state.user} isLoggedIn={this.state.isLoggedIn}/>


                <h4>Make a Transaction</h4>

                <p style={sucessStyle}>{this.state.success}</p>
                <p style={errorStyle} >{this.state.error} </p>

                <form>
                    
                    <strong>Account No:    </strong>
                    <select value={this.state.accountNo} onChange={evt => this.setState({accountNo : evt.target.value })}>
                        
                        {
                        userAccounts.sort().map((account, index) => (
                            <option key={index}>
                                            {account.id} 
                            </option>))
                                    
                        }
                    
                    </select>
                    <br/>

                    <strong>Transaction Type:</strong><br/> 
                        <input type="radio" id="deposit" name="transType" value="deposit" 
                            checked={this.state.transactionType === 'deposit'} 
                            onChange={evt => this.setState({transactionType : evt.target.value })} />
                        <label for="deposit">Deposit</label><br/>

                        <input type="radio" id="withdraw" name="transType" value="withdraw" 
                            checked={this.state.transactionType === 'withdraw'}
                            onChange={evt => this.setState({transactionType : evt.target.value })} />
                        <label for="withdraw">Withdraw</label><br/>

                        <input type="radio" id="transfer" name="transType" value="transfer"
                            checked={this.state.transactionType === 'transfer'}
                            onChange={evt => this.setState({transactionType : evt.target.value })} />
                        <label for="transfer">Transfer</label>
                    <br/>


                    <strong>Amount: </strong><br/>
                    <input type="number" value={this.state.amount} 
                            onChange={evt => this.setState({amount : evt.target.value })} placeholder="$0.00"
                            min="0.00" step="0.01" required
                    /><br/>
                    
                    {
                    this.state.transactionType === "transfer"
                    ? 
                    <div>
                        <strong>Account No of recipient: </strong><br/>
                        <input type="number" value={this.state.accountForTransfer} 
                                onChange={evt => this.setState({accountForTransfer : evt.target.value })} 
                                placeholder="Account Number" required/>
                        <br/>
                    </div>
                    : 
                    <div></div>
                    }
                    
                    <br/>

                </form>
                
                <button onClick={this.handleSubmit} >Submit </button>
                
                
            </div>
        );
    }
}

export default Transaction;