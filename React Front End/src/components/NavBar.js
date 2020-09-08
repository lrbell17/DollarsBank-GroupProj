import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom';


class NavBar extends React.Component {
  
    render(){
        const navStyle = {
            color: 'white'
        }

        
        return (
            
            <nav>
                <h3>DollarsBank App</h3>
                <ul className="nav-links">
                    <Link style={navStyle} to='/transactions/all'>
                        <li className="nav-items">View All Transactions</li> 
                    </Link>
                    <Link style={navStyle} to='/account'>
                        <li className="nav-items">Open Account</li>
                    </Link>
                    <Link style={navStyle} to={{
                        pathname: "/transaction",
                        state: {
                            activeUser: this.props.activeUser,
                            isLoggedIn: this.props.isLoggedIn
                        }
                    }}>
                        <li className="nav-items">Make a Transaction</li>
                    </Link>
                    <Link style={navStyle} to='/update'>
                        <li className="nav-items">Update Info</li>
                    </Link>
                    <Link style={navStyle} to='/login'>
                        <li className="nav-items">Log Out</li>
                    </Link>
                </ul>
            </nav>
        );
    }
}

export default NavBar;