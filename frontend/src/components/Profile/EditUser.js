import React from 'react';
import jwt_decode from 'jwt-decode';
import './Profile.css';
import Zipinput from '../Home/Zipinput';

export default class EditUser extends React.Component {
    constructor (props) {
        super(props);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeZipcode = this.onChangeZipcode.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
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
        if(token){
            const decoded = jwt_decode(token);
            this.setState({
                username : decoded.username,
                email : decoded.email,
                id: decoded._id
            })
        }        
    }

    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
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

    onChangeCity(e) {
        this.setState({
            city: e.target.value
        });
    }

    editUser(e) {
        this.props.history.push("/edituser");
    }

    onSubmit(e) {
        e.preventDefault();
        
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
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label>Nom d'utilisateur / Nom de l'Association :  </label>
                                    <input id="nameRegister" type="text" className="form-control" value={this.state.name} onChange={this.onChangeName} required/>
                                </div>
                                <div className="form-group">
                                    <label>Email : </label>
                                    <input id="emailRegister" type="email" className="form-control" value={this.state.email} onChange={this.onChangeEmail} required/>
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
                                    <label>Mot de Passe : </label>
                                    <input id="passwordRegister" type="password" className="form-control"value={this.state.password} onChange={this.onChangePassword} required/>
                                </div>
                                <div className="form-group">
                                    <label>Confirmation du mot de passe : </label>
                                    <input id="confPassRegister" type="password" className="form-control"value={this.state.confpass} onChange={this.onChangeConfPass} required/>
                                </div>
                                <div className="form-group">
                                    <input id="SubmitRegister" type="submit" value="Enregistrer" className="btn btn-dark"/>
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