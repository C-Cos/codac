import React from 'react';
import jwt_decode from 'jwt-decode';
import './Profile.css';
import axios from 'axios';


export default class UserProfile extends React.Component {

    constructor (props) {

        super(props);
        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);

        this.state = {
            username:'',
            id:'',
            email:'',
            address:'',
            zipcode:'',
            city:'',
            association: false
    
        }
    }

    componentDidMount(){
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
      
        axios.get('http://localhost:4242/users/'+decoded._id)
            .then(response => {
                console.log(response);
                this.setState({
                    username: response.data.username,
                    email: response.data.email,
                    association: response.data.association,
                    city: response.data.city,
                    zipcode: response.data.postcode
                })
            })
            .catch(function(error){
                console.log(error);
            })   
    }

    deleteUser(e) {
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        if(window.confirm("Etes-vous sûr de vouloir supprimer ce compte ?")) {
            console.log("Suppression du compte de l'utilisateur");
            axios.delete('http://localhost:4242/users/'+decoded._id)
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

        return (
            
        
            <div className="container mt-4">
                <div className="jumbotron">
                    <h1 className="display-5">Bienvenue sur votre profil, <span className="username">{this.state.username}</span></h1>
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
                                    {this.state.association===true ? <li className="list-group-item">Association</li> : <div></div>}
                                    <li className="list-group-item">Email : {this.state.email}</li>
                                    <li className="list-group-item">Code postal: {this.state.zipcode}</li>
                                    <li className="list-group-item">Ville: {this.state.city}</li>
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