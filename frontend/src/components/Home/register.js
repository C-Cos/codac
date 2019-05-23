import React from 'react';
import { Redirect } from 'react-router';
//import {register} from './UserFunctions';
import Zipinput from './Zipinput';
import axios from 'axios';
require('vicopo');

function validate(user) {
    if (user.name.length < 5 || user.name.length > 20) {
      alert("Votre nom ou le nom de votre Association doit contenir entre 5 et 20 caractère.");
      return true;
    }
  
    if (user.password !== user.confPass) {
      alert("Le mot de passe entré ne correspond pas à la confirmation.");
      return true
    }
  }


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
            wrong: ''
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
            confPass: e.target.value
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
        //console.log(`name is ${this.state.name} , email is ${this.state.email}, password is ${this.state.password}, confpass is ${this.state.confPass}`);
        //console.log("city: " + this.state.city);
        //console.log("zipcode : " + this.state.zipcode);

        const user = {
            name: this.state.name,
            email: this.state.email,
            zipcode: this.state.zipcode,
            city: this.state.city,
            password: this.state.password,
            association: this.state.asso
        }
        //console.log(user);
        if(validate(user) === true)
        {
            return true
        }
        else
        {
            //register(user)
            axios.post('http://localhost:4242/users/register', user)
            .then((response) => {
            if(response.data.message === "Successful")
            {
                alert("Votre compte a été enregistré avec succès !");
                this.setState({
                    fireRedirect: true
                });
            }
            else
            {
                alert("Oops, nous n'avons pas pu vous enregistrer. Merci de réessayer dans quelques instants.");
                console.log(response.data);
            }
            })
            .catch((error) => {
                alert("Oops, nous n'avons pas pu vous enregistrer. Merci de réessayer dans quelques instants.");
                console.error(error);
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
            <div className="container">
                <h3 style={{marginTop: 30, marginLeft: 50}} >Créer un compte Sport E-vents :</h3>
                <div style={{marginTop: 50, marginLeft: 300, marginRight:300}}>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                                <label>
                                    Association
                                <input
                                    className="AssociationInput"
                                    name="asso"
                                    type="checkbox"
                                    checked={this.state.asso}
                                    onChange={this.onChangeAsso} />
                                </label>
                            <br />
                        </div>
                        <div className="form-group">
                            <label>Nom d'utilisateur / Nom de l'Association :  </label>
                            <input type="text" className="form-control" value={this.state.name} onChange={this.onChangeName} required/>
                        </div>
                        <div className="form-group">
                            <label>Email : </label>
                            <input type="email" className="form-control"value={this.state.email} onChange={this.onChangeEmail} required/>
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
                            <input type="password" className="form-control"value={this.state.password} onChange={this.onChangePassword} required/>
                        </div>
                        <div className="form-group">
                            <label>Confirmation du mot de passe : </label>
                            <input type="password" className="form-control"value={this.state.confPass} onChange={this.onChangeConfPass} required/>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Enregistrer" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
                {this.state.fireRedirect && <Redirect to='/login' push={true} />}
            </div>
        )
    }
}