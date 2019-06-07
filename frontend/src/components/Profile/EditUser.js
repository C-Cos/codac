import React from 'react';
import jwt_decode from 'jwt-decode';
import './Profile.css';
import Zipinput from '../Home/Zipinput';
import axios from 'axios';

export default class EditUser extends React.Component {
    constructor (props) {
        super(props);
        this.onChangeZipcode = this.onChangeZipcode.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username:'',
            id:'',
            email:'',
            address:'',
            zipcode:'',
            city:''
        }
    }

    componentDidMount(){
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        // if(token){  
        //     this.setState({
        //         username : decoded.username,
        //         email : decoded.email,
        //         id: decoded._id
        //     })
        // }   
        axios.get('http://localhost:4242/users/'+decoded._id)
            .then(response => {
                console.log(response);
                this.setState({
                    username: response.data.username,
                    email: response.data.email,
                    zipcode: response.data.postcode,
                    city: response.data.city
                })
            })
            .catch(function(error){
                console.log(error);
            })  

    }

    onChangeZipcode(e) {
        this.setState({
            zipcode: e.target.value
        });

        if (e.target.value.length === 5) {

            fetch('https://vicopo.selfbuild.fr/cherche/'+ this.state.zipcode,
                {
                    "method": "GET",
                
                })
            .then(response => response.json())
            .then(responseData => {
                this.setState({city : responseData.cities[0].city});
            
                })
            .catch(function(err) {
                alert("Aucun ville ne correspond à votre recherche");
                console.log(err);
            });
    }
    else
    {
        this.setState({city : ''});
    }
    }

    onChangeName(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeCity(e) {
        this.setState({
            city: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);

        const updatedUser = {
            name: this.state.username,
            email: this.state.email,
            postcode: this.state.zipcode,
            city: this.state.city
        }
       
        axios.put('http://localhost:4242/users/'+decoded._id, updatedUser)
        .then((response) => {
            alert("Votre compte a été modifié avec succès !");
            this.props.history.push("/profile")
        })
        .catch((error) => {
            alert("Oops, nous n'avons pas pu modifier votre compte. Merci de réessayer dans quelques instants.");
            console.error(error);
        });
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
                                    <h5 className="card-title text-center">Modification du profil</h5>
                                </div>                             
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card">
                            <form onSubmit={this.onSubmit}>
                                <div className="container">
                                <div className="form-group mt-3">
                                    <label>Nom d'utilisateur / Nom de l'Association :  </label>
                                    <input id="nameEdit" type="text" minLength="5" maxLength="20" className="form-control" value={this.state.username} onChange={this.onChangeName} required/>
                                </div>
                                <div className="form-group">
                                    <label>Email : </label>
                                    <input id="emailEdit" type="email" className="form-control" value={this.state.email} onChange={this.onChangeEmail} required/>
                                </div>
                                <div className="form-group">
                                    <label>Code postal: </label>
                                    <Zipinput className="form-control" value={this.state.zipcode} onChangeZipcode={this.onChangeZipcode}/>                        
                                </div>
                                <div className="form-group">
                                    <label>Ville : </label>
                                    <input className="form-control" value={this.state.city}/>
                                </div>
                                <div className="form-group">
                                    <input id="SubmitEdit" type="submit" value="Confirmer" className="btn btn-dark"/>
                                </div>
                                </div>
                                
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                 
        )
    }

}