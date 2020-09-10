import React from 'react';
import Login from './Login';
import {Redirect} from 'react-router-dom';
import AccountService from '../services/AccountService.js';
import NavBar from './NavBar';
import AccountTransactions from './AccountTransactions.js';
import TransactionService from '../services/TransactionService';



class HomePage extends Login {

    constructor(props){
        super(props);
        this.state = {
            user: {},
            isLoggedIn: null,
            userAccounts: [],
            success: "",
            error: "",
            accountForHist: null
        }

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
                    userAccounts: response.data
                }));
            });
        }
        
    }

    
    handleCloseAccount = (id) => {
        // delete account
        AccountService.deleteAccount(id).then(() =>{

            // delete transactions
            TransactionService.getAllAccountTransactions(id).then((response) => {

                response.data.map((transaction, index) => (
                    TransactionService.deleteTransaction(transaction.id).then(() => {
                        
                        this.setState(() =>({
                            success: "Account closed"
                        }))

                        // reload accounts
                        AccountService.getUserAccounts(this.state.user.id).then((response) => {
                            this.setState(() => ({
                                userAccounts: response.data
                            }));
                        });


                    })

                ))
            })
        })
        .catch((error) => {
            this.setState(() =>({
                error: "Unable to close account"
            }))
        });
    }

   
    handleTransactions = (id) => {

        this.setState(() => ({
            accountForHist: id
        }))

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
                {/* <NavBar /> */}

                <h2> Welcome {this.state.user.firstName} !</h2><br/>

                <p style={sucessStyle}>{this.state.success}</p>
                <p style={errorStyle} >{this.state.error} </p>

                <h4>Account information</h4>

                <table className="table">
                    <thead>
                            <tr>
                                <th>Account No</th>
                                <th>Balance</th>
                                <th></th>
                                <th></th>
                            </tr>
                    </thead>
                    <tbody>
                            {
                                userAccounts.map((account, index) => (
                                    
                                        <tr key={index}>
                                            <td>{account.id}</td>
                                            <td>${account.balance.toFixed(2)}</td>
                                            <td>
                                                <button onClick={() => this.handleCloseAccount(account.id)}>
                                                    Close Account
                                                </button>
                                            </td>
                                            <td>
                                                <button onClick={() => this.handleTransactions(account.id)}>
                                                    View Transactions
                                                </button>
                                            </td>
                                        </tr>
                                  
                                ))
                            }
                    </tbody>
                </table>

                {this.state.accountForHist !== null ? 
                    <div>
                        <br/><hr/>
                        <AccountTransactions accountNo={this.state.accountForHist}/>
                    </div>
                :
                <div></div>
                }
                

            </div>
        );
    }


}

export default HomePage;