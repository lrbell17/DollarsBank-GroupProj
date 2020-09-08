import React from 'react';
import Login from './Login';
import {Link, Redirect} from 'react-router-dom';
import AccountService from '../services/AccountService.js';
import NavBar from './NavBar';




class HomePage extends Login {

    constructor(props){
        super(props);
        this.state = {
            user: {},
            isLoggedIn: null,
            userAccounts: [],
            success: "",
            error: ""
        }

        //this.baseState = this.state;
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

            AccountService.getUserAccounts(activeUser.id).then((response) => {
                console.log(response.data)
                this.setState(() => ({
                    userAccounts: response.data
                }));
            });
        }
        
    }

    // TODO --> 500 error
    handleCloseAccount = (id) => {
        AccountService.deleteAccount(id).then(() =>{
            this.setState(() =>({
                success: "Account closed"
            }))
        })
        .catch((error) => {
            this.setState(() =>({
                error: "Unable to close account"
            }))
        });
    }

    //TODO
    handleTransactions = () => {

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

                <h2> Welcome {this.state.user.firstName} !</h2><br/><br/>

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
                                    
                                        <tr>
                                            <td>{account.id}</td>
                                            <td>{account.balance.toFixed(2)}</td>
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

            </div>
        );
    }


}

export default HomePage;