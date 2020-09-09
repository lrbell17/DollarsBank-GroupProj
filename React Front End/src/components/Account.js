import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import AccountService from '../services/AccountService.js';
import NavBar from './NavBar';
import HomePage from './HomePage';

class Account extends HomePage {

    constructor(props) {
        super(props);
        this.state = {
            initialDeposit: 0,
            success: "",
            error: ""
        }
        
    }

    handleSubmit = (e) => {
        AccountService.createAccount(this.props.location.state.activeUser.id, this.state.initialDeposit).then(() => {
            this.setState(() => ({
                success: "Account created sucessfully"
            }));
        })
        .catch((error) =>{
            console.log(error);
            this.setState(() => ({
                error: "Unable to create account"
            }));
        });
    }

    render() {
        // checks if user is logged in
        if (!this.props.location.state || this.state.isLoggedIn===false){
            return <Redirect to="/login" />
        }

        const sucessStyle = {
            color: 'blue'
        }
        const errorStyle = {
            color: 'red'
        }

        return(
            <div>
                <NavBar activeUser={this.state.user} isLoggedIn={this.state.isLoggedIn}/>
                <h3>Create Account</h3>

                <p style={sucessStyle}>{this.state.success}</p>
                <p style={errorStyle} >{this.state.error} </p>
                
                <form onSubmit={this.handleSubmit}>

                        <label>Initial Deposit</label><br/>
                        <input type="text" value={this.state.initialDeposit} 
                            onChange={evt => this.setState({initialDeposit : evt.target.value })} placeholder="ex: 100.00"  
                        /><br/><br/>

                </form>

                <button onClick={() => {this.handleSubmit()}}>Submit</button>
            </div>
        );
    }
}

export default Account;