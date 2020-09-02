import React from 'react';
import {Link} from 'react-router-dom';
import LoginRegistrationService from '../services/LoginRegesterService.js';

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            activeUser: {},
            uname: "",
            pass: "",
            errors: [],
            message: "",
        }
       this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState(() => ({
            errors: [],
            message: ""
        }))

        let errors = this.state.errors;
        let uname = this.state.uname;
        let pass = this.state.pass;

        LoginRegistrationService.getUser(uname, pass)
        .then((response) => {
            
            if (response.data.userName ===uname && response.data.password === pass){
                this.setState(() => ({
                    activeUser: response.data,
                    message: "Login sucessful!"
                }));
                console.log("login sucessful!");
            }   
            else {
                console.log("Invalid Credentials!")
                errors.push("Invalid Credentials!");
                this.setState(() => ({errors: errors}));
            }
        })
        .catch((error) => {
            console.log("ERROR")
            console.log(error);
        });
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
                <h1>Login</h1>

                {/* print success message */}
                <p style={sucessStyle}>{this.state.message}</p>
                    
                {/* print error message */}
                {this.state.errors.map(error => (
                    <p style={errorStyle} key={error}>Error: {error}
                </p>))}

                <form onSubmit={this.handleSubmit}>

                        <label>Username</label><br/>
                        <input type="text" value={this.state.uname} 
                            onChange={evt => this.setState({uname : evt.target.value })} placeholder="Username"  
                        /><br/><br/>


                        <label>Password</label><br/>
                        <input type="password" value={this.state.lname} 
                            onChange={evt => this.setState({pass : evt.target.value })} placeholder="Password"
                        /><br/><br/>

                        <input type="submit" />
                </form>

                <br></br>
                <Link  to='/register'>
                        Register
                </Link>

            </div>
        )
    }
}

export default Login;