import React from 'react';
import { Redirect } from 'react-router';
import {login} from './UserFunctions';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: '',
            cred: ''
        }
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        
        const user = {
            email: this.state.email,
            password: this.state.password,
        }

        login(user)
        .then((response) => {
                localStorage.setItem('usertoken', response.data.token)
                alert('Connection réussie !')
                this.setState({
                    wrong: '',
                    fireRedirect: true
                });
        })
        .catch((error) => {
            alert(error.response.data.message);
        });


        this.setState({
            email: '',
            password: '',
        })
    }


    render(){
        return (
            <div id="form" className="container">
                <h3 style={{marginTop: 30, textAlign: "center"}} > Connection</h3>
                <div style={{marginTop: 50}}>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Email: </label>
                            <input id="logemail" type="email" className="form-control"value={this.state.email} onChange={this.onChangeEmail} required/>
                        </div>
                        <div className="form-group">
                            <label>Mot de Passe: </label>
                            <input id="logpassword" type="password" className="form-control"value={this.state.password} onChange={this.onChangePassword} required/>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Connection" className="btn btn-dark"/>
                        </div>
                    </form>
                </div>
                {this.state.fireRedirect && <Redirect to={'/'} push={true} />}
            </div>
        )
    }
}