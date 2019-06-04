import React, {Component} from 'react';
import axios from 'axios';
import '../Profile/Profile.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

export default class DisplayOneEvent extends Component {

    constructor(props){
        
        super(props);
        this.state = {
            event: [],
            lon:'', 
            lat:'',
            zoom : 17
        };

    }

  componentDidMount(){

        axios.get('http://localhost:4242/event/'+this.props.match.params.id)
            .then(response => {
                this.setState({event: response.data});
                console.log((this.state.event.address).split(' ').join('+'));

                axios.get('https://nominatim.openstreetmap.org/search?q='+((this.state.event.address).split(' ').join('+'))+',+'+(this.state.event.city).split(' ').join('+')+'&format=json')
                //.then(response => response.json())
                .then(response => {
                    //this.setState({city : responseData.cities[0].city});
                    
                    this.setState({lon : response.data[0].lon});
                    this.setState({lat : response.data[0].lat});
                    console.log(response.data[0].lon);
                    
                })
                .catch(function(err) {
                    //alert("Aucun ville ne correspond à votre recherche");
                    console.log(err);
                })


            })
            .catch(function(error){
                console.log(error);
            })
        
    }



    render() {
        const position = [this.state.lat, this.state.lon]
        return (
            <div className="container">
                <div className="jumbotron mt-3">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card">
                                <div class="card-header">
                                    <FontAwesomeIcon className="mr-2" style={{color: "#000000", fontSize: "35px"}} icon={ faUserCircle }/>
                                    <span className="card-text text-bold">Publié par : {this.state.event.username}</span>
                                </div>
                                <img style={{height: "200px", width:"auto"}} src="https://cdn.pixabay.com/photo/2018/07/22/08/49/tennis-3554019_960_720.jpg" className="card-image" width="300" alt="event" />
                                <div className="card-body">
                                    
                                    <h4 className="card-text">{this.state.event.name}</h4>
                                    <p className="card-text">{this.state.event.desc}</p>
                                    <div class="card card-header mb-4" style={{borderBottom: "none!important"}}>
                                        <FontAwesomeIcon className="mb-3" style={{fontSize: "35px"}} icon={ faMapMarkerAlt }/>
                                        <div>{this.state.event.address}</div>
                                        <div>{this.state.event.zipcode}</div>
                                        <div>{this.state.event.city}</div>
                                        <hr />
                                        <div>Du {this.state.event.start_date} à {this.state.event.start_time} </div>
                                        <div>au {this.state.event.end_date} à {this.state.event.end_time}</div>
                                    </div>
                                    
                                    <button type="button" class="btn btn-primary mr-3">Soutenir</button><button type="button" class="btn btn-success">Participer</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8">
                        
                            <Map style={{width:'100%',height: '100%'}} center={position} zoom={this.state.zoom}>
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

                </div>
            </div>
        )
    }
}