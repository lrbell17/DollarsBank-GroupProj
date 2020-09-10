import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import LoginRegistrationService from '../services/LoginRegisterService.js';
import NavBar from './NavBar';


class Update extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            isLoggedIn: null,
            fname: "",
            lname: "", 
            uname: "",
            email: "",
            pass: "",
            success: "", 
            error: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount = () => {
 
        if (this.props.location.state !== undefined){   

            this.setState(() => ({
                user: this.props.location.state.activeUser,
                isLoggedIn: this.props.location.state.isLoggedIn
            }))

        }
    }

    handleSubmit =(e) => {
        e.preventDefault();

        this.setState(() => ({
            success: "",
            error: ""
        }));

        let user = this.state.user;

        LoginRegistrationService.updateUser(this.props.location.state.activeUser.id, this.state.fname, this.state.lname,
            this.state.uname, this.state.email, this.state.pass)
        .then(() => {
            user.firstName = this.state.fname;
            user.lastName = this.state.lname;
            user.userName = this.state.uname;
            user.password = this.state.pass;
            this.setState(() => ({
                success: "User information updated sucessfully",
                user: user
            }))
        }).catch((e) => {
            this.setState(() => ({
                error: "Unable to update user information"
            }))
        });
    }

    render() {

        // checks if user is logged in
        if (!this.props.location.state || this.state.isLoggedIn===false){
            return <Redirect to="/login" />
        }

        const errorStyle = {
            color: 'red'
        }
        const sucessStyle = {
            color: 'blue'
        }

        return(
            <div>
                <NavBar activeUser={this.state.user} isLoggedIn={this.state.isLoggedIn}/>
                <h1>Update User Info</h1>

                {/* print success/error message */}
                <p style={sucessStyle}>{this.state.success}</p>
                <p style={errorStyle}>{this.state.error}</p>

                <form onSubmit={this.handleSubmit}>
                    
                    <label>First Name</label><br/>
                        <input type="text" value={this.state.fname} 
                            onChange={evt => this.setState({fname : evt.target.value, error:"", success:"" })} placeholder={"First Name"}
                        required /> <br/><br/>

                        <label>Last Name</label><br/>
                        <input type="text" value={this.state.lname} 
                            onChange={evt => this.setState({lname : evt.target.value, error:"", success:"" })} placeholder="Last Name"  
                            required 
                        /><br/><br/>

                        <label>Username</label><br/>
                        <input type="text" value={this.state.uname} 
                            onChange={evt => this.setState({uname : evt.target.value, error:"", success: "" })} placeholder="Username"  
                            required 
                        /><br/><br/>

                        <label>Email</label><br/>
                        <input type="email" value={this.state.email} 
                            onChange={evt => this.setState({email : evt.target.value, error:"", success: ""  })} placeholder="Email" 
                            required 
                        /><br/><br/>

                        <label>Password</label><br/>
                        <input type="password" value={this.state.pass} 
                            onChange={evt => this.setState({pass : evt.target.value, error:"", success: ""  })} placeholder="Password" 
                            required 
                        /><br/><br/>

                        <input type="submit" />
                </form>

                <br></br>
                
                <Link to={{
                        pathname: "/home",
                        state: {
                            activeUser: this.props.activeUser,
                            isLoggedIn: this.props.isLoggedIn
                        }
                    }}>
                        <li className="nav-items">Home</li>
                </Link>

            </div>
        );
    }

}

export default Update
