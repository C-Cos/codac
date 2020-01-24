import React from 'react';
import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import { user_login_action } from '../../actions/mainActions';
import { getAuthError, getAuthRedirection } from '../../Reducer/rootReducer';


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: ''
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

        this.props.user_login(user)

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
                    {this.props.error === true ? <div className="alert alert-danger" role="alert">
                    Le nom d'utilisateur ou le mot de passe est incorrect.
                    </div> : <div></div>}
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Email: </label>
                            <input id="logemail" type="email" className="form-control" value={this.state.email} onChange={this.onChangeEmail} required/>
                        </div>
                        <div className="form-group">
                            <label>Mot de Passe: </label>
                            <input id="logpassword" type="password" className="form-control"value={this.state.password} onChange={this.onChangePassword} required/>
                        </div>
                        <div className="form-group">
                            <input id="logsubmit" type="submit" value="Connection" className="btn btn-dark"/>
                        </div>
                    </form>
                </div>
                {this.props.fireRedirect && <Redirect to={'/'} push={true} />}
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        error: getAuthError(state),
        fireRedirect: getAuthRedirection(state)
    }
  }

const mapDispatchToProps = function(dispatch) {
    return {
        user_login: (user) => { dispatch(user_login_action(user)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)