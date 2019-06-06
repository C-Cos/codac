import React from 'react';
import { Redirect } from 'react-router';
//import {register} from './UserFunctions';
import Zipinput from './Zipinput';
import axios from 'axios';
require('vicopo');


export default class Register extends React.Component {

    constructor(props) {
        super(props);
        this.onChangeZipcode = this.onChangeZipcode.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfPass = this.onChangeConfPass.bind(this);
        this.onChangeAsso = this.onChangeAsso.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            zipcode: '',
            city: '',
            name: '',
            email: '',
            password: '',
            confPass: '',
            asso: false,
            errors: [], 
            wrong: '',
            errorPassword: false,
            errorRegister: false
        }
    }

    validate(user) {
        if (user.password !== user.confpass) {
          //alert("Le mot de passe entré ne correspond pas à la confirmation.");
          this.setState({
              errorPassword: true,
              errorRegister: false
          })
          return true;
        }
        else {
            return false;
        }
    }

    onChangeAsso(e){
        if(this.state.asso === false){
            this.setState({
                asso: true
            });
        }
        else{
            this.setState({
                asso: false
            }); 
        }
            
    }
    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
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
    onChangeConfPass(e) {
        this.setState({
            confpass: e.target.value
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

    onSubmit(e) {
        e.preventDefault();

        const user = {
            name: this.state.name,
            email: this.state.email,
            zipcode: this.state.zipcode,
            city: this.state.city,
            password: this.state.password,
            confpass: this.state.confpass,
            association: this.state.asso
        }
       
        if(this.validate(user) === true)
        {
            return true
        }
        else
        {
            axios.post('http://localhost:4242/users/register', user)
            .then((response) => {
                alert("Votre compte a été enregistré avec succès !");
                this.setState({
                    fireRedirect: true
                });
            })
            .catch((error) => {
                console.error(error);
                this.setState({
                    errorPassword: false,
                    errorRegister: true
                })
            });


            this.setState({
            name: '',
            email: '',
            zipcode: '',
            city: '',
            password: '',
            confPass: ''
            })
        }
    }


    render(){
        return (
            <div className="container formregister" style={{paddingTop: 30, width: "40%", paddingBottom: 60}}>
                <h3 style={{marginTop: 30, textAlign: "center"}} >Créer un compte Sport E-vents</h3>
                <div style={{marginTop: 50}}>
                {this.state.errorPassword===true ? <div className="alert alert-danger" role="alert">
                    Les mots de passe doivent être identiques
                    </div> : <div></div>}
                    {this.state.errorRegister===true ? <div className="alert alert-danger" role="alert">
                    Oops, nous n'avons pas pu vous enregistrer. Merci de réessayer dans quelques instants
                    </div> : <div></div>}

                    
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                                <label>
                                    Association
                                <input
                                    className="AssociationInput"
                                    name="asso"
                                    type="checkbox"
                                    checked={this.state.asso}
                                    onChange={this.onChangeAsso}
                                    id="asso" />
                                </label>
                            <br />
                        </div>
                        <div className="form-group">
                            <label>Nom d'utilisateur / Nom de l'Association :  </label>
                            <input id="nameRegister" type="text" minLength="5" maxLength="20" className="form-control" value={this.state.name} onChange={this.onChangeName} required/>
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
                {this.state.fireRedirect && <Redirect to='/login' push={true} />}
            </div>
        )
    }
}