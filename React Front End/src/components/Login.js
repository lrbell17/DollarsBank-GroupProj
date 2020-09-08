import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import LoginRegistrationService from '../services/LoginRegesterService.js';


class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            activeUser: {},
            uname: "",
            pass: "",
            error: "",
            success: "",
            isLoggedIn: false
        }

       this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState(() => ({
            error: "",
            success: ""
        }));

        
        let uname = this.state.uname;
        let pass = this.state.pass;

        LoginRegistrationService.getUser(uname, pass)
        .then((response) => {
            
            if (response.data.userName ===uname && response.data.password === pass){
                this.setState(() => ({
                    activeUser: response.data,
                    success: "Login sucessful!",
                    isLoggedIn: true
                }));

                console.log("login sucessful!");
            }   
            else {
                console.log("Invalid Credentials!")
                this.setState(() => ({error: "Invalid Credentials!"}));
            }
        })
        .catch((error) => {
            console.log("ERROR")
            console.log(error);
        });
    }


    render () {

        // redirect if user logs in successfully
        const isLoggedIn = this.state.isLoggedIn;
        if (isLoggedIn === true) {
            return <Redirect to={{
                pathname: "/home",
                state: {
                    activeUser: this.state.activeUser,
                    isLoggedIn: this.state.isLoggedIn
                }
            }}  />
        }


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
                <p style={sucessStyle}>{this.state.success}</p>
                    
                {/* print error message */}
                <p style={errorStyle} >{this.state.error} </p>

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