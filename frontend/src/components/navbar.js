/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";

//import Logo from "../Home/components/LOGO2.png";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    }

    logOut(e) {
        e.preventDefault();
        localStorage.removeItem('usertoken');
        this.props.history.push('/');
    }

    render() {
        const userLink = (
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                    <a href="#" onClick={this.logOut} className="nav-link">Logout</a>
                </li>
            </ul>
        );
        const loginRegLink = (
            <ul id="flex-container" className="navbar-nav mr-auto">
                <li className="navbar-item">
                    <Link id="login" to="/login" className="nav-link">Login</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
            </ul>
        );
        return (
            <nav id="navContainer" className="navbar navbar-expand-lg navbar-light bg-light" style={{borderBottom: "1px solid #d8d5d5"}}>
                <Link to="/" className="navbar-brand">
                    <img alt="Sportevent"
                        src={require('../img/sportevent.png')}
                        width="180"
                        // height="30"
                        className="d-inline-block align-top"
                    />
                </Link>

                <Link to="/" className="navbar-brand" style={{margin : "0 auto"}}>
                    <img alt="Logo"
                        src={require('../img/logo.png')}
                        width="100"
                        // height="30"
                        className="d-inline-block align-top"
                    />
                </Link>


                <ul className="nav navbar-nav">
                    {localStorage.usertoken ? userLink : loginRegLink}
                </ul>
               
            </nav>
        )
    }
}

export default withRouter(Navbar)