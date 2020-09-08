import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import LoginRegisterService from '../services/LoginRegesterService';
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
 
            const activeUser = this.props.location.state.activeUser;
            this.state.fname = activeUser.fname;

            this.setState(() => ({
                user: this.props.location.state.activeUser,
                isLoggedIn: this.props.location.state.isLoggedIn
            }))

            LoginRegisterService.getUser(activeUser.uname, activeUser.password).then((response) => {
                this.setState(() => ({
                    user: response.data
                }));
            });
        }
    }

    handleSubmit =(e) => {
        //ToDo
    }

    render() {
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

                {/* print success message */}
                <p style={sucessStyle}>{this.state.success}</p>
                    
                {/* print error message */}
                <p style={errorStyle}>{this.state.error}</p>

                <form onSubmit={this.handleSubmit}>
                    
                    <label>First Name</label><br/>
                        <input type="text" value={this.state.fname} 
                            onChange={evt => this.setState({fname : evt.target.value })} placeholder={"First Name"}
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

                        <input type="submit" />
                </form>

                <br></br>
                <Link  to='/home'>
                        Return
                </Link>

            </div>
        );
    }

}

export default Update
