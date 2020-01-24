import React from 'react';
import './Profile.css';
import axios from 'axios';

import { connect } from 'react-redux';
import { getUser } from '../../Reducer/rootReducer';
// import { useSelector } from "react-redux";



class UserProfile extends React.Component {

    constructor (props) {

        super(props);
        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
    }
    deleteUser(e) {
        if(window.confirm("Etes-vous sûr de vouloir supprimer ce compte ?")) {
            console.log("Suppression du compte de l'utilisateur");
            console.log(this.props.user.id);
            axios.delete('http://localhost:4242/users/' + this.props.user.id)
            .then(response => {
                console.log(response);
                localStorage.clear();
                this.props.history.push("/");
            })
            .catch(function(error){
                console.log(error);
            })
        }
        else {
            console.log("Abandon de la suppression");
        }
    }
    editUser(e) {
        this.props.history.push("/edituser");
    }
    render () {
        console.log('user', this.props.user);
        return (
            <div className="container mt-4">
                <div className="jumbotron">
                    <h1 className="display-5">Bienvenue sur votre profil, <span className="username">{this.props.user.username}</span></h1>
                    <hr className="my-4"/>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="p-4 encart-img">
                                    <img className="card-img-top" src="https://image.flaticon.com/icons/svg/163/163801.svg" alt="Card cap"/>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Informations de profil</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                                
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card">
                                
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Email : {this.props.user.email}</li>
                                    <li className="list-group-item">Dapibus ac facilisis in</li>
                                    <li className="list-group-item">Vestibulum at eros</li>
                                </ul>
                                <div className="card-body">
                                <button type="button" onClick={this.deleteUser} className="btn btn-danger mr-3">Supprimer mon compte</button>
                                <button type="button" onClick={this.editUser} className="btn btn-secondary mr-3">Editer mon compte</button>
                                </div>
                            </div> 
                        </div>
                    </div>                

                </div>
            </div>
                 
        )
    }
}

const mapStateToProps = (state) => {
    console.log('state', state)
    return {
        user: state.user
    }
}

// const mapDispatchToProps = function(dispatch) {
//     return {
//         user_login: (user) => { dispatch(user_login_action(user)) }
//     }
// }

export default connect(mapStateToProps, 
    //mapDispatchToProps
    )(UserProfile)