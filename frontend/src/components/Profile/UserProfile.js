import React from 'react';
import jwt_decode from 'jwt-decode';
import './Profile.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';


export default class UserProfile extends React.Component {
    constructor (props) {
        super(props);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeZipcode = this.onChangeZipcode.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username:'',
            email:'',
            address:'',
            zipcode:'',
            city:'',
            lon:2.363152, 
            lat:48.815580,
            zoom: 17,
        }
    }

    componentDidMount(){
        if(localStorage.usertoken===undefined) {
            this.props.history.push("/");
        };

        const token = localStorage.usertoken;
        if(token){
            const decoded = jwt_decode(token);
            this.setState({
                username : decoded.username,
                email : decoded.email,
            })
            console.log(decoded.username);
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


    onSubmit(e) {
        e.preventDefault();
        console.log(this.state.address);
        fetch('https://nominatim.openstreetmap.org/search?q='+(this.state.address).replace(' ','+')+',+'+(this.state.city).replace(' ','+')+'&format=json',
                    {
                        "method": "GET",
                    
                    })
                .then(response => response.json())
                .then(responseData => {
                    //this.setState({city : responseData.cities[0].city});
                    console.log(responseData);
                    console.log(responseData[0].lon);
                    this.setState({lon : responseData[0].lon});
                    this.setState({lat : responseData[0].lat});
                })

                .catch(function(err) {
                    //alert("Aucun ville ne correspond à votre recherche");
                    console.log(err);
                });
       
      
        
    }


    render () {
        const position = [this.state.lat, this.state.lon]
        //const position = [48.8378941,2.4999783]

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
                                    <li className="list-group-item">Email : {this.state.email}</li>
                                    <li className="list-group-item">Dapibus ac facilisis in</li>
                                    <li className="list-group-item">Vestibulum at eros</li>
                                </ul>
                                <div className="card-body">
                                    <a href="/" className="card-link">Card link</a>
                                    <a href="/" className="card-link">Another link</a>
                                </div>
                            </div> 
                        </div>
                    </div>


                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Adresse :  </label>
                            <input type="text" className="form-control" autoComplete="nope" value={this.state.address} onChange={this.onChangeAddress} required/>
                        </div>
                        <div className="form-group">
                            <label>Code postal: </label>
                            <input type="text" maxLength="5" className="form-control" autoComplete="nope" value={this.state.zipcode} onChange={this.onChangeZipcode} required/>                       
                        </div>
                        <div className="form-group">
                            <label>Ville : </label>
                            <input type="text" className="form-control" value={this.state.city} onChange={this.onChangeCity} required/>
                        </div>
                        <div className="form-group">
                            <input id="SubmitRegister" type="submit" value="Enregistrer" className="btn btn-dark"/>
                        </div>
                    </form>
                    <div>{this.state.lon}</div>

                    <Map style={{width:'100%',height: '500px'}} center={position} zoom={this.state.zoom}>
                        <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        />
                        <Marker position={position}>
                        <Popup>
                            <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
                        </Popup>
                        </Marker>
                    </Map>
                    

                </div>
            </div>
                 
        )
    }

}