import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import AccountService from '../services/AccountService.js';
import TransactionService from '../services/TransactionService.js';
import NavBar from './NavBar';
import HomePage from './HomePage';

class Account extends HomePage {

    constructor(props) {
        super(props);
        initialDeposit = 0;
    }

    handleSubmit = (e) => {
        AccountService.createAccount(this.state.user.user_id, initialDeposit);
        return <Redirect to="/HomePAge" />
    }

    render() {
        // checks if user is logged in
        if (!this.props.location.state || this.state.isLoggedIn===false){
            return <Redirect to="/login" />
        }

        return(
            <div>
                <NavBar activeUser={this.state.user} isLoggedIn={this.state.isLoggedIn}/>
                <h3>Create Account</h3>
                
                <form onSubmit={this.handleSubmit}>

                        <label>Initial Deposit</label><br/>
                        <input type="text" value={this.state.initialDeposit} 
                            onChange={evt => this.setState({initialDeposit : evt.target.value })} placeholder="ex: 100.00"  
                        /><br/><br/>

                        <input type="submit" />
                </form>
            </div>
        );
    }
}