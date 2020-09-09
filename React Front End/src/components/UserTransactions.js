import React from 'react';
import Login from './Login';
import {Redirect} from 'react-router-dom';
import NavBar from './NavBar';
import TransactionService from '../services/TransactionService.js';

class UserTransactions extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            user: {},
            isLoggedIn: null,
            userAccounts: [],
            userTransactions: [],
            success: "",
            error: ""
        }
    }

    componentDidMount = () => {
  
        if (this.props.location.state !== undefined){
            console.log(this.props.location.state.isLoggedIn);
            console.log(this.props.location.state.activeUser.id);
            
            const activeUser = this.props.location.state.activeUser;


            this.setState(() => ({
                user: this.props.location.state.activeUser,
                isLoggedIn: this.props.location.state.isLoggedIn
            }))

            TransactionService.getAllUserTransactions(activeUser.id).then((response) => {
                
                console.log(response.data);
                this.setState(() => ({
                    userTransactions: response.data
                }));

            })
        }
        
    }

    render() {

        if (!this.props.location.state || this.state.isLoggedIn===false){
            return <Redirect to="/login" />
        }

        const userTransactions = this.state.userTransactions;

        const errorStyle = {
            color: 'red'
        }
        const sucessStyle = {
            color: 'blue'
        }

        return(
            <div>
                <NavBar activeUser={this.state.user} isLoggedIn={this.state.isLoggedIn}/>

                <h2> All Transactions for {this.state.user.firstName} (User: {this.state.user.id}) </h2><br/><br/>

                <p style={sucessStyle}>{this.state.success}</p>
                <p style={errorStyle} >{this.state.error} </p>


                <table className="table">
                    <thead>
                            <tr>
                                <th>Account No</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Balance</th>
                                <th>Time</th>
                            </tr>
                    </thead>
                    <tbody>
                        {
                            userTransactions.reverse().map((transaction, index) => (
                                
                                <tr>
                                    <td>{transaction.accountId}</td>
                                    <td>{transaction.type}</td>

                                    {parseFloat(transaction.startBalance) <= parseFloat(transaction.endBalance) ?
                                        <td style={sucessStyle}>+ ${transaction.amount.toFixed(2)}</td>
                                        :
                                        <td style={errorStyle}>- ${transaction.amount.toFixed(2)}</td>
                                    }
                                    
                                    <td>${transaction.endBalance.toFixed(2)}</td>
                                    <td>{transaction.timeStamp}</td>
                                            
                                </tr>
                                  
                            ))
                        }
                    </tbody>
                </table>

                </div>
        )
    }
}

export default UserTransactions;