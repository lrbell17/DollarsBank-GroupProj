import React from 'react';
import {Link} from 'react-router-dom';
import LoginRegistrationService from '../services/LoginRegesterService.js';

class Register extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            fname: "",
            lname: "", 
            uname: "",
            email: "",
            pass: "",
            amount: 0,
            errors: [],
            message: ""
        }
       this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e)  {
        
        e.preventDefault();

        LoginRegistrationService.createUser(this.state.fname, this.state.lname, this.state.uname, this.state.email, 
            this.state.pass, this.state.amount)

        console.log("registration sucessful");
        this.setState.message = "Registration Sucessful!";

    }


    render () {

        const errorStyle = {
            color: 'red'
        }
        const sucessStyle = {
            color: 'blue'
        }

        return(
            <div>
                <h1>Registration</h1>

                {/* print success message */}
                <p style={sucessStyle}>{this.state.message}</p>
                    
                {/* print error message */}
                {this.state.errors.map(error => (
                    <p style={errorStyle} key={error}>Error: {error}</p>
                ))}

                <form onSubmit={this.handleSubmit}>
                    
                    <label>First Name</label><br/>
                        <input type="text" value={this.state.fname} 
                            onChange={evt => this.setState({fname : evt.target.value })} placeholder="First Name" 
                        required /> <br/><br/>

                        <label>Last Name</label><br/>
                        <input type="text" value={this.state.lname} 
                            onChange={evt => this.setState({lname : evt.target.value })} placeholder="Last Name"  
                            required 
                        /><br/><br/>

                        <label>Username</label><br/>
                        <input type="text" value={this.state.uname} 
                            onChange={evt => this.setState({uname : evt.target.value })} placeholder="Username"  
                            required 
                        /><br/><br/>

                        <label>Email</label><br/>
                        <input type="email" value={this.state.email} 
                            onChange={evt => this.setState({email : evt.target.value })} placeholder="Email" 
                            required 
                        /><br/><br/>

                        <label>Password</label><br/>
                        <input type="password" value={this.state.pass} 
                            onChange={evt => this.setState({pass : evt.target.value })} placeholder="Password" 
                            required 
                        /><br/><br/>

                        <label>Initial Deposit Amount</label><br/>
                        <input type="number" value={this.state.amount} 
                            onChange={evt => this.setState({amount : evt.target.value })} placeholder="$0.00"
                            min="0.00" step="0.01" required
                        /><br/><br/>

                        <input type="submit" />
                </form>

                <br></br>
                <Link  to='/login'>
                        Login
                </Link>

            </div>
        )
    }
}

export default Register;